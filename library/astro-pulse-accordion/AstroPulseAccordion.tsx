import { useEffect, useState } from "react";
import { useRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { AnimatePresence, motion, MotionConfig, stagger } from "motion/react";
import useMeasure from "react-use-measure";
import { AccordionItemType, data as defaultData } from "./data";
import { XMark, Caret, Plus } from "./icons";

export type AstroPulseAccordionProps = {
  items?: AccordionItemType[];
  initialValue?: string;
  className?: string;
  onValueChange?: (value: string) => void;
  title?: string;
  heroImageAlt?: string;
  mediaSize?: string;
  mediaSizeLg?: string;
  mediaMinSize?: string;
  mediaMinSizeLg?: string;
};

export function AstroPulseAccordion({
  items = defaultData,
  initialValue = "",
  className,
  onValueChange,
  title = "Take a closer look.",
  heroImageAlt = "image not loaded",
  mediaSize = "360px",
  mediaSizeLg = "520px",
  mediaMinSize = "220px",
  mediaMinSizeLg = "320px",
}: AstroPulseAccordionProps) {
  const [value, setValue] = useState<string>(initialValue);
  const activeItem = items.find((item) => item.id === value);
  const fallbackMedia =
    items.find((item) => item.id === "thruster-design")?.imagePath ??
    items[0]?.imagePath ??
    "";
  const activeMedia = activeItem?.imagePath ?? fallbackMedia;
  const activeMediaSize = activeItem?.mediaSize ?? mediaSize;
  const activeMediaSizeLg = activeItem?.mediaSizeLg ?? mediaSizeLg;
  const activeMediaMinSize = activeItem?.mediaMinSize ?? mediaMinSize;
  const activeMediaMinSizeLg = activeItem?.mediaMinSizeLg ?? mediaMinSizeLg;
  const isVideo = activeMedia.toLowerCase().endsWith(".mp4");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasAutoOpened = useRef(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const handleValueChange = (nextValue: string) => {
    setValue(nextValue);
    onValueChange?.(nextValue);
  };

  const rootClassName = [
    "font-sans flex flex-col justify-center items-center min-h-screen bg-background-alt",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoOpened.current) {
          hasAutoOpened.current = true;
          const nextValue = initialValue || items[0]?.id || "";
          if (nextValue) {
            handleValueChange(nextValue);
          }
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [initialValue, items]);

  useEffect(() => {
    const supportsTouch =
      "ontouchstart" in window ||
      (navigator.maxTouchPoints ?? 0) > 0 ||
      (navigator as Navigator & { msMaxTouchPoints?: number }).msMaxTouchPoints;
    setIsTouch(Boolean(supportsTouch));
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsMobile(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  const handleTouchStart = (event: React.TouchEvent) => {
    if (!isMobile) {
      return;
    }
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!isMobile || touchStartX.current === null) {
      return;
    }
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const deltaX = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(deltaX) < 40) {
      return;
    }
  };

  return (
    <MotionConfig
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 150,
        mass: 40,
      }}
    >
      {/* <div className={rootClassName} ref={containerRef}> */}
        {/* <div className="w-full max-w-screen-xl px-8 md:px-10 pt-4"> */}
        <div className="w-full max-w-screen-xl">
          <div className="relative w-full h-auto lg:h-[70vh] rounded-[32px] bg-black overflow-hidden shadow-custom flex flex-col">
            <div className="relative z-20">
              <CloseButton value={value} setValue={handleValueChange} />
            </div>
            <AccordionControls
              value={value}
              setValue={handleValueChange}
              items={items}
            />
            <div className="h-full flex flex-col lg:grid lg:grid-cols-[1fr_2fr] lg:items-stretch">
              <div
                className="order-1 lg:order-2 relative flex flex-1 items-center justify-center px-8 pt-10 lg:p-10"
                style={
                  {
                    "--media-size": activeMediaSize,
                    "--media-size-lg": activeMediaSizeLg,
                    "--media-min": activeMediaMinSize,
                    "--media-min-lg": activeMediaMinSizeLg,
                  } as React.CSSProperties
                }
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <AnimatePresence mode="wait">
                  {activeMedia &&
                    (isVideo ? (
                      <motion.video
                        key={activeMedia}
                        src={activeMedia}
                        className="relative z-10 w-[var(--media-size)] h-[var(--media-size)] min-w-[var(--media-min)] min-h-[var(--media-min)] lg:w-[var(--media-size-lg)] lg:h-[var(--media-size-lg)] lg:min-w-[var(--media-min-lg)] lg:min-h-[var(--media-min-lg)] max-w-full max-h-full object-contain"
                        autoPlay
                        muted
                        loop
                        playsInline
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    ) : (
                      <motion.img
                        key={activeMedia}
                        src={activeMedia}
                        alt={heroImageAlt}
                        className="relative z-10 w-[var(--media-size)] h-[var(--media-size)] min-w-[var(--media-min)] min-h-[var(--media-min)] lg:w-[var(--media-size-lg)] lg:h-[var(--media-size-lg)] lg:min-w-[var(--media-min-lg)] lg:min-h-[var(--media-min-lg)] max-w-full max-h-full object-contain"
                        draggable={false}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -16 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    ))}
                </AnimatePresence>
              </div>
              
              <Accordion.Root
                type="single"
                value={value}
                onValueChange={handleValueChange}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                className={`order-2 lg:order-1 relative z-10 mt-auto w-full pb-6 pt-4 lg:py-10 lg:pl-[min(90px,6.25vw)] lg:pr-6 flex flex-row lg:flex-col flex-nowrap justify-start lg:justify-center items-start gap-3 overflow-x-auto lg:overflow-visible lg:h-full ${
                  isTouch ? "scrollbar-hide" : ""
                }`}
              >
                {items.map((item) => (
                  <AccordionItem
                    key={item.id}
                    item={item}
                    isOpen={value === item.id}
                    value={item.id}
                    setValue={handleValueChange}
                  />
                ))}
              </Accordion.Root>
            </div>
          </div>
        </div>
      {/* </div> */}
    </MotionConfig>
  );
}

type CloseButtonProps = {
  value: string;
  setValue: (value: string) => void;
};

function CloseButton({ value, setValue }: CloseButtonProps) {
  return (
    <AnimatePresence initial={false}>
      {value !== "" && (
        <motion.div
          initial={{
            opacity: 0,
            transform: "translateY(86px) scale(0)",
          }}
          animate={{
            opacity: 1,
            transform: "translateY(0px) scale(1)",
          }}
          exit={{
            opacity: 0,
            transform: "translateY(86px) scale(0)",
          }}
          className="absolute top-4 right-4"
        >
          <button
            onClick={() => setValue("")}
            className="cursor-pointer rounded-full size-9 bg-background-gray flex items-center justify-center"
          >
            <span className="sr-only">Close</span>
            <XMark />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type AccordionControlsProps = {
  value: string;
  setValue: (value: string) => void;
  items: AccordionItemType[];
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    transform: "translateY(86px) scale(0)",
  },
  visible: {
    opacity: 1,
    transform: "translateY(0px) scale(1)",
  },
};

function AccordionControls({ value, setValue, items }: AccordionControlsProps) {
  const currentIndex = items.findIndex((item) => item.id === value);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex >= 0 && currentIndex < items.length - 1;

  return (
    <motion.div
      initial="hidden"
      animate={value === "" ? "hidden" : "visible"}
      variants={{
        hidden: {
          transition: {
            delayChildren: stagger(0.025, { from: "last" }),
          },
        },
        visible: {
          transition: {
            delayChildren: stagger(0.025),
          },
        },
      }}
      className="absolute top-0 left-0 bottom-0 w-[min(90px,6.25vw)] hidden lg:flex flex-col justify-center items-center gap-5 z-20"
    >
      <motion.div variants={buttonVariants}>
        <button
          disabled={!canGoPrevious}
          onClick={() =>
            canGoPrevious && setValue(items[currentIndex - 1].id)
          }
          className="cursor-pointer rounded-full size-9 bg-background-gray flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-100"
        >
          <span className="sr-only">Previous</span>
          <Caret className="rotate-180 size-10" />
        </button>
      </motion.div>
      <motion.div variants={buttonVariants}>
        <button
          disabled={!canGoNext}
          onClick={() => canGoNext && setValue(items[currentIndex + 1].id)}
          className="cursor-pointer rounded-full size-9 bg-background-gray flex items-center justify-center  disabled:opacity-50 disabled:cursor-not-allowed transition-opacity duration-100"
        >
          <span className="sr-only">Next</span>
          <Caret />
        </button>
      </motion.div>
    </motion.div>
  );
}

type AccordionItemProps = {
  item: AccordionItemType;
  isOpen: boolean;
  value: string;
  setValue: (value: string) => void;
};

function AccordionItem({ item, isOpen, setValue, value }: AccordionItemProps) {
  const [buttonRef, { width: buttonWidth }] = useMeasure();
  const [selectedColor, setSelectedColor] = useState<
    { name: string; code: string } | null
  >(item.colors?.[0] ?? null);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    setSelectedColor(item.colors?.[0] ?? null);
  }, [item.colors]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1023px)");
    const update = () => setIsCompact(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return (
    <Accordion.Item asChild value={value}>
      <motion.div
        layout
        layoutId={`accordion-item-${item.id}`}
        style={{
          borderRadius: 28,
        }}
        onClick={() => setValue(isOpen ? "" : value)}
        animate={
          buttonWidth
            ? {
                width: isOpen
                  ? isCompact
                    ? "min(80vw, 320px)"
                    : 423
                  : buttonWidth,
                height: isOpen ? "auto" : 56,
              }
            : {}
        }
        className={`bg-background-gray relative overflow-hidden shadow-custom shrink-0 ${
          isCompact ? "min-w-[78vw] max-w-[78vw]" : "w-fit"
        }`}
      >
        <Accordion.Header asChild>
          <Accordion.Trigger asChild>
            <motion.button
              layout
              ref={buttonRef}
              className="h-14 pl-3.5 pr-8 text-[17px] cursor-pointer font-semibold tracking-[-0.022em] leading-[1.2] flex items-center gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-blue-500 whitespace-nowrap"
              onClick={() => setValue(isOpen ? "" : value)}
              style={{
                borderRadius: 28,
                pointerEvents: isOpen ? "none" : "auto",
              }}
              animate={{
                opacity: isOpen ? 0 : 1,
              }}
              initial={{
                opacity: 1,
              }}
              transition={{
                duration: isOpen ? 0.1 : 0.5,
                delay: isOpen ? 0 : 0.32,
              }}
            >
              {item.id === "colours" ? (
                <div
                  className="size-6 rounded-full inset-shadow-2xs inset-shadow-black/40"
                  style={{
                    backgroundColor: selectedColor?.code,
                  }}
                />
              ) : (
                <Plus />
              )}
              <span>{item.title}</span>
            </motion.button>
          </Accordion.Trigger>
        </Accordion.Header>

        <AnimatePresence initial={false}>
          {isOpen && (
            <Accordion.Content forceMount asChild>
              <motion.div
                layout
                style={{
                  borderRadius: 28,
                }}
                className={`${
                  isCompact ? "w-full" : "w-[423px]"
                } h-auto lg:h-full mt-0 lg:-mt-14 flex flex-col justify-start lg:justify-end`}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <motion.div
                  variants={{
                    open: {
                      opacity: 1,
                      transform: "translateY(0px)",
                      transition: {
                        delay: 0.32,
                        duration: 0.5,
                        transform: {
                          duration: 0,
                        },
                      },
                    },
                    closed: {
                      opacity: 0,
                      transform: "translateY(24px)",
                      transition: {
                        delay: 0,
                        duration: 0.32,
                      },
                    },
                  }}
                  className="h-auto lg:h-full flex flex-col justify-start lg:justify-between"
                >
                  <p className="p-[22px] text-[17px] tracking-[-0.022em]">
                    <span className="font-semibold">{item.title} </span>
                    <br/>
                    {item.description}
                    {item.id === "colours" && `  ${selectedColor?.name}.`}
                  </p>
                  {item.id === "colours" && (
                    <RadioGroup.Root
                      value={selectedColor?.name}
                      onValueChange={(value) =>
                        setSelectedColor(
                          item.colors?.find((color) => color.name === value) ??
                            null
                        )
                      }
                      className="flex gap-3.5 justify-center items-center pb-[28px]"
                    >
                      {item.colors?.map((color) => (
                        <RadioGroup.Item
                          key={color.name}
                          value={color.name}
                          className="size-6 rounded-full inset-shadow-xs inset-shadow-black/40 outline-2 outline-transparent data-[state=checked]:outline-foreground outline-offset-2 cursor-pointer"
                          style={{ backgroundColor: color.code }}
                        />
                      ))}
                    </RadioGroup.Root>
                  )}
                </motion.div>
              </motion.div>
            </Accordion.Content>
          )}
        </AnimatePresence>
      </motion.div>
    </Accordion.Item>
  );
}

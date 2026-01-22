"use client";

import React from "react";
import { useForm, ValidationError } from "@formspree/react";
import { useSectionInView } from "@/lib/hooks";
import SectionHeading from "@/components/section-heading";
import { useSearchParams } from "next/navigation";

type ContactUsProps = {
  disableSectionTracking?: boolean;
};

export default function ContactUs({ disableSectionTracking }: ContactUsProps) {
  const { ref } = useSectionInView("Contact", 0.75, undefined, !disableSectionTracking);
  const [formState, handleSubmit] = useForm("xeejpjlr");
  const [fields, setFields] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const searchParams = useSearchParams();
  const sponsorPart = searchParams.get("sponsorPart");
  const sponsorAmount = searchParams.get("sponsorAmount");

  React.useEffect(() => {
    if (!sponsorPart) {
      return;
    }

    setFields((prev) => {
      const amountLine = sponsorAmount
        ? `My intended contribution is $${sponsorAmount} CAD.`
        : "";

      const message = [
        "Hi AstroPulse team,",
        " ",
        `I’m interested in sponsoring the ${sponsorPart}.`,
        amountLine,
        " ",
        "Please let me know the next steps.",
      ]
        .filter(Boolean)
        .join("\n");

      return {
        ...prev,
        message,
      };
    });

    const url = new URL(window.location.href);
    url.searchParams.delete("sponsorPart");
    url.searchParams.delete("sponsorAmount");
    window.history.replaceState(null, "", url.pathname + url.hash);
  }, [sponsorAmount, sponsorPart]);

  React.useEffect(() => {
    if (!formState.succeeded) {
      return;
    }

    setFields({
      name: "",
      email: "",
      message: "",
    });
  }, [formState.succeeded]);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email);
  const isFormComplete =
    fields.name.trim() !== "" &&
    fields.message.trim() !== "" &&
    isEmailValid;
  const isDisabled = formState.submitting || !isFormComplete;

  return (
    <section id="contact" ref={ref} className="w-full scroll-mt-28 pt-20">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16 pb-12">
        <SectionHeading
          eyebrow="Contact Us"
          title="Let's build something together."
        />
        <p className="mt-3 max-w-2xl text-sm text-neutral-300 sm:text-base">
          Reach us at{" "}
          <a
            className="text-orange-300 hover:text-orange-200"
            href="mailto:astropulse2024@gmail.com"
          >
            astropulse2024@gmail.com
          </a>
          .
        </p>

        {formState.succeeded ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-neutral-900/70 p-6 text-neutral-200 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
            Thanks for reaching out! We’ll get back to you soon.
          </div>
        ) : (
        <form
          className="mt-10 grid gap-6 rounded-3xl border border-white/10 bg-neutral-900/70 p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)]"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm text-neutral-300">
              Name
              <input
                className="h-12 rounded-2xl border border-white/10 bg-black/40 px-4 text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
                name="name"
                placeholder="Your name"
                required
                value={fields.name}
                onChange={(event) =>
                  setFields((prev) => ({ ...prev, name: event.target.value }))
                }
              />
            </label>
            <label className="grid gap-2 text-sm text-neutral-300">
              Email
              <input
                className="h-12 rounded-2xl border border-white/10 bg-black/40 px-4 text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                value={fields.email}
                onChange={(event) =>
                  setFields((prev) => ({ ...prev, email: event.target.value }))
                }
              />
            </label>
          </div>
          <ValidationError
            prefix="Email"
            field="email"
            errors={formState.errors}
            className="text-xs text-orange-300"
          />
          <label className="grid gap-2 text-sm text-neutral-300">
            Message
            <textarea
              className="min-h-[180px] rounded-2xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-orange-400 focus:outline-none"
              name="message"
              placeholder="Tell us about your project..."
              required
              value={fields.message}
              onChange={(event) =>
                setFields((prev) => ({
                  ...prev,
                  message: event.target.value,
                }))
              }
            />
          </label>
          <ValidationError
            prefix="Message"
            field="message"
            errors={formState.errors}
            className="text-xs text-orange-300"
          />
          <button
            type="submit"
            disabled={isDisabled}
            className="w-fit rounded-full bg-orange-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-500 disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-neutral-400"
          >
            {formState.submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
        )}
      </div>
    </section>
  );
}

import React from "react";
import clsx from "clsx";

type SectionHeadingProps = {
    title: string;
    eyebrow?: string;
    align?: "left" | "center";
    className?: string;
};

export default function SectionHeading({
    title,
    eyebrow,
    align = "left",
    className,
}: SectionHeadingProps) {
    return (
        <div
            className={clsx(
                "space-y-4",
                align === "center" ? "text-center" : "text-left",
                className,
                "mb-10"
            )}
        >
            {eyebrow ? (
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-400 sm:mt-6 sm:text-base lg:mt-10">
                    {eyebrow}
                </p>
                // font-semibold uppercase tracking-[0.35em] text-orange-400 sm:mt-6 sm:text-base lg:mt-10
            ) : null}
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
                {title}
            </h2>
        </div>
    );
}

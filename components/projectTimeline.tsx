"use client"

import React from 'react';
import SectionHeading from "@/components/section-heading";
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import {experiencesData} from "@/lib/data";
import {useSectionInView} from "@/lib/hooks";

function ProjectTimeline() {
    const { ref } = useSectionInView("Timeline");

    return (
        <section
            // w-full scroll-mt-28 pt-20
            // scroll-mt-[7rem]
            className="w-full scroll-mt-28 pt-20"
            ref={ref}
            id="projectTimeline"
        >
            <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
                <div className="mx-auto max-w-6xl">
                    <SectionHeading eyebrow="Timeline" title="Project Timeline" />
                </div>

            <div
                className="timeline-progress"
                style={{
                    ["--timeline-progress" as never]: `${
                        Math.max(
                            0,
                            experiencesData.findIndex((item) => item.isCurrent) + 1
                        ) / experiencesData.length * 100
                    }%`,
                }}
            >
            <VerticalTimeline layout="2-columns" lineColor="rgba(255, 255, 255, 0.12)">
                {
                    experiencesData.map((item, index) => (
                        <React.Fragment key={index}>
                                <VerticalTimelineElement
                                    position={index % 2 === 0 ? "left" : "right"}
                                    visible={true}
                                    contentStyle={{
                                        background: "rgba(10, 10, 10, 0.8)",
                                        color: "#f5f5f5",
                                        boxShadow:"0 25px 60px rgba(0, 0, 0, 0.45)",
                                        border: "1px solid rgba(255, 255, 255, 0.08)",
                                        borderRadius: "2rem",
                                        // minWidth: "320px"
                                    }}
                                    date = {item.date}
                                    contentArrowStyle={{
                                        borderRight: "0.4rem solid rgba(255, 255, 255, 0.08)"
                                    }}
                                    icon={item.icon}
                                    iconStyle={{
                                        background: "#111827",
                                        color: "#f97316"
                                    }}
                                    dateClassName="text-neutral-400"
                                >
                                    {/* <div className={"flex flex-col"}>
                                            <h2 className="font-bold"> {item.name}</h2>
                                            <div className="text-neutral-400"> {item.location}</div>
                                    </div> */}

                                    <div className={"flex flex-row items-center gap-4"}>
                                        <div className={"flex flex-col"}>
                                            <h2 className="font-bold"> {item.name}</h2>
                                            <div className="text-gray-400"> {item.location}</div>
                                        </div>

                                    </div>

                                    {/* <p className="mt-3 text-neutral-300"> {item.description}</p> */}
                                </VerticalTimelineElement>
                            </React.Fragment>

                    ))
                }
            </VerticalTimeline>
            </div>
            </div>

        </section>
    );
}

export default ProjectTimeline;

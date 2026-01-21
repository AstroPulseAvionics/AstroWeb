import Intro from "@/components/intro";
import {Shapes} from "@/components/Shapes";
import About from "@/components/about";
import Design from "@/components/design";
import PartByPart from "@/components/part-by-part";
import ProjectTimeline from "@/components/projectTimeline";
import Team from "@/components/team";
import ContactUs from "@/components/contactUs";


export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center">
            <div
                className="h-screen w-screen absolute top-0 max-w-full bg-[radial-gradient(circle_at_top,_rgba(255,95,31,0.1),_transparent_60%)] bg-[length:140%_140%] bg-[position:50%_0%] sm:bg-[length:120%_120%]">
            </div>

            <div
                className="grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-[auto_1fr] h-screen w-screen items-center
                align-middle content-start max-w-full md:content-center">
                <Intro/>
                <Shapes/>
            </div>

            <About/>
            <Design/>
            <ProjectTimeline/>
            <PartByPart/>
            {/* <Projects/>
            <Skills/> */}
            <Team/>
            <ContactUs/>
            

        </main>
    );
}

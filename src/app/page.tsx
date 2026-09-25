"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const projectsData = [
  {
    id: 1,
    title: "Taskyrox",
    desc: "Responsive task-management application built in TypeScript without a traditional UI framework. Custom rendering and state-update flow.",
    tags: ["TypeScript", "Vite", "Tailwind CSS"],
    demoLink: "five-o-one.github.io/Taskyrox/",
    githubLink: "https://github.com/Five-o-One/Taskyrox",
    image: "/taskyrox.png",
  },
  {
    id: 2,
    title: "Socially",
    desc: "Social media frontend with authentication, posts, comments, notifications, and theme switching. Integrated with remote API.",
    tags: [
      "React",
      "TypeScript",
      "React Router",
      "Zustand",
      "Axios",
      "Tailwind CSS",
    ],
    demoLink: null,
    githubLink: "https://github.com/Five-o-One/Socially",
    image: "/socially.png",
  },
  {
    id: 3,
    title: "Thinkboard",
    desc: "RTL note-management application with full CRUD functionality, client-side search, sorting, and reusable UI components.",
    tags: ["React", "TypeScript", "React Router", "Axios", "Tailwind CSS"],
    demoLink: "thinkboard-front-end.vercel.app",
    githubLink: "https://github.com/Bukalati/Thinkboard-FrontEnd",
    image: "/thinkboard.png",
  },
];

const skillsArsenal = [
  "HTML & CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "React Router",
  "Tailwind CSS",
  "Vite",
  "TanStack Query",
  "Zustand",
  "Axios",
  "React Hook Form",
  "REST APIs",
  "Figma",
  "UI/UX Design",
  "Git & GitHub",
];

export default function Portfolio() {
  const mainRef = useRef<HTMLElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      gsap.fromTo(
        ".gsap-hero",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power4.out",
          delay: 0.2,
        },
      );

      gsap.utils.toArray(".gsap-reveal").forEach((section: any) => {
        gsap.fromTo(
          section,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });

      const slides = gsap.utils.toArray<HTMLElement>(".project-slide");
      if (projectsWrapperRef.current && slides.length > 0) {
        slides.forEach((slide: HTMLElement, i: number) => {
          if (i !== 0) {
            const img = slide.querySelector(".proj-img");
            const content = slide.querySelector(".proj-content");
            gsap.set(img, { autoAlpha: 0, y: 30 });
            gsap.set(content, { autoAlpha: 0, y: 30 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: projectsWrapperRef.current,
            pin: true,
            scrub: 1,
            start: "top top",
            end: () => "+=" + slides.length * 150 + "%",
          },
        });

        slides.forEach((slide: HTMLElement, i: number) => {
          const currentImg = slide.querySelector(".proj-img");
          const currentContent = slide.querySelector(".proj-content");

          tl.to({}, { duration: 1.5 });

          if (i < slides.length - 1) {
            const nextSlide = slides[i + 1] as HTMLElement;
            const nextImg = nextSlide.querySelector(".proj-img");
            const nextContent = nextSlide.querySelector(".proj-content");

            const label = "transition" + i;
            tl.addLabel(label);

            tl.to(
              currentContent,
              { autoAlpha: 0, y: -30, duration: 0.8 },
              label,
            );
            tl.to(
              currentImg,
              { autoAlpha: 0, y: -30, duration: 0.8 },
              label + "+=0.2",
            );
            tl.to(slide, { autoAlpha: 0, duration: 0.1 }, label + "+=1");

            tl.to(nextSlide, { autoAlpha: 1, duration: 0.1 }, label);
            tl.to(
              nextImg,
              { autoAlpha: 1, y: 0, duration: 0.8 },
              label + "+=0.4",
            );
            tl.to(
              nextContent,
              { autoAlpha: 1, y: 0, duration: 0.8 },
              label + "+=0.6",
            );
          }
        });
      }
    }, mainRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <main
      ref={mainRef}
      className="font-sans antialiased selection:bg-[#a3e635] selection:text-black"
    >
      <header className="fixed top-0 w-full z-50">
        {/* نوبار اصلی */}
        <nav
          className={`relative z-50 w-full py-4 px-6 md:px-12 flex justify-between items-center border-b-4 border-white rounded-b-3xl transition-colors duration-300 ${isMenuOpen ? "bg-[#0a0a0a]" : "bg-[#0a0a0a]/90 backdrop-blur-sm"}`}
        >
          <div className="text-2xl font-black text-white tracking-widest uppercase">
            AN<span className="text-[#a3e635]">.</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-wider">
            <a href="#about" className="hover:text-[#a3e635] transition-colors">
              About
            </a>
            <a
              href="#experience"
              className="hover:text-[#a3e635] transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="hover:text-[#a3e635] transition-colors"
            >
              Projects
            </a>
            <a
              href="mailto:alireza.nourasi@gmail.com"
              className="bg-[#a3e635] text-black px-5 py-2 rounded-xl border-2 border-white shadow-[4px_4px_0_0_white] hover:-translate-y-1 transition-transform"
            >
              Let's Talk
            </a>
          </div>

          {/* دکمه همبرگری موبایل */}
          <button
            className="md:hidden relative p-2 text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <span
                className={`block h-1 w-full bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "translate-y-2 rotate-45" : ""}`}
              ></span>
              <span
                className={`block h-1 w-full bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block h-1 w-full bg-white rounded-full transition-all duration-300 ${isMenuOpen ? "-translate-y-2 -rotate-45" : ""}`}
              ></span>
            </div>
          </button>
        </nav>

        <div
          className={`md:hidden fixed top-0 left-0 w-full h-[100dvh] bg-[#0a0a0a] z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        >
          <a
            href="#about"
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black text-white hover:text-[#a3e635] uppercase tracking-wider"
          >
            About
          </a>
          <a
            href="#experience"
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black text-white hover:text-[#a3e635] uppercase tracking-wider"
          >
            Experience
          </a>
          <a
            href="#projects"
            onClick={() => setIsMenuOpen(false)}
            className="text-3xl font-black text-white hover:text-[#a3e635] uppercase tracking-wider"
          >
            Projects
          </a>
          <a
            href="mailto:alireza.nourasi@gmail.com"
            onClick={() => setIsMenuOpen(false)}
            className="mt-8 bg-[#a3e635] text-black px-8 py-3 rounded-xl border-4 border-white shadow-[6px_6px_0_0_white] font-black uppercase text-xl"
          >
            Let's Talk
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="about"
        className="min-h-screen flex flex-col justify-center px-6 md:px-24 pt-32 pb-16 md:pb-32 relative overflow-hidden"
      >
        <h2 className="bg-[#a3e635] text-black w-max px-6 py-2 font-black uppercase border-4 border-white shadow-[4px_4px_0_0_white] md:shadow-[6px_6px_0_0_white] rounded-xl md:rounded-2xl mb-6 md:mb-8 gsap-hero text-xs sm:text-sm md:text-base">
          Hello, I'm
        </h2>
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-4 md:mb-6 gsap-hero uppercase leading-none tracking-tighter break-words">
          Alireza <br /> Noormohammad
        </h1>
        <h3 className="text-xl sm:text-2xl md:text-4xl text-[#a3e635] mb-6 md:mb-8 gsap-hero font-bold uppercase border-l-4 md:border-l-8 border-[#a3e635] pl-4 md:pl-6 rounded-l-xl">
          UI/UX Designer & Front-end Dev
        </h3>
        <p className="max-w-2xl text-white text-base md:text-lg border-4 border-white p-5 md:p-6 shadow-[6px_6px_0_0_#a3e635] md:shadow-[8px_8px_0_0_#a3e635] rounded-2xl md:rounded-3xl bg-[#1a1a1a] gsap-hero font-medium mb-10 md:mb-12">
          Software Engineering student transitioning into Front-end Development,
          with professional experience designing digital products and hands-on
          experience building responsive web applications with React and
          TypeScript.
        </p>

        <div className="gsap-hero">
          <a
            href="mailto:alireza.nourasi@gmail.com"
            className="inline-flex items-center gap-2 bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl border-4 border-black shadow-[6px_6px_0_0_#a3e635] md:shadow-[8px_8px_0_0_#a3e635] font-black uppercase text-base md:text-lg hover:-translate-y-1 transition-transform"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
            Contact Me
          </a>
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 md:py-24 px-6 md:px-24 bg-[#a3e635] text-black border-y-4 border-white rounded-t-[2rem] md:rounded-t-[5rem]"
      >
        <div className="gsap-reveal max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-8 md:mb-12 uppercase tracking-tight">
            Experience
          </h2>

          <div className="bg-white border-4 border-black p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-[8px_8px_0_0_black] md:shadow-[12px_12px_0_0_black] hover:-translate-y-2 hover:-translate-x-2 hover:shadow-[12px_12px_0_0_black] md:hover:shadow-[16px_16px_0_0_black] transition-all duration-300">
            <div className="flex flex-col md:flex-row justify-between mb-6 border-b-4 border-black pb-4 border-dashed">
              <h3 className="text-2xl md:text-3xl font-black uppercase">
                UI/UX Designer <span className="text-gray-500">@ Kiasho</span>
              </h3>
              <span className="bg-black text-white px-4 md:px-5 py-2 rounded-xl font-bold uppercase mt-4 md:mt-0 w-max border-2 border-black text-sm md:text-base">
                Jul 2026 - Present
              </span>
            </div>
            <ul className="list-disc list-inside text-black space-y-2 md:space-y-3 text-base md:text-lg font-bold">
              <li>
                Designed end-to-end UI/UX for web apps, dashboards, PWAs, and
                landing pages.
              </li>
              <li>
                Worked across user research, wireframing, prototyping, and
                visual design.
              </li>
              <li>
                Collaborated closely with developers for seamless
                design-to-development workflows.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsWrapperRef}
        className="h-screen w-full bg-[#0a0a0a] relative overflow-hidden"
      >
        <div className="absolute top-24 left-6 md:top-28 md:left-12 z-30 pointer-events-none">
          <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight bg-[#1a1a1a] px-4 md:px-6 py-2 rounded-xl border-4 border-[#a3e635] shadow-[4px_4px_0_0_#a3e635] inline-block">
            Selected Projects
          </h2>
        </div>

        {projectsData.map((project, i) => (
          <div
            key={project.id}
            className="project-slide absolute inset-0 flex flex-col items-center justify-start px-4 md:px-6 pt-44 md:pt-32 pb-4 z-20"
            style={{
              opacity: i === 0 ? 1 : 0,
              visibility: i === 0 ? "visible" : "hidden",
            }}
          >
            <div className="proj-img shrink-0 w-full max-w-sm md:max-w-md lg:max-w-lg aspect-video bg-[#1a1a1a] rounded-2xl md:rounded-3xl border-4 border-white shadow-[4px_4px_0_0_#a3e635] md:shadow-[6px_6px_0_0_#a3e635] flex items-center justify-center mb-4 md:mb-6 overflow-hidden relative">
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="proj-content w-full max-w-4xl bg-white border-4 border-black rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-[4px_4px_0_0_#a3e635] md:shadow-[6px_6px_0_0_#a3e635] flex flex-col md:flex-row gap-4 md:gap-6 justify-between items-start">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-black text-black mb-2 md:mb-3 uppercase">
                  {project.title}
                </h3>
                <p className="text-black text-sm md:text-base mb-4 font-medium leading-relaxed">
                  {project.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 md:px-3 py-1 bg-[#a3e635] text-black border-2 border-black rounded-full font-bold text-[10px] md:text-xs uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 min-w-max w-full md:w-auto mt-2 md:mt-0">
                {project.demoLink && (
                  <a
                    href={project.demoLink}
                    className="flex-1 flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-black text-white rounded-xl border-4 border-black font-black uppercase hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#a3e635] text-sm md:text-base"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="w-4 h-4"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>{" "}
                    Demo
                  </a>
                )}
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    className="flex-1 flex items-center justify-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-white text-black rounded-xl border-4 border-black font-black uppercase hover:-translate-y-1 transition-transform shadow-[4px_4px_0_0_#a3e635] text-sm md:text-base"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="w-4 h-4"
                    >
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>{" "}
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Skills Section */}
      <section className="py-16 md:py-32 px-6 md:px-24 border-t-4 border-white bg-[#0a0a0a] text-center rounded-t-[2rem] md:rounded-t-[5rem]">
        <div className="gsap-reveal max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-10 md:mb-16 uppercase bg-black border-4 border-[#a3e635] p-3 md:p-4 inline-block shadow-[6px_6px_0_0_#a3e635] md:shadow-[8px_8px_0_0_#a3e635] rounded-2xl md:rounded-3xl -rotate-2">
            Technical Arsenal
          </h2>

          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {skillsArsenal.map((skill, index) => (
              <span
                key={index}
                className={`px-3 md:px-6 py-2 md:py-3 font-black uppercase text-[10px] md:text-sm border-2 md:border-4 border-black rounded-full hover:-translate-y-1 transition-transform cursor-default
                  ${index % 3 === 0 ? "bg-[#a3e635] text-black shadow-[3px_3px_0_0_white] md:shadow-[4px_4px_0_0_white] rotate-1" : "bg-white text-black shadow-[3px_3px_0_0_#a3e635] md:shadow-[4px_4px_0_0_#a3e635] -rotate-1"}
                `}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

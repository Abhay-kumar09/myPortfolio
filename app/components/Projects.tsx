'use client'

import React from 'react'

const projectsData = [
    {
        id: 1,
        title: 'Everest ERP',
        category: 'SaaS, Finance, A.I., B2B',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Suzy Welch',
        category: 'Education, B2C, B2B',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'TechSpeed',
        category: 'Outsourcing, A.I.',
        image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Urban Styling',
        category: 'Creative Direction',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop',
    },
]

const Projects = () => {
    return (
        <section className="bg-black text-white py-32 px-6 md:px-10">
            {/* Griflan uses extremely wide containers for their site-max layout */}
            <div className="container">

                {/* HEADER */}
                <div className="relative mb-24 border-b border-white/10 pb-10">
                    <h2 className="text-5xl text-center md:text-7xl font-serif leading-tight">
                        Projects
                    </h2>

                </div>

                {/* STAGGERED MASONRY GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-20">

                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-20">
                        {projectsData.filter((_, i) => i % 2 === 0).map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                    {/* RIGHT COLUMN (Staggered offset) */}
                    <div className="flex flex-col gap-20 md:mt-32">
                        {projectsData.filter((_, i) => i % 2 !== 0).map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

const ProjectCard = ({ project }: { project: typeof projectsData[0] }) => {
    return (
        <div className="group cursor-pointer">
            {/* IMAGE WRAPPER */}
            <div className="relative bg-zinc-900 rounded-[2rem] aspect-[4/3] lg:aspect-video mb-6">

                {/* BACKGROUND IMAGE (Revealed on hover) */}
                <div className="absolute inset-0 overflow-hidden rounded-[2rem] z-0">
                    <img
                        src={project.image}
                        alt={`${project.title} background`}
                        className="
                            w-full h-full object-cover
                            transition-transform duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)]
                            scale-100 group-hover:scale-105
                        "
                    />
                    {/* Shadow overlay so the top image pops out aggressively */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-[1200ms]" />
                </div>

                {/* TOP IMAGE (Shrinks to half and stays perfectly centered) */}
                <div className="
                    absolute inset-0 overflow-hidden rounded-[2rem] z-10
                    shadow-[0_20px_50px_rgba(0,0,0,0.5)]
                    transform origin-center
                    transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)]
                    group-hover:scale-50
                ">
                    <img
                        src={project.image}
                        alt={`${project.title} top`}
                        className="w-full h-full object-cover object-center"
                    />
                </div>

            </div>

            {/* CONTENT */}
            <div>
                <h3 className="text-2xl md:text-3xl font-serif mb-2 transition-colors duration-300 group-hover:text-red-500">
                    {project.title}
                </h3>
                <p className="text-gray-400 font-sans tracking-wide text-sm">
                    {project.category}
                </p>
            </div>
        </div>
    )
}

export default Projects
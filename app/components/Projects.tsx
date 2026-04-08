import React from 'react'

const projectsData = [
    { id: 1, title: 'Campaign One', category: 'Fashion', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop' },
    { id: 2, title: 'Brand Evolution', category: 'Design', image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop' },
    { id: 3, title: 'Summer Collection', category: 'Cosmetics', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop' },
    { id: 4, title: 'Urban Styling', category: 'Creative Direction', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop' },
]

const Projects = () => {
    return (
        <section className="bg-black text-white py-32 px-10">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-white/10 pb-10">
                    <h2 className="text-5xl md:text-7xl font-serif">Selected <br/> Works</h2>
                    <p className="text-xl text-gray-400 max-w-sm mt-6 md:mt-0">
                        A curated selection of campaigns that drive impact.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projectsData.map((project) => (
                        <div key={project.id} className="group cursor-pointer">
                            <div className="overflow-hidden bg-zinc-900 rounded-sm mb-6 aspect-[4/5] object-cover">
                                <img 
                                    src={project.image} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                                />
                            </div>
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-3xl font-serif mb-2">{project.title}</h3>
                                    <p className="text-gray-400 uppercase tracking-widest text-sm">{project.category}</p>
                                </div>
                                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black">
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
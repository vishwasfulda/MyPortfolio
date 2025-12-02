import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code, 
  GraduationCap, 
  Cpu, 
  Database, 
  Globe, 
  Terminal, 
  Menu, 
  X,
  ChevronRight,
  Download,
  Sparkles
} from 'lucide-react';

const Portfolio = ({ navigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effects for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll function for navigation links
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({ id, children }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`relative text-sm font-medium transition-colors duration-300 ${
        activeSection === id ? 'text-teal-400' : 'text-zinc-400 hover:text-teal-200'
      }`}
    >
      {children}
      {activeSection === id && (
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-violet-500 rounded-full animate-fade-in" />
      )}
    </button>
  );

  const MobileNavLink = ({ id, children }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="block w-full text-left px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-teal-400 transition-colors"
    >
      {children}
    </button>
  );

  // ===========================
  // PERSONAL INFORMATION
  // ===========================
  const personalInfo = {
    name: "Vishwas Chhetri",
    role: "M.Sc. Global Software Development",
    university: "Fulda University of Applied Sciences",
    tagline: "Mastering the Code & Defining the Future",
    bio: "Motivated Master's student in Global Software Development with a Bachelor's degree in Computer Applications...",
    email: "vishwaschhetri108@gmail.com",
    github: "https://github.com/vishwasfulda",
    linkedin: "https://www.linkedin.com/in/vishwas-chhetri-a0a6b5212",
    profileImage: "/ProfilePic.png",
    resumePath: "Vishwas_Chhetri_Resume.pdf"   // <--- CORRECT PATH
  };

  const skills = [
    { category: "Languages", icon: <Terminal size={18} />, items: ["Python", "Java", "TypeScript","SQL"] },
    { category: "Frontend", icon: <Globe size={18} />, items: ["React", "Next.js", "Tailwind CSS", "Three.js"] },
    { category: "Backend", icon: <Database size={18} />, items: ["Node.js", "MySql"] },
    { category: "DevOps", icon: <Cpu size={18} />, items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"] }
  ];

  const experience = [
    {
      company: "Fulda University of Applied Sciences",
      role: "Cloud Computing Tutor",
      period: "May 2025 - Oct 2025",
      description: "Assisted my university professor in developing practical cloud content..."
    },
    {
      company: "Stem Academy",
      role: "Graphic Designer",
      period: "Aug 2023 - Sep 2023",
      description: "Completed a design-focused program..."
    },
    {
      company: "UptoSkills",
      role: "Web Developer",
      period: "Aug 2021 - Aug 2022",
      description: "Completed a practical program focused on frontend technologies..."
    }
  ];

  const projects = [
    {
      title: "React Calculator App",
      description: "A functional calculator built using React.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      link: "calculator"
    },
    {
      title: "Simple 3D Viewer",
      description: "Three.js-based interactive 3D geometry viewer.",
      tags: ["React", "Three.js", "Graphics"],
      link: "3d-viewer"
    },
    {
      title: "Cloud Weather Dashboard",
      description: "Real-time weather dashboard with system metrics.",
      tags: ["Kubernetes", "Docker", "React", "DevOps"],
      link: "weather-dashboard"
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div 
            className="text-2xl font-bold tracking-tighter cursor-pointer" 
            onClick={() => scrollToSection('home')}
          >
            <span className="bg-gradient-to-r from-teal-400 to-violet-500 bg-clip-text text-transparent">
              {personalInfo.name.split(' ')[0]}
            </span>
            <span className="text-zinc-500 font-light">.dev</span>
          </div>

          <div className="hidden md:flex space-x-8">
            <NavLink id="home">Home</NavLink>
            <NavLink id="about">About</NavLink>
            <NavLink id="experience">Experience</NavLink>
            <NavLink id="projects">Projects</NavLink>
            <NavLink id="contact">Contact</NavLink>
          </div>

          <button 
            className="md:hidden text-zinc-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 border-b border-white/10">
            <div className="flex flex-col py-4">
              <MobileNavLink id="home">Home</MobileNavLink>
              <MobileNavLink id="about">About</MobileNavLink>
              <MobileNavLink id="experience">Experience</MobileNavLink>
              <MobileNavLink id="projects">Projects</MobileNavLink>
              <MobileNavLink id="contact">Contact</MobileNavLink>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="pt-32 pb-20 md:pt-52 md:pb-40 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start gap-20">

          {/* Text */}
          <div className="md:w-2/3">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-white/5 border border-white/10 text-teal-400">
              <Sparkles size={14} />
              <span>Available for Opportunities</span>
            </div>

            <h1 className="text-5xl md:text-8xl font-bold leading-none mb-6">
              Hello, I'm <br />
              <span className="bg-gradient-to-r from-teal-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
                {personalInfo.name}.
              </span>
            </h1>

            <h2 className="text-2xl md:text-4xl font-light text-zinc-300 mb-8">
              {personalInfo.tagline}
            </h2>

            <p className="text-lg text-zinc-300 mb-10 max-w-xl leading-relaxed">
              {personalInfo.bio}
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-white text-zinc-950 rounded-lg font-semibold hover:scale-105 transition-all"
              >
                View My Work
              </button>

              <button 
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-lg font-medium"
              >
                Contact Me
              </button>
            </div>
          </div>

          {/* Profile Image */}
          {personalInfo.profileImage && (
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <img 
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover border-4 border-teal-500 shadow-lg"
              />
            </div>
          )}

        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-24">

          {/* About */}
          <div className="md:w-1/2">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-teal-400 font-mono text-lg">01.</span>
              <h2 className="text-3xl font-bold text-white">About Me</h2>
            </div>

            <p className="text-lg text-zinc-300 leading-relaxed mb-6">
              My journey began...
            </p>

            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="flex gap-4">
                <div className="p-3 bg-teal-500/10 text-teal-400 rounded-xl">
                  <GraduationCap size={28} />
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold">
                    {personalInfo.university}
                  </h4>
                  <p className="text-zinc-400">M.Sc. Computer Science</p>
                  <div className="mt-2 px-3 py-1 bg-white/5 text-xs text-zinc-400 border border-white/5 rounded-full">
                    Graduating 2025
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
              <span className="w-8 h-px bg-teal-500/50" /> Tech Stack
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="p-5 bg-zinc-900/40 hover:bg-zinc-800/60 rounded-xl border border-white/5 hover:border-teal-500/30"
                >
                  <div className="flex items-center gap-3 text-zinc-400 mb-4">
                    {skill.icon}
                    <span className="font-semibold">{skill.category}</span>
                  </div>
                  <ul className="space-y-2">
                    {skill.items.map((item, i) => (
                      <li key={i} className="text-sm text-zinc-500 flex items-center gap-2">
                        <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-24 px-6 bg-zinc-900/30">
        <div className="max-w-4xl mx-auto">
          
          <div className="flex items-center gap-4 mb-16">
            <span className="text-teal-400 font-mono text-lg">02.</span>
            <h2 className="text-3xl font-bold text-white">Experience</h2>
          </div>

          <div className="relative border-l border-white/10 ml-6 space-y-16">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-12">
                
                <div className="absolute -left-[7px] top-2 w-3 h-3 bg-zinc-800 border border-zinc-600 rounded-full" />

                <div className="flex flex-col sm:flex-row sm:justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white">{job.role}</h3>
                  <span className="text-sm text-zinc-500">{job.period}</span>
                </div>

                <h4 className="text-lg text-violet-400 mb-4">{job.company}</h4>
                <p className="text-zinc-300 max-w-2xl">{job.description}</p>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex items-center gap-4 mb-16">
            <span className="text-teal-400 font-mono text-lg">03.</span>
            <h2 className="text-3xl font-bold text-white">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group p-8 bg-zinc-900/30 border border-white/5 hover:border-white/10 rounded-2xl"
              >
                <div className="flex justify-between mb-6">
                  <div className="p-3 bg-zinc-800/50 text-teal-400 rounded-xl">
                    <Code size={24} />
                  </div>

                  {/* INTERNAL ROUTING */}
                  <button
                    onClick={() => navigate(project.link)}
                    className="text-zinc-500 hover:text-teal-400"
                  >
                    <ExternalLink size={20} />
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-zinc-300 text-sm mb-6">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {project.tags.map((tag, i) => (
                    <span 
                      key={i}
                      className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto p-1 rounded-3xl bg-gradient-to-r from-teal-500/20 via-violet-500/20 to-teal-500/20">
          <div className="bg-zinc-950 rounded-[22px] p-10 md:p-16">

            <p className="text-teal-400 font-mono mb-6">04. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Build Together</h2>
            <p className="text-zinc-300 text-lg mb-10 max-w-xl mx-auto">
              I'm actively seeking opportunities — let's chat!
            </p>

            {/* =============================== */}
            {/*  FINAL FIXED RESUME DOWNLOAD    */}
            {/* =============================== */}
            <div className="flex justify-center">
              <a 
                href={personalInfo.resumePath}
                download="Vishwas_Chhetri_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-transparent border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Resume
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 text-center text-zinc-600 text-sm">
        <div className="flex justify-center gap-8 mb-6">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <Github size={22} />
          </a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400">
            <Linkedin size={22} />
          </a>
        </div>
        <p>Built with React, Tailwind & Caffeine by <span className="text-teal-500/80">{personalInfo.name}</span></p>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; width: 0; }
          to { opacity: 1; width: 100%; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-gradient { animation: gradient 6s ease infinite; }
      `}</style>

    </div>
  );
};

export default Portfolio;

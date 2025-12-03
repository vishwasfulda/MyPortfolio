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
          // Checks if the section is currently near the top of the viewport
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
      setIsMenuOpen(false); // Close mobile menu after selection
    }
  };

  // Component for desktop navigation links
  const NavLink = ({ id, children }) => (
    <button
      onClick={() => scrollToSection(id)}
      className={`relative text-sm font-medium transition-colors duration-300 ${
        activeSection === id ? 'text-teal-400' : 'text-zinc-400 hover:text-teal-200'
      }`}
    >
      {children}
      {activeSection === id && (
        // Active indicator line with gradient animation
        <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-violet-500 rounded-full animate-fade-in" />
      )}
    </button>
  );

  // Component for mobile navigation links
  const MobileNavLink = ({ id, children }) => (
    <button
      onClick={() => scrollToSection(id)}
      className="block w-full text-left px-4 py-3 text-zinc-300 hover:bg-white/5 hover:text-teal-400 transition-colors"
    >
      {children}
    </button>
  );

  // =============================================================
  // ===  START OF CONFIGURATION DATA: EDIT YOUR INFO BELOW  ===
  // =============================================================
  const personalInfo = {
    name: "Vishwas Chhetri",
    role: "M.Sc. Global Software Development",
    university: "Fulda University of Applied Sciences",
    tagline: "Mastering the Code & Defining the Future",
    bio: "Master's student in Global Software Development, specializing in scalable, full-stack application engineering. Proficient across the stack with Python, TypeScript, and Java, building modern, performance-driven user interfaces using React, Next.js, and Tailwind CSS. Experienced in backend development with Node.js and data management with MySQL. I possess essential DevOps skills, including hands-on experience with Docker, Kubernetes, AWS, and Terraform for continuous, cloud-native deployments. Highly adaptable and eager to contribute effectively in international and agile environments.",
    email: "vishwaschhetri108@gmail.com",
    github: "https://github.com/vishwasfulda",
    linkedin: "https://www.linkedin.com/in/vishwas-chhetri-a0a6b5212",
    profileImage: "/ProfilePic.png", 
    resumePath: "/Vishwas_Chhetri_Resume.pdf" 
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
      role: "Cloud Computing Tutuor",
      period: "May 2025 - Oct 2025",
      description: "Assisted My universtiy proffesor in developing practical for the university students to understand the basics of Cloud Computing with use of Kubernetes and OpenStack"
    },
    {
      company: "Stem Academy",
      role: "Graphic Designer ",
      period: "Aug 2023 - Sep 2023",
      description: "Completed a design-focused program covering essential tools and principles of graphic design, including layout, typography, color theory, and the use of industrystandard software for creating visual content."
    },
    {
      company: "UptoSkills",
      role: "Web Developer",
      period: "Aug 2021 - Aug 2022",
      description: "Completed a practical, hands-on program focused on frontend technologies such as HTML5, CSS3, JavaScript, and modern frameworks. Gained foundational knowledge in web design principles and responsive development."
      }
    ];

  // Project list updated to include the Weather Dashboard
  const projects = [
    {
      title: "React Calculator App",
      description: "A simple, functional calculator built using React for state management and basic arithmetic operations, demonstrating core component architecture.",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      link: "calculator" // Internal link used by AppRouter
    },
    {
      title: "Simple 3D Viewer", 
      description: "An interactive web application using Three.js to render and manipulate basic 3D geometry (e.g., cubes, spheres), highlighting frontend graphics ability.",
      tags: ["React", "Three.js", "Graphics"],
      link: "3d-viewer" // Internal link to the separate Simple3DViewer component
    },
    {
      title: " Weather Dashboard",
      description: "A responsive, modern dashboard simulating real-time weather and operational system metrics (latency, health), designed for cloud-native deployment.",
      // UPDATED TAGS: Focusing on Cloud/DevOps architecture
      tags: ["Kubernetes", "Docker", "React", "DevOps", "System Metrics"],
      link: "weather-dashboard" // Internal link to the separate WeatherDashboard component
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-200 font-sans selection:bg-teal-500/30 overflow-x-hidden">
      
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] opacity-50 animate-pulse" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[120px] opacity-50" />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled ? 'bg-zinc-950/80 backdrop-blur-xl border-white/5 py-4' : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <div className="text-2xl font-bold tracking-tighter hover:scale-105 transition-transform cursor-pointer" onClick={() => scrollToSection('home')}>
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
          <div className="md:hidden absolute top-full left-0 w-full bg-zinc-900/95 backdrop-blur-xl border-b border-white/10">
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

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-52 md:pb-40 px-6 z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-20">
            
            {/* Text Content */}
            <div className="md:w-2/3 md:order-first">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-teal-400 text-sm font-medium mb-6 animate-fade-in-up">
                <Sparkles size={14} />
                <span>Available for Opportunities</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
                Hello, I'm <br />
                <span className="bg-gradient-to-r from-teal-400 via-violet-400 to-teal-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                  {personalInfo.name}.
                </span>
              </h1> 
              
              <h2 className="text-2xl md:text-4xl font-light text-zinc-300 mb-8 max-w-2xl leading-tight"> {/* Increased contrast */}
                {personalInfo.tagline}
              </h2> 
              
              <p className="text-lg text-zinc-300 max-w-xl mb-10 leading-relaxed"> {/* Increased contrast */}
                {personalInfo.bio}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-8 py-4 bg-white text-zinc-950 rounded-lg font-semibold transition-all hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10 group-hover:text-teal-900 transition-colors">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
                
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="px-8 py-4 bg-white/5 border border-white/10 hover:border-white/20 text-white rounded-lg font-medium transition-all hover:bg-white/10 backdrop-blur-sm"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Image addition starts here */}
            {personalInfo.profileImage && (
              <div className="md:w-1/3 flex justify-center md:justify-end mt-8 md:mt-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <img 
                  src={personalInfo.profileImage} 
                  alt={personalInfo.name} 
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover border-4 border-teal-500 shadow-lg" 
                />
              </div>
            )}
            {/* Image addition ends here */}

          </div>
        </div>
      </section>

      {/* About & Skills Section */}
      <section id="about" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16 md:gap-24">
            
            {/* About Text */}
            <div className="md:w-1/2">
              <div className="flex items-center gap-4 mb-8">
                <span className="text-teal-400 font-mono text-lg">01.</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">About Me</h2>
              </div>
              
              <div className="text-zinc-400 space-y-6 text-lg leading-relaxed"> {/* Increased contrast */}
                <p>
                  My journey began with a simple script and evolved into a passion for complex distributed systems. As a Masters student at <span className="text-white font-medium">{personalInfo.university}</span>, I bridge the gap between theoretical algorithms and shipping production code.
                </p>
                <p>
                  I thrive in environments where performance matters. Whether it's optimizing database queries or architecting cloud-native solutions, I'm always looking for the "better way" to build.
                </p>
              </div>

              {/* Education Card */}
              <div className="mt-10 p-6 bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-2xl backdrop-blur-sm">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-teal-500/10 rounded-xl text-teal-400">
                    <GraduationCap size={28} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{personalInfo.university}</h4>
                    <p className="text-zinc-400">M.Sc. Computer Science</p>
                    <div className="mt-2 inline-block px-3 py-1 bg-white/5 rounded-full text-xs text-zinc-400 border border-white/5">
                      Graduating 2026
                    </div>
                  </div>
                  </div>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="md:w-1/2">
              <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                <span className="w-8 h-px bg-teal-500/50"></span>
                Tech Stack
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, index) => (
                  <div key={index} className="group p-5 bg-zinc-900/40 hover:bg-zinc-800/60 rounded-xl border border-white/5 hover:border-teal-500/30 transition-all duration-300 backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-4 text-zinc-400 group-hover:text-teal-400 transition-colors">
                      {skill.icon}
                      <span className="font-semibold">{skill.category}</span>
                    </div>
                    <ul className="space-y-2">
                      {skill.items.map((item, i) => (
                        <li key={i} className="text-sm text-zinc-500 group-hover:text-zinc-300 flex items-center gap-2 transition-colors">
                          <span className="w-1 h-1 bg-zinc-600 group-hover:bg-teal-400 rounded-full transition-colors"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-zinc-900/30 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-teal-400 font-mono text-lg">02.</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Experience</h2>
            
          </div>

          <div className="relative border-l border-white/10 ml-3 md:ml-6 space-y-16">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-8 md:pl-12 group">
                {/* Timeline Dot */}
                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-teal-400 group-hover:border-teal-400 transition-all duration-300 ring-4 ring-zinc-950"></div>
                
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                  <h3 className="text-2xl font-bold text-white group-hover:text-teal-400 transition-colors">
                    {job.role}
                  </h3>
                  <span className="font-mono text-sm text-zinc-500">{job.period}</span>
                </div>
                
                <h4 className="text-lg text-violet-400 font-medium mb-4">{job.company}</h4>
                <p className="text-zinc-400 leading-relaxed max-w-2xl"> {/* Restored original contrast for experience text */}
                  {job.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-16">
            <span className="text-teal-400 font-mono text-lg">03.</span>
            <h2 className="text-3xl font-bold text-white tracking-tight">Featured Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="group relative bg-zinc-900/30 rounded-2xl p-8 border border-white/5 hover:border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-2"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-6">
                    <div className="p-3 bg-zinc-800/50 rounded-xl text-teal-400 group-hover:text-white group-hover:bg-teal-500 transition-colors duration-300">
                      <Code size={24} />
                  </div>
                  
                    {/* Live Demo Link / Internal Router Link */}
                    <div className="flex gap-4 text-zinc-500">
                      {project.link === 'calculator' || project.link === '3d-viewer' || project.link === 'weather-dashboard' ? (
                        <button 
                          onClick={() => navigate(project.link)}
                          className="hover:text-teal-400 transition-colors"
                          aria-label="View Live App"
                        >
                          <ExternalLink size={20} />
                        </button>
                      ) : (
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="hover:text-teal-400 transition-colors"
                          aria-label="View Live Demo"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-teal-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-zinc-500 mb-6 leading-relaxed flex-grow text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-xs font-mono text-zinc-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 text-center relative z-10">
        <div className="max-w-3xl mx-auto p-1 rounded-3xl bg-gradient-to-r from-teal-500/20 via-violet-500/20 to-teal-500/20">
          <div className="bg-zinc-950 rounded-[22px] p-10 md:p-16">
            <p className="text-teal-400 font-mono mb-6">04. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Let's Build Together</h2>
            <p className="text-zinc-400 text-lg mb-10 leading-relaxed max-w-xl mx-auto">
              I'm actively seeking opportunities. If you're looking for someone who cares about code quality and system architecture, let's chat.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={personalInfo.resumePath} 
                download 
                className="px-8 py-4 bg-transparent border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white rounded-lg font-medium transition-all flex items-center gap-2"
              >
                <Download size={18} />
                Resume
              </a>
            </div>
            </div>
            </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-zinc-600 text-sm relative z-10">
        <div className="flex justify-center gap-8 mb-6">
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors transform hover:-translate-y-1"><Github size={22} /></a>
          <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors transform hover:-translate-y-1"><Linkedin size={22} /></a>
        </div>
        <p>Built with React, Tailwind & Caffeine by <span className="text-teal-500/80">{personalInfo.name}</span></p>
      </footer>

      {/* Global Styles for Animations */}
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
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-gradient {
          animation: gradient 6s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;
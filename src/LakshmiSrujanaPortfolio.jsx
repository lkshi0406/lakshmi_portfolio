import { useState, useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home","About","Projects","Skills","Achievements","Experience","Contact"];

const PROJECTS = [
  {
    title: "Client Portfolio Website",
    desc: "Engineered a responsive portfolio site end-to-end for a client — from requirements gathering to on-time delivery. Built with semantic HTML, custom CSS, and Git-based version control.",
    tech: ["HTML","CSS","Git"],
    icon: "💼",
    status: null,
    color: "#2563eb",
    github_url: "https://github.com/lkshi0406?tab=repositories",
    demo_url: "https://dilip-kumar-salvadi.vercel.app/",
  },
  {
    title: "URL Shortener - Shortie",
    desc: "Engineered a full-stack URL shortener with custom aliases, instant redirection, and link analytics. Deployed on Render with a PostgreSQL backend and a clean REST API.",
    tech: ["Python", "PostgreSQL", "REST API", "Render"],
    icon: "🔗",
    status: null,
    color: "#2563eb",
    github_url: "https://github.com/lkshi0406?tab=repositories",
    demo_url: "https://url-shortener-frontend-three-phi.vercel.app/",
  },
  {
    title: "Food Recommendation & Recipe Suggestion System",
    desc: "Building an ML-powered recipe engine that infers dishes from partial ingredient lists. Experimenting with TF-IDF similarity and classification models, with a REST API backend for integration.",
    tech: ["Python","Machine Learning","REST API"],
    icon: "🍽️",
    status: "In Progress",
    color: "#2563eb",
    github_url: "https://github.com/lkshi0406?tab=repositories",
    demo_url: "#",
  },
];

const SKILLS = [
  {
    category: "Languages",
    icon: "⟨/⟩",
    items: ["Java","C++","SQL"],
  },
  {
    category: "Web Technologies",
    icon: "🌐",
    items: ["HTML","CSS","JavaScript","REST APIs"],
  },
  {
    category: "CS Fundamentals",
    icon: "🧠",
    items: ["Data Structures & Algorithms","OOP","DBMS","Operating Systems","Computer Networks"],
  },
  {
    category: "Tools & Platforms",
    icon: "🛠️",
    items: ["Git","GitHub","VS Code","MySQL"],
  },
];

const ACHIEVEMENTS = [
  {
    title: "GitHub Constellation 2026",
    detail: "Attended GitHub's flagship developer conference, connecting with industry leaders and exploring the latest in software development",
    icon: "🤝",
    color: "#f59e0b",
  },
  {
    title: "Cognizant Technoverse 2026",
    detail: "Advanced to the Agent Builder Round after successfully clearing the initial evaluation stages in Cognizant Technoverse 2026, demonstrating strong problem-solving, technical aptitude, and innovative thinking in competitive challenges.",
    icon: "🏆",
    color: "#2563eb",
  },
  {
    title: "Inclusion Officer",
    detail: "GitHub Community Club — championed diversity and inclusion initiatives",
    icon: "🤝",
    color: "#10b981",
  },
  {
    title: "Event Lead",
    detail: "GitHub Community Club — led technical events including Epoch 2024 & 2025",
    icon: "⭐",
    color: "#6366f1",
  },
  {
    title: "Active DSA Solver",
    detail: "Consistent problem solver on LeetCode, GeeksforGeeks, and CodeStudio",
    icon: "💡",
    color: "#2563eb",
  },
];

const EDUCATION = [
  {
    school: "GITAM University Bengaluru",
    degree: "B.Tech — Computer Science Engineering",
    year: "2023 – 2027 (Expected)",
    score: "CGPA: 8.55/10",
    icon: "🎓",
  },
  {
    school: "REVA University",
    degree: "Pre-University Course (PUC)",
    year: "2021 – 2023",
    score: "Percentage: 92.5%",
    icon: "📚",
  },
  {
    school: "Sri Chaitanya Techno School",
    degree: "Class X Board Exams",
    year: "2021",
    score: "GPA: 10/10",
    icon: "🏫",
  },
];

const CODING_PROFILES = [
  { name: "GitHub", url: "https://github.com/lkshi0406", color: "#2563eb", bg: "#eff6ff", icon: "GH" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/lakshmi-srujana-vls/", color: "#2563eb", bg: "#eff6ff", icon: "in" },
  { name: "LeetCode", url: "https://leetcode.com/u/GB2023005037/", color: "#2563eb", bg: "#eff6ff", icon: "LC" },
];

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────

function ScrollBar() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      setPct((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div style={{
      position:"fixed", top:0, left:0, right:0, height:3, zIndex:1000,
      background:`linear-gradient(90deg, #2563eb 0%, #2563eb ${pct}%, #e2e8f0 ${pct}%, #e2e8f0 100%)`,
      transition:"none"
    }} />
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [active, setActive] = useState("Home");
  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_LINKS.map(link => document.getElementById(link.toLowerCase()));
      for (let section of sections) {
        if (!section) continue;
        if (section.getBoundingClientRect().top < 150) setActive(section.id.charAt(0).toUpperCase() + section.id.slice(1));
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav style={{
      position:"fixed", top:0, left:0, right:0, zIndex:999,
      background:"rgba(255,255,255,0.85)", backdropFilter:"blur(8px)",
      borderBottom:"1px solid #e2e8f0", paddingBottom:0,
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"16px 2rem", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:20, fontWeight:700, color:"#2563eb" }}>LS.</div>
        <div style={{ display:"flex", gap:32, alignItems:"center" }}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={{
              textDecoration:"none", color:"#475569", fontSize:14, fontWeight:active.toLowerCase() === link.toLowerCase() ? 600 : 400,
              borderBottom: active.toLowerCase() === link.toLowerCase() ? "2px solid #2563eb" : "none",
              paddingBottom: active.toLowerCase() === link.toLowerCase() ? 4 : 0,
              transition:"all 150ms",
            }}
              onMouseEnter={e => { if(active.toLowerCase() !== link.toLowerCase()) e.target.style.color="#0f172a"; }}
              onMouseLeave={e => { if(active.toLowerCase() !== link.toLowerCase()) e.target.style.color="#475569"; }}
            >{link}</a>
          ))}
        </div>
      </div>
    </nav>
  );
}

// ─── Animation hook ──────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [ref, inView] = useInView();
  return (
    <section id="home" style={{ background:"#ffffff", padding:"140px 2rem 100px", textAlign:"center" }}>
      <div ref={ref} style={{ maxWidth:900, margin:"0 auto", opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)", transition:"all 0.7s cubic-bezier(.16,1,.3,1)" }}>
        <p style={{ fontFamily:"'Inter', sans-serif", fontSize:14, fontWeight:600, letterSpacing:"0.12em", color:"#2563eb", textTransform:"uppercase", marginBottom:12 }}>Hi there 👋</p>
        <h1 style={{ fontFamily:"'Inter', sans-serif", fontSize:56, fontWeight:700, color:"#0f172a", marginBottom:20, lineHeight:1.2 }}>
          I'm Lakshmi Srujana
        </h1>
        <p style={{ fontFamily:"'Inter', sans-serif", fontSize:18, color:"#475569", lineHeight:1.8, marginBottom:40 }}>
          B.Tech CSE student @ GITAM University • Full-Stack Developer • ML Enthusiast • GitHub Community Contributor
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", marginBottom:48 }}>
          <a href="#projects" style={{
            fontFamily:"'Inter', sans-serif", padding:"12px 32px", background:"#2563eb", color:"white", textDecoration:"none",
            borderRadius:8, fontWeight:600, fontSize:14, transition:"all 150ms", border:"none", cursor:"pointer",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="#1d4ed8"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#2563eb"; }}
          >Explore My Work</a>
          <a href="#contact" style={{
            fontFamily:"'Inter', sans-serif", padding:"12px 32px", background:"transparent", color:"#0f172a", textDecoration:"none",
            borderRadius:8, fontWeight:600, fontSize:14, transition:"all 150ms", border:"1.5px solid #0f172a", cursor:"pointer",
          }}
            onMouseEnter={e => { e.currentTarget.style.background="#f8fafc"; }}
            onMouseLeave={e => { e.currentTarget.style.background="transparent"; }}
          >Get In Touch</a>
        </div>
      </div>
    </section>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

function Section({ id, title, subtitle, children, alt }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} style={{
      padding:"80px 2rem",
      background: alt ? "#f1f5f9" : "#ffffff",
      position:"relative",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div ref={ref} style={{
          marginBottom:64,
          opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)",
          transition:"all 0.6s cubic-bezier(.16,1,.3,1)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:16 }}>
            <div style={{ height:2, width:24, background:"#2563eb", borderRadius:1 }} />
            <span style={{ fontFamily:"'Inter', sans-serif", fontSize:12, fontWeight:600, letterSpacing:"0.12em", color:"#2563eb", textTransform:"uppercase" }}>
              {subtitle}
            </span>
          </div>
          <h2 style={{ fontFamily:"'Inter', sans-serif", fontSize:42, fontWeight:700, color:"#0f172a" }}>
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const [ref, inView] = useInView();
  return (
    <Section id="about" title="About Me" subtitle="who i am">
      <div ref={ref} style={{
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start",
        opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)",
        transition:"all 0.7s cubic-bezier(.16,1,.3,1) 0.1s",
      }}>
        <div>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#475569", fontSize:16, lineHeight:1.8, marginBottom:24 }}>
            I'm a B.Tech Computer Science Engineering student at <span style={{ color:"#0f172a", fontWeight:600 }}>GITAM University Bengaluru</span> (Expected 2027), maintaining a CGPA of <span style={{ color:"#0f172a", fontWeight:600 }}>8.55/10</span>.
          </p>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#475569", fontSize:16, lineHeight:1.8, marginBottom:24 }}>
            I'm passionate about <span style={{ color:"#2563eb", fontWeight:600 }}>software engineering</span>, backend systems, data structures & algorithms, and full-stack web development. I enjoy designing scalable solutions that are performant and user-focused.
          </p>
          <p style={{ fontFamily:"'Inter', sans-serif", color:"#475569", fontSize:16, lineHeight:1.8 }}>
            Beyond academics, I actively contribute to the <span style={{ color:"#10b981", fontWeight:600 }}>GitHub Community Club</span> as both Inclusion Officer and Event Lead, and consistently solve problems on platforms like LeetCode and GeeksforGeeks.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
          {[
            { label:"CGPA", value:"8.55", sub:"/ 10" },
            { label:"Graduation", value:"2027", sub:"B.Tech CSE" },
            { label:"PUC Score", value:"92.5%", sub:"REVA University" },
            { label:"Class X", value:"10/10", sub:"GPA" },
          ].map(s => (
            <div key={s.label} style={{
              background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:12, padding:"24px", transition:"all 150ms",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="#2563eb"; e.currentTarget.style.boxShadow="0 4px 12px rgba(37,99,235,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{ fontFamily:"'Inter', sans-serif", fontSize:32, fontWeight:700, color:"#2563eb", lineHeight:1 }}>
                {s.value}<span style={{ fontSize:14, color:"#94a3b8", marginLeft:4 }}>{s.sub}</span>
              </div>
              <div style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:"#94a3b8", marginTop:8, fontWeight:500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ marginTop:80 }}>
        <h3 style={{ fontFamily:"'Inter', sans-serif", fontSize:21, color:"#0f172a", marginBottom:28, fontWeight:700 }}>Education</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {EDUCATION.map((e, i) => {
            const [r, v] = useInView();
            return (
              <div key={i} ref={r} style={{
                display:"flex", gap:24, alignItems:"flex-start",
                background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:12, padding:"28px",
                opacity: v?1:0, transform: v?"translateX(0)":"translateX(-20px)",
                transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.1}s`,
              }}>
                <div style={{ fontSize:32, flexShrink:0 }}>{e.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Inter', sans-serif", fontSize:17, fontWeight:700, color:"#0f172a" }}>{e.school}</div>
                  <div style={{ fontFamily:"'Inter', sans-serif", color:"#475569", fontSize:15, marginTop:4 }}>{e.degree}</div>
                  <div style={{ display:"flex", gap:20, marginTop:12, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:"#2563eb", fontWeight:500 }}>{e.year}</span>
                    <span style={{ fontFamily:"'Inter', sans-serif", fontSize:13, color:"#6366f1", fontWeight:500 }}>{e.score}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <Section id="projects" title="Projects" subtitle="what i've built" alt>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(320px, 1fr))", gap:28, alignItems:"stretch" }}>
        {PROJECTS.map((p, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={i} ref={ref} style={{
              background:"#ffffff", border:`1px solid #e2e8f0`, borderRadius:12,
              display:"flex", flexDirection:"column", overflow:"hidden",
              transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.1}s`,
              opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor="#2563eb";
                e.currentTarget.style.transform="translateY(-8px)";
                e.currentTarget.style.boxShadow="0 4px 20px rgba(37,99,235,0.10)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor="#e2e8f0";
                e.currentTarget.style.transform="translateY(0)";
                e.currentTarget.style.boxShadow="none";
              }}
            >
              {/* Thumbnail */}
              <div style={{
                height:180, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center",
                borderBottom:"1px solid #e2e8f0", fontSize:64,
              }}>{p.icon}</div>

              {/* Top accent bar */}
              <div style={{ height:3, background:"#2563eb" }} />

              {/* Content */}
              <div style={{ padding:"24px", display:"flex", flexDirection:"column", flex:1 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                  <h3 style={{ fontFamily:"'Inter', sans-serif", fontSize:17, fontWeight:600, color:"#0f172a", margin:0 }}>
                    {p.title}
                  </h3>
                  {p.status && (
                    <div style={{
                      display:"flex", alignItems:"center", gap:8,
                      background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:20, padding:"4px 12px",
                      fontSize:11, fontWeight:600, color:"#c2410c", fontFamily:"'Inter', sans-serif",
                    }}>
                      <div style={{
                        width:8, height:8, borderRadius:"50%", background:"#c2410c",
                        animation:"pulse 2s infinite",
                      }} />
                      {p.status}
                    </div>
                  )}
                </div>
                <p style={{ fontFamily:"'Inter', sans-serif", color:"#64748b", fontSize:14, lineHeight:1.7, flex:1, marginBottom:20 }}>
                  {p.desc}
                </p>

                {/* Tech tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:24 }}>
                  {p.tech.map(t => (
                    <span key={t} style={{
                      background:"#eff6ff", color:"#1d4ed8", border:"1px solid #bfdbfe",
                      borderRadius:999, padding:"3px 10px", fontSize:11, fontWeight:500,
                      fontFamily:"'Inter', sans-serif",
                    }}>{t}</span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display:"flex", gap:12 }}>
                  <a href={p.github_url} target="_blank" rel="noreferrer" style={{
                    flex:1, textAlign:"center", padding:"8px 18px", borderRadius:8, fontSize:13,
                    fontFamily:"'Inter', sans-serif", fontWeight:500, textDecoration:"none",
                    border:"1.5px solid #0f172a", background:"transparent", color:"#0f172a",
                    transition:"all 150ms", cursor:"pointer",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.background="#0f172a"; e.currentTarget.style.color="white"; }}
                    onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#0f172a"; }}
                  >GitHub →</a>
                  {p.demo_url === "#" ? (
                    <div style={{
                      flex:1, textAlign:"center", padding:"8px 18px", borderRadius:8, fontSize:13,
                      fontFamily:"'Inter', sans-serif", fontWeight:500,
                      background:"#f1f5f9", color:"#94a3b8", cursor:"default",
                    }}>Coming Soon</div>
                  ) : (
                    <a href={p.demo_url} target="_blank" rel="noreferrer" style={{
                      flex:1, textAlign:"center", padding:"8px 18px", borderRadius:8, fontSize:13,
                      fontFamily:"'Inter', sans-serif", fontWeight:500, textDecoration:"none",
                      background:"#2563eb", color:"white", border:"none",
                      transition:"all 150ms", cursor:"pointer",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.background="#1d4ed8"; }}
                      onMouseLeave={e => { e.currentTarget.style.background="#2563eb"; }}
                    >Live Demo →</a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </Section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="technologies & tools">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:24 }}>
        {SKILLS.map((s, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={i} ref={ref} style={{
              background:"#ffffff", border:"1px solid #e2e8f0", borderRadius:12, padding:"24px",
              transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.1}s`,
              opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)",
            }}
              onMouseEnter={e => { 
                e.currentTarget.style.borderColor="#2563eb"; 
                e.currentTarget.style.boxShadow="0 4px 12px rgba(37,99,235,0.08)";
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.borderColor="#e2e8f0"; 
                e.currentTarget.style.boxShadow="none";
              }}
            >
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                <span style={{ fontSize:28 }}>{s.icon}</span>
                <h3 style={{ fontFamily:"'Inter', sans-serif", fontSize:15, fontWeight:700, color:"#0f172a", margin:0 }}>
                  {s.category}
                </h3>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {s.items.map(item => (
                  <span key={item} style={{
                    background:"#f1f5f9", color:"#0f172a", border:"1px solid #e2e8f0",
                    borderRadius:6, padding:"6px 12px", fontSize:13, fontFamily:"'Inter', sans-serif", fontWeight:500,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Achievements ─────────────────────────────────────────────────────────────

function Achievements() {
  return (
    <Section id="achievements" title="Achievements & Activities" subtitle="recognition" alt>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-f80px,1fr))", gap:28, marginBottom:56, alignItems:"stretch" }}>
        {ACHIEVEMENTS.map((a, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={i} ref={ref} style={{
              background:"#161b22", border:`1.5px solid rgba(231,76,60,0.2)`,
              borderRadius:12, padding:"28px",
              opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)",
              transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.1}s`,
              display:"flex", flexDirection:"column",
            }}>
              <div style={{ fontSize:36, marginBottom:16 }}>{a.icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, color:"#f0f0f0", marginBottom:12 }}>{a.title}</h3>
              <p style={{ color:"#cbd5e0", fontSize:14, lineHeight:1.6 }}>{a.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Leadership */}
      <div style={{
        background:"#161b22", border:"1.5px solid rgba(231,76,60,0.15)",
        borderRadius:12, padding:"32px",
      }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:19, color:"#f0f0f0", marginBottom:24, fontWeight:700 }}>Leadership & Community</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {[
            "Inclusion Officer at GitHub Community Club (2023–2024)",
            "Expert Team Member & Event Lead (2023–Present)",
            "Contributed to technical event organization and promotion",
            "Led marketing and design for Epoch 2024 and Epoch 2025",
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{
                width:28, height:28, borderRadius:6, background:"rgba(231,76,60,0.15)",
                border:"1.5px solid rgba(231,76,60,0.4)", display:"flex", alignItems:"center",
                justifyContent:"center", flexShrink:0, fontSize:14, color:"#e74c3c", fontWeight:700,
              }}>✓</div>
              <span style={{ color:"#cbd5e0", fontSize:15, lineHeight:1.6, paddingTop:2 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coding Profiles */}
      <div style={{ marginTop:56 }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:19, color:"#f0f0f0", marginBottom:24, fontWeight:700 }}>Coding Profiles</h3>
        <div style={{ display:"flex", flexWrap:"wrap", gap:20 }}>
          {CODING_PROFILES.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noreferrer" style={{
              display:"flex", alignItems:"center", gap:14,
              background:"#161b22", border:"1.5px solid rgba(231,76,60,0.15)",
              borderRadius:10, padding:"16px 24px", textDecoration:"none",
              transition:"all 0.3s",
              cursor:"pointer",
            }}
              onMouseEnter={e => { e.currentTarget.style.border=`1.5px solid #e74c3c`; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 8px 16px rgba(231,76,60,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.border="1.5px solid rgba(231,76,60,0.15)"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
            >
              <div style={{
                width:40, height:40, borderRadius:8,
                background:p.bg, border:`1.5px solid ${p.color}40`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Times New Roman', serif", fontSize:12, fontWeight:700, color:p.color,
              }}>{p.icon}</div>
              <span style={{ fontFamily:"'Times New Roman', serif", fontSize:14, color:"#f0f0f0", fontWeight:600 }}>{p.name}</span>
              <span style={{ fontSize:13, color:"#e74c3c", marginLeft:4 }}>↗</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

function Experience() {
  const [ref, inView] = useInView();
  return (
    <Section id="experience" title="Experience" subtitle="work history">
      <div ref={ref} style={{
        position:"relative", paddingLeft:40,
        opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)",
        transition:"all 0.7s cubic-bezier(.16,1,.3,1)",
      }}>
        {/* Timeline line */}
        <div style={{ position:"absolute", left:0, top:8, bottom:0, width:2, background:"linear-gradient(180deg,#e74c3c,#e74c3c40)" }} />

        <div style={{
          background:"#161b22", border:"1.5px solid rgba(231,76,60,0.2)",
          borderRadius:12, padding:"32px", position:"relative",
        }}>
          {/* Dot */}
          <div style={{
            position:"absolute", left:-45, top:32, width:20, height:20, borderRadius:"50%",
            background:"linear-gradient(135deg,#e74c3c,#f39c12)",
            border:"3px solid #0f172a",
          }} />

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12, marginBottom:20 }}>
            <div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:19, fontWeight:700, color:"#f0f0f0" }}>
                Consultancy Project Developer
              </h3>
              <p style={{ color:"#e74c3c", fontSize:15, fontFamily:"'Times New Roman', serif", marginTop:6, fontWeight:500 }}>Freelance / Client Project</p>
            </div>
            <span style={{
              fontFamily:"'Times New Roman', serif", fontSize:12, color:"#e74c3c",
              background:"rgba(231,76,60,0.15)", border:"1.5px solid rgba(231,76,60,0.4)",
              borderRadius:6, padding:"6px 14px", fontWeight:600,
            }}>2025</span>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {[
              "Developed a professional portfolio website for a client",
              "Built a fully responsive UI with clean, modern design principles",
              "Collaborated closely with client, iterating based on feedback",
              "Delivered the project successfully within agreed deadlines",
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ color:"#475569", flexShrink:0, marginTop:3, fontSize:16 }}>▸</span>
                <span style={{ color:"#475569", fontSize:15, lineHeight:1.6 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name:"", email:"", message:"" });
    }
  };

  return (
    <Section id="contact" title="Get In Touch" subtitle="contact me" alt>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"start" }}>
        {/* Info */}
        <div>
          <p style={{ color:"#475569", fontSize:16, lineHeight:1.8, marginBottom:32, fontFamily:"'Inter', sans-serif" }}>
            I'm currently open to internship opportunities, freelance projects, and collaborations. Feel free to reach out!
          </p>

          {[
            { icon:"📧", label:"Email", value:"srujanalakshmi08@gmail.com", href:"mailto:srujanalakshmi08@gmail.com" },
            { icon:"📍", label:"Location", value:"Bengaluru, India", href:"#" },
          ].map(c => (
            <a key={c.label} href={c.href} style={{
              display:"flex", gap:14, alignItems:"center",
              marginBottom:20, textDecoration:"none", padding:"16px 20px",
              background:"#ffffff", border:"1px solid #e2e8f0",
              borderRadius:10, transition:"all 0.3s", cursor: c.href === "#" ? "default" : "pointer",
            }}
              onMouseEnter={e => { if(c.href !== "#") { e.currentTarget.style.borderColor="#2563eb"; e.currentTarget.style.boxShadow="0 4px 12px rgba(37,99,235,0.08)"; } }}
              onMouseLeave={e => { if(c.href !== "#") { e.currentTarget.style.borderColor="#e2e8f0"; e.currentTarget.style.boxShadow="none"; } }}
            >
              <span style={{ fontSize:24 }}>{c.icon}</span>
              <div>
                <div style={{ fontFamily:"'Inter', sans-serif", fontSize:11, color:"#2563eb", marginBottom:2, fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase" }}>{c.label}</div>
                <div style={{ color:"#0f172a", fontSize:14, fontWeight:500, fontFamily:"'Inter', sans-serif" }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background:"#ffffff", border:"1px solid #e2e8f0",
          borderRadius:12, padding:"32px",
        }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"40px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
              <h3 style={{ fontFamily:"'Inter', sans-serif", color:"#10b981", marginBottom:8, fontSize:18, fontWeight:700 }}>Message Sent!</h3>
              <p style={{ color:"#94a3b8", marginBottom:24, fontFamily:"'Inter', sans-serif" }}>I'll get back to you soon.</p>
              <button onClick={() => setSent(false)} style={{
                marginTop:16, background:"transparent", border:"1.5px solid #2563eb",
                borderRadius:8, color:"#2563eb", padding:"8px 20px", cursor:"pointer",
                fontFamily:"'Inter', sans-serif", fontSize:13, fontWeight:600, transition:"all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.background="#eff6ff"; }}
                onMouseLeave={e => { e.currentTarget.style.background="transparent"; }}
              >Send another</button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {[
                { key:"name", label:"Name", type:"text", placeholder:"Your name" },
                { key:"email", label:"Email", type:"email", placeholder:"your@email.com" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display:"block", fontFamily:"'Inter', sans-serif", fontSize:12, color:"#2563eb", marginBottom:6, letterSpacing:"0.05em", fontWeight:600, textTransform:"uppercase" }}>{f.label}</label>
                  <input
                    type={f.type} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))}
                    placeholder={f.placeholder}
                    style={{
                      width:"100%", background:"#f8fafc",
                      border:"1px solid #e2e8f0", borderRadius:8,
                      padding:"10px 14px", color:"#0f172a", fontSize:14,
                      outline:"none", fontFamily:"'Inter', sans-serif",
                      transition:"all 0.2s",
                    }}
                    onFocus={e => { e.target.style.borderColor="#2563eb"; e.target.style.boxShadow="0 0 0 2px rgba(37,99,235,0.06)"; }}
                    onBlur={e => { e.target.style.borderColor="#e2e8f0"; e.target.style.boxShadow="none"; }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display:"block", fontFamily:"'Inter', sans-serif", fontSize:12, color:"#2563eb", marginBottom:6, letterSpacing:"0.05em", fontWeight:600, textTransform:"uppercase" }}>Message</label>
                <textarea
                  rows={5} value={form.message}
                  onChange={e => setForm(p => ({ ...p, message:e.target.value }))}
                  placeholder="What's on your mind?"
                  style={{
                    width:"100%", background:"#f8fafc",
                    border:"1px solid #e2e8f0", borderRadius:8,
                    padding:"10px 14px", color:"#0f172a", fontSize:14,
                    outline:"none", resize:"vertical", fontFamily:"'Inter', sans-serif",
                    transition:"all 0.2s",
                  }}
                  onFocus={e => { e.target.style.borderColor="#2563eb"; e.target.style.boxShadow="0 0 0 2px rgba(37,99,235,0.06)"; }}
                  onBlur={e => { e.target.style.borderColor="#e2e8f0"; e.target.style.boxShadow="none"; }}
                />
              </div>
              <button onClick={handleSubmit} style={{
                padding:"12px", background:"#2563eb",
                border:"none", borderRadius:8, color:"#fff", fontSize:14,
                fontFamily:"'Inter', sans-serif", fontWeight:600, cursor:"pointer",
                transition:"all 0.2s", marginTop:4,
              }}
                onMouseEnter={e => { e.currentTarget.style.background="#1d4ed8"; }}
                onMouseLeave={e => { e.currentTarget.style.background="#2563eb"; }}
              >
                Send Message →
              </button>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{
      background:"#f8fafc", borderTop:"1px solid #e2e8f0",
      padding:"48px 2rem", textAlign:"center",
    }}>
      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:14, color:"#475569" }}>
        Designed & Developed by <span style={{ color:"#2563eb", fontWeight:700 }}>Lakshmi Srujana</span>
      </p>
      <p style={{ fontFamily:"'Inter', sans-serif", fontSize:12, color:"#94a3b8", marginTop:8, letterSpacing:"0.05em", fontWeight:500 }}>
        © {new Date().getFullYear()} — All rights reserved
      </p>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background:"#ffffff", color:"#0f172a", minHeight:"100vh", overflow:"hidden" }}>
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; padding: 0; }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @media (max-width: 768px) {
          section { padding: 60px 1.5rem !important; }
          h2 { font-size: 32px !important; }
        }
      `}</style>
      <ScrollBar />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
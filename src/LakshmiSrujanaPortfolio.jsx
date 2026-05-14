import { useState, useEffect, useRef } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const NAV_LINKS = ["Home","About","Projects","Skills","Achievements","Experience","Contact"];

const PROJECTS = [
   {
    title: "Client Portfolio Website",
    desc: "Designed and developed a professional, responsive portfolio website for a client through a consultancy engagement. Gathered requirements, collaborated iteratively, and delivered on time.",
    tech: ["HTML","CSS","Git"],
    color: "#8b5cf6",
    icon: "💼",
    github_url: "https://github.com/lkshi0406",
    demo_url: "https://dilip-kumar-salvadi.vercel.app/",
  },
   {
    title: "URL Shortener - Shortie",
    desc: "Built a full-stack URL shortener application that converts long URLs into compact, shareable links with efficient redirection handling. Designed a clean and responsive user interface while implementing core functionalities such as custom short links, URL validation, and fast link generation.",
    tech: ["Python", "PostgreSQL", "REST API", "Render"],
    color: "#3b82f6",
    icon: "🔗",
    github_url: "https://github.com/lkshi0406",
    demo_url: "https://url-shortener-frontend-three-phi.vercel.app/",
  },
  {
    title: "Food Recommendation & Recipe Suggestion System",
    desc: "Developing an ML-powered recommendation system that generates recipe suggestions from partial ingredient inputs. Experimenting with classification and similarity-based ML approaches to improve recommendation accuracy. Building a backend API layer to expose model outputs for application integration.",
    tech: ["Python","Machine Learning","REST API"],
    color: "#b91010",
    icon: "🍽️",
    github_url: "https://github.com/lkshi0406",
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
    color: "#06b6d4",
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
    color: "#8b5cf6",
  },
  {
    title: "Active DSA Solver",
    detail: "Consistent problem solver on LeetCode, GeeksforGeeks, and CodeStudio",
    icon: "💡",
    color: "#06b6d4",
  },
 
];

const EDUCATION = [
  {
    school: "GITAM University Bengaluru",
    degree: "B.Tech — Computer Science Engineering",
    year: "2023 – 2027 (Expected)",
    score: "CGPA: 8.55 / 10",
    icon: "🎓",
  },
  {
    school: "REVA University",
    degree: "Pre-University Course (PUC)",
    year: "2021 – 2023",
    score: "Percentage: 92.53%",
    icon: "📚",
  },
  {
    school: "Sri Chaitanya Techno School",
    degree: "Class X Board Exams",
    year: "2021",
    score: "GPA: 10 / 10",
    icon: "🏫",
  },
];

const CODING_PROFILES = [
  { name: "GitHub", url: "https://github.com/lkshi0406", color: "#e2e8f0", bg: "#1e293b", icon: "GH" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/lakshmi-srujana-vls/", color: "#0ea5e9", bg: "#0f172a", icon: "in" },
  { name: "LeetCode", url: "https://leetcode.com/u/GB2023005037/", color: "#f59e0b", bg: "#1c1200", icon: "LC" },
];

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
    <div style={{ position:"fixed", top:0, left:0, right:0, height:3, zIndex:1000, background:"#0f172a" }}>
      <div style={{ height:"100%", width:`${pct}%`, background:"linear-gradient(90deg,#06b6d4,#8b5cf6)", transition:"width 0.1s" }} />
    </div>
  );
}

// ─── Navbar ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.getElementById(l.toLowerCase()));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase()+e.target.id.slice(1)); });
    }, { threshold: 0.4 });
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior:"smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position:"fixed", top:3, left:0, right:0, zIndex:999,
      background: scrolled ? "rgba(3,7,18,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition:"all 0.3s ease",
      padding:"0 1.5rem",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between", height:64 }}>
        <span style={{ fontFamily:"'Space Mono',monospace", fontSize:18, fontWeight:700, color:"#06b6d4", letterSpacing:"-0.5px" }}>
          LS<span style={{ color:"#8b5cf6" }}>.</span>
        </span>

        {/* Desktop links */}
        <div style={{ display:"flex", gap:8, alignItems:"center" }} className="desk-nav">
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background:"none", border:"none", cursor:"pointer",
              color: active === l ? "#06b6d4" : "#94a3b8",
              fontSize:14, fontFamily:"'Space Mono',monospace", fontWeight:active===l?700:400,
              padding:"6px 12px", borderRadius:6,
              transition:"color 0.2s",
              borderBottom: active===l ? "2px solid #06b6d4" : "2px solid transparent",
            }}>
              {l}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button onClick={() => setOpen(!open)} style={{
          display:"none", background:"none", border:"1px solid rgba(255,255,255,0.12)",
          borderRadius:8, padding:"6px 10px", cursor:"pointer", color:"#e2e8f0"
        }} className="ham-btn">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          background:"rgba(3,7,18,0.97)", borderTop:"1px solid rgba(255,255,255,0.08)",
          padding:"1rem 1.5rem", display:"flex", flexDirection:"column", gap:4,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => scrollTo(l)} style={{
              background:"none", border:"none", cursor:"pointer", textAlign:"left",
              color: active===l ? "#06b6d4" : "#94a3b8",
              fontFamily:"'Space Mono',monospace", fontSize:15, padding:"10px 0",
              borderBottom:"1px solid rgba(255,255,255,0.05)",
            }}>{l}</button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 200); }, []);

  const btn = (label, href, style={}) => (
    <a href={href} target={href.startsWith("http")?"_blank":"_self"} style={{
      display:"inline-flex", alignItems:"center", gap:8,
      padding:"10px 22px", borderRadius:8, fontFamily:"'Space Mono',monospace",
      fontSize:13, fontWeight:700, textDecoration:"none", cursor:"pointer",
      transition:"all 0.2s", ...style,
    }}>{label}</a>
  );

  return (
    <section id="home" style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      background:"#030712", position:"relative", overflow:"hidden", paddingTop:80,
    }}>
      {/* Grid bg */}
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:"linear-gradient(rgba(6,182,212,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.04) 1px, transparent 1px)",
        backgroundSize:"40px 40px",
      }} />
      {/* Glow blobs */}
      <div style={{ position:"absolute", top:"20%", right:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)", filter:"blur(40px)" }} />
      <div style={{ position:"absolute", bottom:"20%", left:"5%", width:300, height:300, borderRadius:"50%", background:"radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)", filter:"blur(40px)" }} />

      <div style={{
        maxWidth:1200, margin:"0 auto", padding:"0 2rem",
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center",
        position:"relative", zIndex:1, width:"100%",
      }} className="hero-grid">
        {/* Left */}
        <div style={{ opacity: show?1:0, transform: show?"translateY(0)":"translateY(30px)", transition:"all 0.8s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            background:"rgba(6,182,212,0.08)", border:"1px solid rgba(6,182,212,0.2)",
            borderRadius:100, padding:"6px 16px", marginBottom:24,
          }}>
            <span style={{ width:8, height:8, borderRadius:"50%", background:"#10b981", display:"inline-block", animation:"pulse 2s infinite" }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#06b6d4" }}>Open to Opportunities</span>
          </div>

          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:800, color:"#f1f5f9", lineHeight:1.1, margin:"0 0 8px" }}>
            Lakshmi
          </h1>
          <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(2.4rem,5vw,4rem)", fontWeight:800, lineHeight:1.1, margin:"0 0 20px",
            background:"linear-gradient(135deg,#06b6d4,#8b5cf6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
            Srujana
          </h1>

          <p style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#8b5cf6", letterSpacing:1, marginBottom:16 }}>
            CSE STUDENT · FULL STACK DEVELOPER · DSA ENTHUSIAST
          </p>

          <p style={{ color:"#94a3b8", fontSize:16, lineHeight:1.8, maxWidth:480, marginBottom:36 }}>
            I build responsive full-stack applications, solve data structures and algorithms problems, and enjoy developing scalable and user-focused software solutions.
          </p>

          <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
            {btn("⬇ Resume", "/resume.pdf", { background:"linear-gradient(135deg,#06b6d4,#0891b2)", color:"#fff" })}
            {btn("GitHub", "https://github.com/lkshi0406", { background:"rgba(255,255,255,0.05)", color:"#e2e8f0", border:"1px solid rgba(255,255,255,0.12)" })}
            {btn("LinkedIn", "https://www.linkedin.com/in/lakshmi-srujana-vls/", { background:"rgba(14,165,233,0.1)", color:"#0ea5e9", border:"1px solid rgba(14,165,233,0.2)" })}
            {btn("Contact →", "#contact", {
              background:"none", color:"#8b5cf6", border:"1px solid rgba(139,92,246,0.3)",
              onclick: (e) => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}); }
            })}
          </div>
        </div>

        {/* Right — Avatar card */}
        <div style={{
          display:"flex", justifyContent:"center", alignItems:"center",
          opacity: show?1:0, transform: show?"translateY(0)":"translateY(30px)",
          transition:"all 0.8s cubic-bezier(.16,1,.3,1) 0.2s",
        }}>
          <div style={{ position:"relative" }}>
            {/* Animated ring */}
            <div style={{
              position:"absolute", inset:-16, borderRadius:"50%",
              border:"1px solid rgba(6,182,212,0.2)",
              animation:"spin 20s linear infinite",
            }} />
            <div style={{
              position:"absolute", inset:-32, borderRadius:"50%",
              border:"1px dashed rgba(139,92,246,0.15)",
              animation:"spin 30s linear infinite reverse",
            }} />

            {/* Avatar */}
            <div style={{
              width:240, height:240, borderRadius:"50%",
              background:"linear-gradient(135deg,#0f172a,#1e1b4b)",
              border:"2px solid rgba(6,182,212,0.3)",
              display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 60px rgba(6,182,212,0.1), 0 0 120px rgba(139,92,246,0.05)",
            }}>
              <div style={{ fontSize:72, lineHeight:1 }}>👩‍💻</div>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#06b6d4", marginTop:8, letterSpacing:1 }}>
                &lt;code /&gt;
              </div>
            </div>

            {/* Floating badges */}
            {[
              { label:"Java", pos:{ top:-20, left:-40 }, c:"#f59e0b" },
              { label:"DSA", pos:{ top:30, right:-60 }, c:"#10b981" },
              { label:"SQL", pos:{ bottom:40, right:-50 }, c:"#8b5cf6" },
            ].map(({label,pos,c}) => (
              <div key={label} style={{
                position:"absolute", ...pos,
                background:"rgba(15,23,42,0.9)", border:`1px solid ${c}40`,
                borderRadius:8, padding:"4px 12px",
                fontFamily:"'Space Mono',monospace", fontSize:12, color:c,
                animation:"float 4s ease-in-out infinite",
              }}>{label}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{ position:"absolute", bottom:32, left:"50%", transform:"translateX(-50%)", textAlign:"center", color:"#475569" }}>
        <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, marginBottom:8 }}>scroll</div>
        <div style={{ animation:"bounce 2s infinite" }}>↓</div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Space+Mono:wght@400;700&display=swap');
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(1.2)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        body { background:#030712; color:#e2e8f0; overflow-x:hidden; }
        @media(max-width:768px){
          .hero-grid{grid-template-columns:1fr!important; gap:40px!important;}
          .desk-nav{display:none!important;}
          .ham-btn{display:flex!important;}
        }
        @media(max-width:640px){
          .hero-grid > div:last-child{display:none;}
        }
      `}</style>
    </section>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────

function Section({ id, title, subtitle, children, alt }) {
  const [ref, inView] = useInView();
  return (
    <section id={id} style={{
      padding:"96px 2rem",
      background: alt ? "rgba(15,23,42,0.5)" : "transparent",
      position:"relative",
    }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div ref={ref} style={{
          marginBottom:56,
          opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)",
          transition:"all 0.6s cubic-bezier(.16,1,.3,1)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
            <div style={{ height:2, width:32, background:"linear-gradient(90deg,#06b6d4,#8b5cf6)", borderRadius:2 }} />
            <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#06b6d4", letterSpacing:2, textTransform:"uppercase" }}>
              {subtitle}
            </span>
          </div>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,3vw,2.6rem)", fontWeight:800, color:"#f1f5f9" }}>
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
        display:"grid", gridTemplateColumns:"1fr 1fr", gap:48, alignItems:"start",
        opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)",
        transition:"all 0.7s cubic-bezier(.16,1,.3,1) 0.1s",
      }} className="hero-grid">
        <div>
          <p style={{ color:"#94a3b8", fontSize:16, lineHeight:1.9, marginBottom:20 }}>
            I'm a B.Tech Computer Science Engineering student at <span style={{ color:"#06b6d4", fontWeight:600 }}>GITAM University Bengaluru</span> (Expected 2027), maintaining a CGPA of <span style={{ color:"#f1f5f9", fontWeight:600 }}>8.55/10</span>.
          </p>
          <p style={{ color:"#94a3b8", fontSize:16, lineHeight:1.9, marginBottom:20 }}>
            I'm passionate about <span style={{ color:"#8b5cf6" }}>software engineering</span>, backend systems, data structures &amp; algorithms, and full-stack web development. I enjoy designing scalable solutions that are performant and user-focused.
          </p>
          <p style={{ color:"#94a3b8", fontSize:16, lineHeight:1.9 }}>
            Beyond academics, I actively contribute to the <span style={{ color:"#10b981" }}>GitHub Community Club</span> as both Inclusion Officer and Event Lead, and consistently solve problems on platforms like LeetCode and GeeksforGeeks.
          </p>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          {[
            { label:"CGPA", value:"8.55", sub:"/ 10" },
            { label:"Graduation", value:"2027", sub:"B.Tech CSE" },
            { label:"PUC Score", value:"92.5%", sub:"REVA University" },
            { label:"Class X", value:"10/10", sub:"GPA" },
          ].map(s => (
            <div key={s.label} style={{
              background:"rgba(15,23,42,0.8)", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:12, padding:"20px 16px",
            }}>
              <div style={{ fontFamily:"'Space Mono',monospace", fontSize:28, fontWeight:700, color:"#06b6d4" }}>
                {s.value}<span style={{ fontSize:14, color:"#475569" }}>{s.sub}</span>
              </div>
              <div style={{ fontSize:13, color:"#64748b", marginTop:4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div style={{ marginTop:64 }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:20, color:"#f1f5f9", marginBottom:24 }}>Education</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {EDUCATION.map((e, i) => {
            const [r, v] = useInView();
            return (
              <div key={i} ref={r} style={{
                display:"flex", gap:20, alignItems:"flex-start",
                background:"rgba(15,23,42,0.6)", border:"1px solid rgba(255,255,255,0.06)",
                borderRadius:12, padding:"20px 24px",
                opacity: v?1:0, transform: v?"translateX(0)":"translateX(-20px)",
                transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.1}s`,
              }}>
                <div style={{ fontSize:28, flexShrink:0 }}>{e.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:"#f1f5f9" }}>{e.school}</div>
                  <div style={{ color:"#94a3b8", fontSize:14, marginTop:2 }}>{e.degree}</div>
                  <div style={{ display:"flex", gap:16, marginTop:8, flexWrap:"wrap" }}>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#06b6d4" }}>{e.year}</span>
                    <span style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#8b5cf6" }}>{e.score}</span>
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
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:24 }}>
        {PROJECTS.map((p, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={i} ref={ref} style={{
              background:"rgba(3,7,18,0.8)", border:`1px solid rgba(255,255,255,0.07)`,
              borderRadius:16, padding:"28px 24px", display:"flex", flexDirection:"column",
              transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.12}s`,
              opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)",
              position:"relative", overflow:"hidden",
              cursor:"default",
            }}
              onMouseEnter={e => { e.currentTarget.style.border=`1px solid ${p.color}40`; e.currentTarget.style.transform="translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.border="1px solid rgba(255,255,255,0.07)"; e.currentTarget.style.transform="translateY(0)"; }}
            >
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:3,
                background:`linear-gradient(90deg,${p.color},transparent)`,
              }} />

              <div style={{ fontSize:32, marginBottom:16 }}>{p.icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, color:"#f1f5f9", marginBottom:12, lineHeight:1.4 }}>
                {p.title}
              </h3>
              <p style={{ color:"#64748b", fontSize:14, lineHeight:1.7, flex:1, marginBottom:20 }}>
                {p.desc}
              </p>

              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:20 }}>
                {p.tech.map(t => (
                  <span key={t} style={{
                    background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.08)",
                    borderRadius:6, padding:"3px 10px", fontSize:12,
                    fontFamily:"'Space Mono',monospace", color:"#94a3b8",
                  }}>{t}</span>
                ))}
              </div>

              <div style={{ display:"flex", gap:10 }}>
                <a href={p.github_url} target="_blank" rel="noreferrer" style={{
                  flex:1, textAlign:"center", padding:"8px", borderRadius:8, fontSize:13,
                  fontFamily:"'Space Mono',monospace", textDecoration:"none",
                  background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.1)",
                  color:"#94a3b8", transition:"all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.color="#f1f5f9"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="#94a3b8"; }}
                >GitHub ↗</a>
                <a href={p.demo_url} target={p.demo_url!=="#"?"_blank":"_self"} rel="noreferrer" style={{
                  flex:1, textAlign:"center", padding:"8px", borderRadius:8, fontSize:13,
                  fontFamily:"'Space Mono',monospace", textDecoration:"none",
                  background:`${p.color}15`, border:`1px solid ${p.color}30`,
                  color:p.color, transition:"all 0.2s",
                  opacity: p.demo_url === "#" ? 0.5 : 1,
                  cursor: p.demo_url === "#" ? "default" : "pointer",
                }} disabled={p.demo_url === "#"}>Live Demo ↗</a>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="skills" title="Skills" subtitle="what i know">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:24 }}>
        {SKILLS.map((s, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={i} ref={ref} style={{
              background:"rgba(15,23,42,0.7)", border:"1px solid rgba(255,255,255,0.07)",
              borderRadius:14, padding:"24px",
              opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)",
              transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.1}s`,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
                <div style={{
                  width:40, height:40, borderRadius:10,
                  background:"rgba(6,182,212,0.1)", border:"1px solid rgba(6,182,212,0.2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:18,
                }}>{s.icon}</div>
                <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:700, color:"#f1f5f9" }}>{s.category}</h3>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {s.items.map(item => (
                  <div key={item} style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:5, height:5, borderRadius:"50%", background:"#06b6d4", flexShrink:0 }} />
                    <span style={{ color:"#94a3b8", fontSize:14 }}>{item}</span>
                  </div>
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
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:20, marginBottom:48 }}>
        {ACHIEVEMENTS.map((a, i) => {
          const [ref, inView] = useInView();
          return (
            <div key={i} ref={ref} style={{
              background:"rgba(3,7,18,0.9)", border:`1px solid ${a.color}20`,
              borderRadius:14, padding:"24px",
              opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(20px)",
              transition:`all 0.6s cubic-bezier(.16,1,.3,1) ${i*0.1}s`,
            }}>
              <div style={{ fontSize:32, marginBottom:12 }}>{a.icon}</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, color:"#f1f5f9", marginBottom:8 }}>{a.title}</h3>
              <p style={{ color:"#64748b", fontSize:14, lineHeight:1.6 }}>{a.detail}</p>
            </div>
          );
        })}
      </div>

      {/* Leadership */}
      <div style={{
        background:"rgba(15,23,42,0.6)", border:"1px solid rgba(255,255,255,0.07)",
        borderRadius:14, padding:"28px 32px",
      }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, color:"#f1f5f9", marginBottom:20 }}>Leadership & Community</h3>
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {[
            "Inclusion Officer at GitHub Community Club (2023–2024)",
            "Expert Team Member & Event Lead (2023–Present)",
            "Contributed to technical event organization and promotion",
            "Led marketing and design for Epoch 2024 and Epoch 2025",
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
              <div style={{
                width:24, height:24, borderRadius:6, background:"rgba(139,92,246,0.15)",
                border:"1px solid rgba(139,92,246,0.3)", display:"flex", alignItems:"center",
                justifyContent:"center", flexShrink:0, fontSize:12, color:"#8b5cf6",
              }}>✓</div>
              <span style={{ color:"#94a3b8", fontSize:15, lineHeight:1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coding Profiles */}
      <div style={{ marginTop:48 }}>
        <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, color:"#f1f5f9", marginBottom:20 }}>Coding Profiles</h3>
        <div style={{ display:"flex", flexWrap:"wrap", gap:16 }}>
          {CODING_PROFILES.map(p => (
            <a key={p.name} href={p.url} target="_blank" rel="noreferrer" style={{
              display:"flex", alignItems:"center", gap:12,
              background:"rgba(15,23,42,0.8)", border:"1px solid rgba(255,255,255,0.08)",
              borderRadius:12, padding:"14px 20px", textDecoration:"none",
              transition:"all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.border=`1px solid ${p.color}50`; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.border="1px solid rgba(255,255,255,0.08)"; e.currentTarget.style.transform="none"; }}
            >
              <div style={{
                width:36, height:36, borderRadius:8,
                background:p.bg, border:`1px solid ${p.color}30`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontFamily:"'Space Mono',monospace", fontSize:11, fontWeight:700, color:p.color,
              }}>{p.icon}</div>
              <span style={{ fontFamily:"'Space Mono',monospace", fontSize:13, color:"#e2e8f0", fontWeight:700 }}>{p.name}</span>
              <span style={{ fontSize:12, color:"#475569" }}>↗</span>
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
        position:"relative", paddingLeft:32,
        opacity: inView?1:0, transform: inView?"translateY(0)":"translateY(24px)",
        transition:"all 0.7s cubic-bezier(.16,1,.3,1)",
      }}>
        {/* Timeline line */}
        <div style={{ position:"absolute", left:0, top:8, bottom:0, width:2, background:"linear-gradient(180deg,#06b6d4,#8b5cf620)" }} />

        <div style={{
          background:"rgba(15,23,42,0.7)", border:"1px solid rgba(6,182,212,0.15)",
          borderRadius:14, padding:"28px 32px", position:"relative",
        }}>
          {/* Dot */}
          <div style={{
            position:"absolute", left:-41, top:28, width:18, height:18, borderRadius:"50%",
            background:"linear-gradient(135deg,#06b6d4,#8b5cf6)",
            border:"3px solid #030712",
          }} />

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:8, marginBottom:16 }}>
            <div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:700, color:"#f1f5f9" }}>
                Consultancy Project Developer
              </h3>
              <p style={{ color:"#06b6d4", fontSize:14, fontFamily:"'Space Mono',monospace", marginTop:4 }}>Freelance / Client Project</p>
            </div>
            <span style={{
              fontFamily:"'Space Mono',monospace", fontSize:12, color:"#8b5cf6",
              background:"rgba(139,92,246,0.1)", border:"1px solid rgba(139,92,246,0.2)",
              borderRadius:6, padding:"4px 12px",
            }}>2025</span>
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              "Developed a professional portfolio website for a client",
              "Built a fully responsive UI with clean, modern design principles",
              "Collaborated closely with client, iterating based on feedback",
              "Delivered the project successfully within agreed deadlines",
            ].map((item, i) => (
              <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
                <span style={{ color:"#06b6d4", flexShrink:0, marginTop:2 }}>▸</span>
                <span style={{ color:"#94a3b8", fontSize:15, lineHeight:1.6 }}>{item}</span>
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
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:48 }} className="hero-grid">
        {/* Info */}
        <div>
          <p style={{ color:"#94a3b8", fontSize:16, lineHeight:1.8, marginBottom:32 }}>
            I'm currently open to internship opportunities, freelance projects, and collaborations. Feel free to reach out!
          </p>

          {[
            { icon:"📧", label:"Email", value:"srujanalakshmi08@gmail.com", href:"mailto:srujanalakshmi08@gmail.com" },
            { icon:"📱", label:"Phone", value:"+91-9880499896", href:"tel:+919880499896" },
            { icon:"📍", label:"Location", value:"Bengaluru, India", href:"#" },
          ].map(c => (
            <a key={c.label} href={c.href} style={{
              display:"flex", gap:16, alignItems:"center",
              marginBottom:20, textDecoration:"none", padding:"16px 20px",
              background:"rgba(15,23,42,0.6)", border:"1px solid rgba(255,255,255,0.06)",
              borderRadius:12, transition:"all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.border="1px solid rgba(6,182,212,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.border="1px solid rgba(255,255,255,0.06)"; }}
            >
              <span style={{ fontSize:22 }}>{c.icon}</span>
              <div>
                <div style={{ fontFamily:"'Space Mono',monospace", fontSize:11, color:"#475569", marginBottom:2 }}>{c.label}</div>
                <div style={{ color:"#e2e8f0", fontSize:15 }}>{c.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div style={{
          background:"rgba(15,23,42,0.7)", border:"1px solid rgba(255,255,255,0.07)",
          borderRadius:16, padding:"32px",
        }}>
          {sent ? (
            <div style={{ textAlign:"center", padding:"40px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>✅</div>
              <h3 style={{ fontFamily:"'Syne',sans-serif", color:"#10b981", marginBottom:8 }}>Message Sent!</h3>
              <p style={{ color:"#64748b" }}>I'll get back to you soon.</p>
              <button onClick={() => setSent(false)} style={{
                marginTop:20, background:"none", border:"1px solid rgba(255,255,255,0.1)",
                borderRadius:8, color:"#94a3b8", padding:"8px 20px", cursor:"pointer",
                fontFamily:"'Space Mono',monospace", fontSize:12,
              }}>Send another</button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { key:"name", label:"Name", type:"text", placeholder:"Your name" },
                { key:"email", label:"Email", type:"email", placeholder:"your@email.com" },
              ].map(f => (
                <div key={f.key}>
                  <label style={{ display:"block", fontFamily:"'Space Mono',monospace", fontSize:11, color:"#64748b", marginBottom:6, letterSpacing:0.5 }}>{f.label}</label>
                  <input
                    type={f.type} value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]:e.target.value }))}
                    placeholder={f.placeholder}
                    style={{
                      width:"100%", background:"rgba(3,7,18,0.6)",
                      border:"1px solid rgba(255,255,255,0.1)", borderRadius:8,
                      padding:"10px 14px", color:"#e2e8f0", fontSize:14,
                      outline:"none", fontFamily:"inherit",
                    }}
                  />
                </div>
              ))}
              <div>
                <label style={{ display:"block", fontFamily:"'Space Mono',monospace", fontSize:11, color:"#64748b", marginBottom:6 }}>Message</label>
                <textarea
                  rows={5} value={form.message}
                  onChange={e => setForm(p => ({ ...p, message:e.target.value }))}
                  placeholder="What's on your mind?"
                  style={{
                    width:"100%", background:"rgba(3,7,18,0.6)",
                    border:"1px solid rgba(255,255,255,0.1)", borderRadius:8,
                    padding:"10px 14px", color:"#e2e8f0", fontSize:14,
                    outline:"none", resize:"vertical", fontFamily:"inherit",
                  }}
                />
              </div>
              <button onClick={handleSubmit} style={{
                padding:"12px", background:"linear-gradient(135deg,#06b6d4,#0891b2)",
                border:"none", borderRadius:8, color:"#fff", fontSize:14,
                fontFamily:"'Space Mono',monospace", fontWeight:700, cursor:"pointer",
                transition:"opacity 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity="0.9"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity="1"; }}
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
      background:"#030712", borderTop:"1px solid rgba(255,255,255,0.06)",
      padding:"32px 2rem", textAlign:"center",
    }}>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#475569" }}>
        Designed & Developed by <span style={{ color:"#06b6d4" }}>Lakshmi Srujana</span>
      </p>
      <p style={{ fontFamily:"'Space Mono',monospace", fontSize:12, color:"#334155", marginTop:6 }}>
        © {new Date().getFullYear()} — All rights reserved
      </p>
    </footer>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background:"#030712", minHeight:"100vh" }}>
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

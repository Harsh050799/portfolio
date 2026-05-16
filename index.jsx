import { useState, useRef, useEffect } from "react";

const SKILLS = [
  { name: "Graphic Design", icon: "🎨" },
  { name: "Video Editing", icon: "🎬" },
  { name: "UI/UX Design", icon: "💻" },
  { name: "Social Media Mgmt", icon: "📱" },
  { name: "Motion Graphics", icon: "✨" },
  { name: "Canva Design", icon: "🖌️" },
  { name: "Photoshop", icon: "🖼️" },
  { name: "SEO & Marketing", icon: "📈" },
  { name: "After Effects", icon: "🌀" },
  { name: "Premiere Pro", icon: "🎞️" },
  { name: "Branding", icon: "💡" },
  { name: "Content Creation", icon: "📹" },
];

const SAMPLE_PROJECTS = [
  {
    id: 1, title: "Gaming Montage", cat: "Video",
    type: "image",
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2, title: "Brand Identity", cat: "Design",
    type: "image",
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&auto=format&fit=crop",
    span: "",
  },
  {
    id: 3, title: "Cinematic Reel", cat: "Video",
    type: "image",
    src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&auto=format&fit=crop",
    span: "",
  },
  {
    id: 4, title: "Social Media Kit", cat: "Design",
    type: "image",
    src: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&auto=format&fit=crop",
    span: "",
  },
  {
    id: 5, title: "Poster Art", cat: "Design",
    type: "image",
    src: "https://images.unsplash.com/photo-1563089145-599997674d42?w=600&auto=format&fit=crop",
    span: "",
  },
  {
    id: 6, title: "YouTube Thumbnail Pack", cat: "Design",
    type: "image",
    src: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=600&auto=format&fit=crop",
    span: "",
  },
  {
    id: 7, title: "Product Promo", cat: "Video",
    type: "image",
    src: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&auto=format&fit=crop",
    span: "",
  },
  {
    id: 8, title: "Event Poster", cat: "Print",
    type: "image",
    src: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop",
    span: "",
  },
  {
    id: 9, title: "Logo Design Series", cat: "Branding",
    type: "image",
    src: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop",
    span: "col-span-2",
  },
];

const CATS = ["All", "Design", "Video", "Branding", "Print"];

export default function PortfolioWebsite() {
  const [activeNav, setActiveNav] = useState("home");
  const [projects, setProjects] = useState(SAMPLE_PROJECTS);
  const [filter, setFilter] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [tagModal, setTagModal] = useState(null); // { file, url, type }
  const [tagTitle, setTagTitle] = useState("");
  const [tagCat, setTagCat] = useState("Design");
  const [tagType, setTagType] = useState("image");
  const fileRef = useRef();
  const nextId = useRef(100);

  const filtered = filter === "All" ? projects : projects.filter(p => p.cat === filter);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  };

  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) setActiveNav(e.target.id); });
    }, { threshold: 0.4 });
    ["home","about","skills","projects","contact"].forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const handleFiles = (files) => {
    const file = files[0];
    if (!file) return;
    const isVideo = file.type.startsWith("video/");
    const url = URL.createObjectURL(file);
    setTagTitle(file.name.replace(/\.[^.]+$/, ""));
    setTagCat("Design");
    setTagType(isVideo ? "video" : "image");
    setTagModal({ file, url, isVideo });
  };

  const confirmAdd = () => {
    if (!tagModal) return;
    const item = {
      id: nextId.current++,
      title: tagTitle || "Untitled",
      cat: tagCat,
      type: tagType,
      src: tagModal.url,
      span: "",
    };
    setProjects(p => [item, ...p]);
    setTagModal(null);
  };

  const deleteProject = (id) => {
    setProjects(p => p.filter(x => x.id !== id));
    if (lightbox?.id === id) setLightbox(null);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#080808", color: "#f0ece4", fontFamily: "'DM Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #111; } ::-webkit-scrollbar-thumb { background: #d4a843; border-radius: 2px; }
        .nav-link { background: none; border: none; color: #888; font-family: 'DM Sans', sans-serif; font-size: 0.83rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; padding: 0.3rem 0; transition: color 0.2s; }
        .nav-link:hover, .nav-link.active { color: #f0ece4; }
        .nav-link.active { border-bottom: 1px solid #d4a843; }
        .btn-primary { background: #d4a843; color: #080808; border: none; padding: 0.85rem 2rem; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: opacity 0.2s, transform 0.2s; }
        .btn-primary:hover { opacity: 0.85; transform: translateY(-1px); }
        .btn-ghost { background: transparent; color: #f0ece4; border: 0.5px solid rgba(255,255,255,0.3); padding: 0.85rem 2rem; font-family: 'DM Sans', sans-serif; font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: all 0.2s; }
        .btn-ghost:hover { border-color: #f0ece4; }
        .filter-btn { background: transparent; border: 0.5px solid rgba(255,255,255,0.1); color: #888; padding: 0.4rem 1.1rem; font-family: 'DM Sans', sans-serif; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: 2px; transition: all 0.2s; }
        .filter-btn:hover { border-color: #d4a843; color: #d4a843; }
        .filter-btn.active { border-color: #d4a843; color: #d4a843; background: rgba(212,168,67,0.08); }
        .proj-card { position: relative; overflow: hidden; background: #111; cursor: pointer; border-radius: 4px; }
        .proj-card img, .proj-card video { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.5s ease; }
        .proj-card:hover img, .proj-card:hover video { transform: scale(1.05); }
        .proj-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.88) 0%, transparent 55%); opacity: 0; transition: opacity 0.3s; display: flex; flex-direction: column; justify-content: flex-end; padding: 1.25rem; }
        .proj-card:hover .proj-overlay { opacity: 1; }
        .proj-del { position: absolute; top: 0.6rem; right: 0.6rem; background: rgba(200,60,40,0.85); border: none; color: white; width: 26px; height: 26px; border-radius: 2px; font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
        .proj-card:hover .proj-del { opacity: 1; }
        .video-badge { position: absolute; top: 0.6rem; left: 0.6rem; background: rgba(212,168,67,0.9); color: #080808; font-size: 0.65rem; letter-spacing: 0.1em; text-transform: uppercase; padding: 2px 7px; border-radius: 2px; font-weight: 500; }
        .upload-zone { border: 1.5px dashed rgba(212,168,67,0.25); border-radius: 4px; padding: 2.5rem 1.5rem; text-align: center; cursor: pointer; transition: all 0.2s; position: relative; margin-bottom: 2rem; }
        .upload-zone:hover { border-color: #d4a843; background: rgba(212,168,67,0.03); }
        .upload-zone input { position: absolute; inset: 0; opacity: 0; cursor: pointer; width: 100%; height: 100%; }
        .form-input, .form-textarea { width: 100%; background: #0f0f0f; border: 0.5px solid rgba(255,255,255,0.1); color: #f0ece4; padding: 0.9rem 1.1rem; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; border-radius: 2px; outline: none; transition: border-color 0.2s; }
        .form-input:focus, .form-textarea:focus { border-color: #d4a843; }
        .form-textarea { resize: vertical; min-height: 110px; }
        .skill-card { border: 0.5px solid rgba(255,255,255,0.07); border-radius: 4px; padding: 1.25rem 1rem; text-align: center; background: #0e0e0e; transition: border-color 0.25s, transform 0.25s; }
        .skill-card:hover { border-color: rgba(212,168,67,0.4); transform: translateY(-3px); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px);} to { opacity:1; transform:translateY(0);} }
        .fade-in { animation: fadeUp 0.5s ease both; }
        @media(max-width:700px){ .masonry-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(8,8,8,0.88)", backdropFilter: "blur(14px)", borderBottom: "0.5px solid rgba(255,255,255,0.07)", padding: "1.1rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, cursor: "pointer", letterSpacing: "-0.01em" }} onClick={() => scrollTo("home")}>Harshit Bora</span>
        <div style={{ display: "flex", gap: "1.75rem", alignItems: "center" }}>
          {["home","about","skills","projects","contact"].map(id => (
            <button key={id} className={`nav-link${activeNav===id?" active":""}`} onClick={() => scrollTo(id)}>{id}</button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "6rem 2rem 4rem", background: "linear-gradient(160deg, #0e0e0e 60%, #130f05 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "10%", left: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,67,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", right: "5%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,75,58,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 800 }} className="fade-in">
          <div style={{ display: "inline-block", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#d4a843", border: "0.5px solid rgba(212,168,67,0.35)", padding: "0.3rem 0.9rem", borderRadius: 2, marginBottom: "1.5rem" }}>Graphic Designer &amp; Video Editor</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem,7vw,6rem)", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", marginBottom: "1.5rem" }}>
            Harshit<br /><em style={{ fontStyle: "italic", color: "#d4a843" }}>Bora</em>
          </h1>
          <p style={{ color: "#777", fontSize: "1.05rem", maxWidth: 520, margin: "0 auto 2.5rem", lineHeight: 1.75, fontWeight: 300 }}>
            Creating modern visuals, cinematic edits, gaming content, and engaging digital experiences that leave an impression.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={() => scrollTo("projects")}>View Projects</button>
            <button className="btn-ghost" onClick={() => scrollTo("contact")}>Contact Me</button>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ maxWidth: 1200, margin: "0 auto", padding: "7rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "5rem", alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop" alt="Harshit Bora" style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 4, display: "block", border: "0.5px solid rgba(255,255,255,0.08)" }} />
            <div style={{ position: "absolute", bottom: "-1.5rem", right: "-1.5rem", background: "#d4a843", color: "#080808", padding: "1rem 1.5rem", borderRadius: 4, fontFamily: "'Playfair Display', serif", fontSize: "0.95rem", fontWeight: 700, lineHeight: 1.3 }}>2+ Years<br /><span style={{ fontWeight: 400, fontSize: "0.75rem", fontFamily: "'DM Sans', sans-serif" }}>Experience</span></div>
          </div>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4a843", marginBottom: "0.75rem" }}>Who I Am</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1.5rem", lineHeight: 1.1 }}>About Me</h2>
            <p style={{ color: "#777", lineHeight: 1.85, marginBottom: "1.25rem", fontWeight: 300, fontSize: "1rem" }}>
              I'm Harshit Bora, a freelance graphic designer, video editor, and content creator with experience in gaming content, branding, social media creatives, and cinematic video editing.
            </p>
            <p style={{ color: "#777", lineHeight: 1.85, marginBottom: "2rem", fontWeight: 300, fontSize: "1rem" }}>
              I specialize in eye-catching designs, YouTube content, motion graphics, and modern digital experiences using Photoshop, Canva, Premiere Pro, and After Effects.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
              {[["100+","Projects Done"],["2+","Years Exp."],["50+","Happy Clients"]].map(([n,l]) => (
                <div key={l} style={{ borderTop: "1px solid rgba(212,168,67,0.3)", paddingTop: "1rem" }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#d4a843" }}>{n}</div>
                  <div style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#666", marginTop: "0.25rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "#0b0b0b", padding: "7rem 2rem", borderTop: "0.5px solid rgba(255,255,255,0.05)", borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4a843", marginBottom: "0.75rem" }}>What I Do</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em" }}>My Skills</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))", gap: "1rem" }}>
            {SKILLS.map(s => (
              <div key={s.name} className="skill-card">
                <div style={{ fontSize: "1.6rem", marginBottom: "0.6rem" }}>{s.icon}</div>
                <div style={{ fontSize: "0.82rem", fontWeight: 500, letterSpacing: "0.04em" }}>{s.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ maxWidth: 1400, margin: "0 auto", padding: "7rem 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4a843", marginBottom: "0.75rem" }}>Portfolio</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "0.5rem" }}>Featured Projects</h2>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>Images & videos — upload yours below</p>
        </div>

        {/* UPLOAD */}
        <div className="upload-zone" onClick={() => fileRef.current?.click()}>
          <input ref={fileRef} type="file" accept="image/*,video/*" style={{ display:"none" }} onChange={e => handleFiles(e.target.files)} />
          <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>⊕</div>
          <p style={{ color: "#777", marginBottom: "0.3rem", fontSize: "0.9rem" }}>Drop image or video — or <span style={{ color: "#d4a843" }}>browse</span></p>
          <span style={{ fontSize: "0.72rem", color: "#444", letterSpacing: "0.05em" }}>JPG · PNG · WEBP · MP4 · MOV · GIF</span>
        </div>

        {/* FILTERS */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {CATS.map(c => (
            <button key={c} className={`filter-btn${filter===c?" active":""}`} onClick={() => setFilter(c)}>{c}</button>
          ))}
        </div>

        {/* MASONRY GRID — 4 columns */}
        <div className="masonry-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "6px", gridAutoRows: "220px" }}>
          {filtered.map((p, i) => (
            <div
              key={p.id}
              className={`proj-card ${p.span || ""}`}
              style={{ gridColumn: p.span?.includes("col-span-2") ? "span 2" : undefined, gridRow: p.span?.includes("row-span-2") ? "span 2" : undefined }}
              onClick={() => setLightbox(p)}
            >
              {p.type === "video"
                ? <video src={p.src} muted loop playsInline style={{ width:"100%", height:"100%", objectFit:"cover" }} onMouseEnter={e=>e.target.play()} onMouseLeave={e=>e.target.pause()} />
                : <img src={p.src} alt={p.title} loading="lazy" />
              }
              {p.type === "video" && <div className="video-badge">▶ Video</div>}
              <div className="proj-overlay">
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.2rem" }}>{p.title}</div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4a843" }}>{p.cat}</div>
              </div>
              <button className="proj-del" onClick={e => { e.stopPropagation(); deleteProject(p.id); }}>✕</button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ gridColumn: "1/-1", padding: "4rem", textAlign: "center", color: "#444", fontSize: "0.9rem", border: "0.5px dashed rgba(255,255,255,0.07)", borderRadius: 4 }}>
              No projects in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "#0b0b0b", padding: "7rem 2rem", borderTop: "0.5px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "5rem", alignItems: "start" }}>
          <div>
            <div style={{ fontSize: "0.7rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#d4a843", marginBottom: "0.75rem" }}>Let's Work</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "1.5rem", lineHeight: 1.1 }}>Let's Work Together</h2>
            <p style={{ color: "#777", lineHeight: 1.85, marginBottom: "2.5rem", fontWeight: 300 }}>
              Interested in graphic design, video editing, branding, or social media projects? I'd love to hear your idea.
            </p>
            {[["Email","harshitbora@email.com"],["Location","Haldwani, Uttarakhand"],["Availability","Open to Freelance"]].map(([l,v]) => (
              <div key={l} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.25rem", paddingBottom: "1.25rem", borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}>
                <span style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4a843", minWidth: 80, paddingTop: 2 }}>{l}</span>
                <span style={{ fontSize: "0.9rem", color: "#aaa" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input className="form-input" type="text" placeholder="Your Name" />
            <input className="form-input" type="email" placeholder="Your Email" />
            <input className="form-input" type="text" placeholder="Subject" />
            <textarea className="form-textarea" placeholder="Tell me about your project..." />
            <button className="btn-primary" style={{ width: "fit-content" }}>Send Message</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)", padding: "2rem", textAlign: "center", color: "#3a3a3a", fontSize: "0.8rem", letterSpacing: "0.06em" }}>
        © 2026 Harshit Bora. All rights reserved.
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.93)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div onClick={e => e.stopPropagation()} style={{ background: "#111", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 4, overflow: "hidden", maxWidth: 900, width: "100%", maxHeight: "90vh", display: "flex", flexDirection: "column" }}>
            {lightbox.type === "video"
              ? <video src={lightbox.src} controls autoPlay style={{ width: "100%", maxHeight: "70vh", background: "#000", display: "block" }} />
              : <img src={lightbox.src} alt={lightbox.title} style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", background: "#0a0a0a", display: "block" }} />
            }
            <div style={{ padding: "1.25rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700 }}>{lightbox.title}</div>
                <div style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#d4a843", marginTop: "0.2rem" }}>{lightbox.cat}</div>
              </div>
              <button className="btn-ghost" style={{ padding: "0.4rem 1rem", fontSize: "0.78rem" }} onClick={() => setLightbox(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* TAG MODAL */}
      {tagModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 600, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#141414", border: "0.5px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2rem", width: 360 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, marginBottom: "1.25rem" }}>Name this piece</div>
            <input className="form-input" value={tagTitle} onChange={e => setTagTitle(e.target.value)} placeholder="Project title..." style={{ marginBottom: "0.75rem" }} />
            <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.4rem" }}>Category</label>
            <select className="form-input" value={tagCat} onChange={e => setTagCat(e.target.value)} style={{ cursor: "pointer", marginBottom: "0.75rem" }}>
              {["Design","Video","Branding","Print","Other"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <label style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#888", display: "block", marginBottom: "0.4rem" }}>Type</label>
            <select className="form-input" value={tagType} onChange={e => setTagType(e.target.value)} style={{ cursor: "pointer", marginBottom: "1.25rem" }}>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button className="btn-ghost" style={{ flex: 1, padding: "0.65rem", fontSize: "0.8rem" }} onClick={() => setTagModal(null)}>Cancel</button>
              <button className="btn-primary" style={{ flex: 1, padding: "0.65rem", fontSize: "0.8rem" }} onClick={confirmAdd}>Add to Portfolio</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

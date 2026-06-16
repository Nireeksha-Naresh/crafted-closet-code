import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import emailjs from "@emailjs/browser";
import {
  Menu, X, Scissors, Target, Sparkles, Zap, PenTool,
  RefreshCw, Package, MapPin, Phone, Mail, Clock, Instagram, Facebook,
  MessageCircle, Star, ArrowRight, Ruler, Heart, CheckCircle2, Gift,
  Lock, ImageIcon,
} from "lucide-react";

const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
import catMenAsset from "@/assets/cat-men.png.asset.json";
import catWomenAsset from "@/assets/cat-women.png.asset.json";
import catKidsAsset from "@/assets/cat-kids.png.asset.json";
import catBridalAsset from "@/assets/cat-bridal.png.asset.json";
import catEthnicAsset from "@/assets/cat-ethnic.png.asset.json";
import catPartyAsset from "@/assets/cat-party.png.asset.json";
import bgArchAsset from "@/assets/bg-arch.png.asset.json";
import bgRackAsset from "@/assets/bg-rack.png.asset.json";
import bgMughalAsset from "@/assets/bg-mughal.png.asset.json";
import bgDrapeAsset from "@/assets/bg-drape.png.asset.json";

const heroImageModules = {
  ...import.meta.glob("@/assets/hero*.{jpg,jpeg,png,webp}", { eager: true }),
  ...import.meta.glob("@/assets/hov.{jpg,jpeg,png,webp}", { eager: true }),
} as Record<string, { default?: string }>;

function getHeroImageOrder(path: string) {
  const file = path.split("/").pop()?.toLowerCase() ?? "";
  if (/^hero\.(jpg|jpeg|png|webp)$/.test(file)) return 0;
  if (/^hov\.(jpg|jpeg|png|webp)$/.test(file)) return 1;
  const numberedHero = file.match(/^hero(\d+)\.(jpg|jpeg|png|webp)$/);
  if (numberedHero) return Number(numberedHero[1]) + 1;
  return 999;
}

const heroImages: string[] = Object.entries(heroImageModules)
  .sort(([a], [b]) => getHeroImageOrder(a) - getHeroImageOrder(b) || a.localeCompare(b))
  .map(([, mod]) => mod.default)
  .filter((src): src is string => Boolean(src));

const catMen = catMenAsset.url;
const catWomen = catWomenAsset.url;
const catKids = catKidsAsset.url;
const catBridal = catBridalAsset.url;
const catEthnic = catEthnicAsset.url;
const catParty = catPartyAsset.url;
const bgArch = bgArchAsset.url;
const bgRack = bgRackAsset.url;
const bgMughal = bgMughalAsset.url;
const bgDrape = bgDrapeAsset.url;


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stitch & Style — Crafted for You. Made to Last." },
      { name: "description", content: "Premium made-to-order clothing crafted to your exact measurements. Men's, women's, bridal & ethnic wear delivered across India." },
      { property: "og:title", content: "Stitch & Style — Premium Made-to-Order Clothing" },
      { property: "og:description", content: "Custom-tailored outfits for every occasion. Crafted for you. Made to last." },
    ],
  }),
  component: Home,
});

/* ============ utilities ============ */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("is-visible"), io.unobserve(e.target))),
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function addRipple(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const dot = document.createElement("span");
  dot.className = "ripple-dot";
  dot.style.width = dot.style.height = `${size}px`;
  dot.style.left = `${e.clientX - rect.left - size / 2}px`;
  dot.style.top = `${e.clientY - rect.top - size / 2}px`;
  el.appendChild(dot);
  setTimeout(() => dot.remove(), 650);
}

/* ============ Festival banner ============ */

function useFestival() {
  return useMemo(() => {
    const m = new Date().getMonth();
    if (m === 9 || m === 10) return { name: "Diwali", cta: "Light up the festivities — order your Diwali outfit!", color: "#C9A84C" };
    if (m === 11) return { name: "Christmas", cta: "Make this Christmas merry & tailored!", color: "#6B1E3D" };
    if (m === 3 || m === 4) return { name: "Eid", cta: "Eid Mubarak — order your festive look today!", color: "#C9A84C" };
    return null;
  }, []);
}

/* ============ Loyalty banner ============ */

function LoyaltyBanner() {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("loyalty-dismissed")) return;
    const t = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => { setShow(false); sessionStorage.setItem("loyalty-dismissed", "1"); };
  return (
    <>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -60, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 22 }}
            className="fixed inset-x-0 top-0 z-[60] festival-strip text-ivory shadow-md"
          >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-6 py-2 text-sm">
              <button onClick={() => setOpen(true)} className="flex items-center gap-2 font-medium">
                <Gift className="h-4 w-4" /> Your 3rd order earns <span className="font-bold">15% off</span> — tap for tier perks
              </button>
              <button onClick={dismiss} aria-label="dismiss"><X className="h-4 w-4" /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <Modal open={open} onClose={() => setOpen(false)} title="Loyalty Tiers">
        <div className="space-y-3">
          {[
            { tier: "Silver", req: "2 orders", perks: "5% off, priority queue" },
            { tier: "Gold", req: "5 orders", perks: "12% off, free express delivery" },
            { tier: "Platinum", req: "10 orders", perks: "18% off, complimentary fabric swatch box, dedicated stylist" },
          ].map((t) => (
            <div key={t.tier} className="rounded-xl border border-border bg-ivory p-4">
              <div className="flex items-baseline justify-between">
                <div className="font-display text-xl font-bold text-burgundy">{t.tier}</div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{t.req}</div>
              </div>
              <p className="mt-1 text-sm text-charcoal/80">{t.perks}</p>
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
}

/* ============ Generic Modal ============ */

function Modal({ open, onClose, title, children, wide }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode; wide?: boolean }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100]">
      <div className="animate-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`animate-drape fixed left-1/2 top-1/2 max-h-[90vh] w-[92vw] overflow-y-auto rounded-3xl bg-ivory shadow-2xl ${wide ? "max-w-3xl" : "max-w-lg"}`}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-ivory/95 px-6 py-4 backdrop-blur">
          <h3 className="font-display text-xl font-bold text-burgundy">{title}</h3>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full hover:bg-ivory-soft">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

/* ============ Logo ============ */

function Logo({ small }: { small?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2">
      <span className={`grid place-items-center rounded-full bg-burgundy text-gold ${small ? "h-8 w-8" : "h-10 w-10"}`}>
        <Scissors className={`animate-spin-once ${small ? "h-4 w-4" : "h-5 w-5"}`} />
      </span>
      <span className={`font-display font-bold tracking-tight text-burgundy ${small ? "text-lg" : "text-xl"}`}>
        Stitch <span className="text-gold">&</span> Style
      </span>
    </a>
  );
}

/* ============ Navbar ============ */

const navLinks = [
  { label: "Home", href: "top" },
  { label: "Categories", href: "categories" },
  { label: "How It Works", href: "how" },
  { label: "Lookbook", href: "lookbook" },
  { label: "Contact", href: "contact" },
];

function Navbar({ onOrder, festivalActive }: { onOrder: () => void; festivalActive: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 100);
      const offset = window.scrollY + 120;
      for (const l of [...navLinks].reverse()) {
        const el = document.getElementById(l.href);
        if (el && el.offsetTop <= offset) { setActive(l.href); break; }
      }
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 72, behavior: "smooth" });
    setOpen(false);
  };
  return (
    <header
      className={`fixed inset-x-0 z-50 transition-all ${festivalActive ? "top-9" : "top-0"} ${
        scrolled ? "bg-ivory/95 shadow-[0_2px_24px_-12px_rgba(107,30,61,0.25)] backdrop-blur" : "bg-ivory/85 backdrop-blur-sm"
      }`}
    >
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-6 transition-all ${scrolled ? "py-2" : "py-4"}`}>
        <Logo small={scrolled} />
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href} href={`#${l.href}`} onClick={go(l.href)}
              className={`nav-link text-sm font-medium text-charcoal transition-colors hover:text-burgundy ${active === l.href ? "active text-burgundy" : ""}`}
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <button
            onClick={(e) => { addRipple(e); onOrder(); }}
            className="ripple-container btn-morph border-2 border-gold bg-burgundy px-6 py-2.5 text-sm font-semibold text-ivory hover:bg-burgundy-deep"
          >
            Place Custom Order
          </button>
        </div>
        <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="lg:hidden rounded-md p-2 text-burgundy">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-ivory lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <a key={l.href} href={`#${l.href}`} onClick={go(l.href)} className="rounded-md px-3 py-3 text-sm font-medium text-charcoal hover:bg-ivory-soft">
                {l.label}
              </a>
            ))}
            <button
              onClick={(e) => { addRipple(e); setOpen(false); onOrder(); }}
              className="ripple-container btn-morph mt-2 border-2 border-gold bg-burgundy px-6 py-2.5 text-sm font-semibold text-ivory"
            >
              Place Custom Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* ============ Hero ============ */

function Hero() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [fading, setFading] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    if (heroImages.length <= 1) return;

    const advance = () => {
      setPrev(current);
      setFading(true);
      setCurrent((c) => (c + 1) % heroImages.length);
      setAnimKey((k) => k + 1);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        setPrev(null);
        setFading(false);
      }, 950);
    };

    const t = window.setInterval(advance, 4500);
    return () => {
      window.clearInterval(t);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [current]);

  if (heroImages.length === 0) {
    return <section id="top" className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-[#1a0510]" />;
  }

  const handleDotClick = (index: number) => {
    if (index === current) return;
    setPrev(current);
    setFading(true);
    setCurrent(index);
    setAnimKey((k) => k + 1);
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setPrev(null);
      setFading(false);
    }, 950);
  };

  return (
    <section id="top" className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-[#1a0510]">
      <style>{`@keyframes kenburns { from { transform: scale(1); } to { transform: scale(1.09); } }`}</style>

      <div className="absolute inset-0 overflow-hidden">
        {prev !== null && heroImages[prev] && (
          <img
            src={heroImages[prev]}
            alt="House of Vastras hero slide"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: fading ? 0 : 1,
              transition: "opacity 0.9s ease",
              transform: "scale(1.09)",
              zIndex: 1,
            }}
          />
        )}

        <img
          key={animKey}
          src={heroImages[current]}
          alt="House of Vastras hero slide"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0,
            animation: "kenburns 5s ease-out forwards",
            transition: "opacity 0.9s ease",
            zIndex: 2,
          }}
          onLoad={(e) => {
            e.currentTarget.style.opacity = "1";
          }}
        />
      </div>

      {heroImages.length > 1 && (
        <div
          className="absolute left-1/2 z-20 flex -translate-x-1/2 items-center gap-2"
          style={{ bottom: 28 }}
        >
          {heroImages.map((_, index) => {
            const active = index === current;
            return (
              <button
                key={index}
                type="button"
                aria-label={`Go to hero slide ${index + 1}`}
                onClick={() => handleDotClick(index)}
                style={{
                  width: active ? 22 : 7,
                  height: 7,
                  borderRadius: active ? 4 : "50%",
                  background: active ? "#C9A84C" : "rgba(201,168,76,0.35)",
                  transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                  cursor: "pointer",
                }}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ============ Categories ============ */

const categories = [
  { name: "Men's Wear", subtitle: "Shirts, Suits, Kurtas, Sherwanis & more", img: catMen, key: "Men's" },
  { name: "Women's Wear", subtitle: "Salwar suits, Kurtis, Blouses, Dresses & more", img: catWomen, key: "Women's" },
  { name: "Kids' Wear", subtitle: "Frocks, Shirts, Ethnic sets & more", img: catKids, key: "Kids" },
];

function TiltCategoryCard({ c, i, onOpen }: { c: typeof categories[number]; i: number; onOpen: (cat: string, x: number, y: number, img: string) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [t, setT] = useState({ rx: 0, ry: 0, mx: 50, my: 50, lift: 0 });
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setT({ rx: (0.5 - py) * 12, ry: (px - 0.5) * 14, mx: px * 100, my: py * 100, lift: 1 });
  };
  const reset = () => setT((s) => ({ ...s, rx: 0, ry: 0, lift: 0 }));
  return (
    <Reveal delay={i * 80}>
      <div style={{ perspective: "1200px" }}>
        <button
          ref={ref}
          onMouseMove={handleMove}
          onMouseLeave={reset}
          onClick={(e) => { addRipple(e); onOpen(c.key, e.clientX, e.clientY, c.img); }}
          style={{
            transform: `rotateX(${t.rx}deg) rotateY(${t.ry}deg) translateZ(${t.lift * 18}px)`,
            transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
            transformStyle: "preserve-3d",
          }}
          className="ripple-container group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl text-left shadow-xl shadow-black/20 will-change-transform hover:shadow-2xl hover:shadow-burgundy/30"
        >
          <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent transition-colors group-hover:from-burgundy/85 group-hover:via-burgundy/30" />
          {/* gold sheen following cursor */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: `radial-gradient(420px circle at ${t.mx}% ${t.my}%, rgba(201,168,76,0.35), transparent 60%)` }}
          />
          <span className="absolute right-4 top-4 rounded-full bg-gold px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-charcoal opacity-0 transition-all duration-300 group-hover:opacity-100" style={{ transform: "translateZ(40px)" }}>
            Custom Made
          </span>
          <div className="absolute inset-x-0 bottom-0 p-8" style={{ transform: "translateZ(30px)" }}>
            <h3 className="font-display text-3xl font-bold text-ivory drop-shadow-lg sm:text-4xl">{c.name}</h3>
            <p className="mt-2 text-sm text-ivory/85">{c.subtitle}</p>
            <span className="mt-5 inline-flex translate-y-2 items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              Step Inside <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </button>
      </div>
    </Reveal>
  );
}

function Categories({ onOrderPortal }: { onOrderPortal: (cat: string, x: number, y: number, img: string) => void }) {
  return (
    <section id="categories" className="bg-ivory px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading eyebrow="Collections" title="Shop by Category" subtitle="Click any card — step into its atelier." />
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:[&>*:last-child]:col-span-2 md:[&>*:last-child]:mx-auto md:[&>*:last-child]:max-w-[calc(50%-0.75rem)] lg:grid-cols-3 lg:[&>*:last-child]:col-span-1 lg:[&>*:last-child]:max-w-none lg:[&>*:last-child]:mx-0">
          {categories.map((c, i) => (
            <TiltCategoryCard key={c.name} c={c} i={i} onOpen={onOrderPortal} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Portal reveal ============ */

type Portal = { cat: string; x: number; y: number; img: string };

function CategoryPortal({ portal, onDone }: { portal: Portal; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1400);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div className="fixed inset-0 z-[80] overflow-hidden" style={{ pointerEvents: "none" }}>
      <div
        className="absolute inset-0"
        style={{
          clipPath: `circle(0px at ${portal.x}px ${portal.y}px)`,
          animation: "portal-expand 1.2s cubic-bezier(0.7,0,0.2,1) forwards",
          backgroundColor: "#2a0a18",
        }}
      >
        <img src={portal.img} alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-deep/85 via-burgundy/70 to-black/90" />
        {/* gold thread */}
        <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M 0 80 Q 30 20, 60 60 T 100 30" fill="none" stroke="#C9A84C" strokeWidth="0.3"
            strokeDasharray="200" strokeDashoffset="200"
            style={{ animation: "thread-draw 1.1s 0.3s ease-out forwards" }} />
        </svg>
        {/* measurement tape */}
        <div className="absolute left-0 right-0 top-1/2 h-10 -translate-y-1/2 overflow-hidden"
             style={{ animation: "tape-slide 0.9s 0.35s cubic-bezier(0.22,1,0.36,1) both" }}>
          <div className="h-full w-full bg-gold/95 shadow-2xl shadow-gold/40"
               style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent 0 22px, rgba(0,0,0,0.55) 22px 23px, transparent 23px 46px, rgba(0,0,0,0.35) 46px 47px)" }} />
        </div>
        {/* tilted welcome panel */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1400px" }}>
          <div
            className="rounded-2xl border border-gold/40 bg-burgundy-deep/85 px-10 py-8 text-center shadow-2xl backdrop-blur-md"
            style={{
              transform: "rotateX(8deg) rotateY(-10deg)",
              animation: "panel-fly 0.8s 0.45s cubic-bezier(0.22,1,0.36,1) both",
            }}
          >
            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold">Atelier · {portal.cat}</p>
            <h3 className="mt-3 font-display text-4xl text-ivory">Welcome inside.</h3>
            <p className="mt-2 text-sm text-ivory/75">Preparing your measurement studio…</p>
          </div>
        </div>
      </div>
    </div>
  );
}



/* ============ Stats ============ */

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [v, setV] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now(); const dur = 1500;
        const step = (t: number) => {
          const p = Math.min(1, (t - start) / dur);
          setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString()}{suffix}</span>;
}

function Stats() {
  const items = [
    { v: 500, s: "+", l: "Orders Delivered" },
    { v: 98, s: "%", l: "Satisfaction" },
    { v: 15, s: "+", l: "Master Tailors" },
    { v: 7, s: " days", l: "Avg. Turnaround" },
  ];
  return (
    <section className="bg-burgundy px-6 py-16 text-ivory">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((i) => (
          <Reveal key={i.l} className="text-center">
            <div className="font-display text-5xl font-bold text-gold"><Counter to={i.v} suffix={i.s} /></div>
            <div className="mt-2 text-xs uppercase tracking-[0.25em] text-ivory/75">{i.l}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ============ How it works ============ */

const steps = [
  { n: "01", icon: Sparkles, title: "Choose Your Style", desc: "Browse categories and pick your outfit type." },
  { n: "02", icon: PenTool, title: "Share Your Details", desc: "Fill in measurements, fabric, and design preferences." },
  { n: "03", icon: Scissors, title: "We Craft It", desc: "Our master tailors bring your vision to life." },
  { n: "04", icon: Package, title: "Delivered to You", desc: "Your custom outfit delivered to your doorstep." },
];

function HowItWorks() {
  const tapeRef = useRef<HTMLDivElement>(null);
  const [tape, setTape] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = tapeRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = 1 - Math.max(0, Math.min(1, (r.top - vh * 0.2) / (vh * 0.6)));
      setTape(Math.max(0, Math.min(1, p)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <section id="how" className="bg-ivory-soft px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="The Process" title="How It Works" subtitle="Simple steps to your perfect outfit." /></Reveal>
        <div ref={tapeRef} className="mt-12 h-3 w-full origin-left rounded-full bg-gradient-to-r from-burgundy via-gold to-burgundy"
             style={{ transform: `scaleX(${tape})` }} aria-hidden />
        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 100} className="text-center">
              <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full border-2 border-gold bg-ivory shadow-lg shadow-burgundy/10">
                <s.icon className="h-9 w-9 text-burgundy" />
              </div>
              <span className="mt-5 block font-display text-3xl font-bold text-gold">{s.n}</span>
              <h3 className="mt-2 text-lg font-semibold text-charcoal">{s.title}</h3>
              <p className="mt-2 mx-auto max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Why us ============ */

const features = [
  { icon: Target, title: "100% Custom Fit", desc: "Every outfit stitched to your exact measurements." },
  { icon: Sparkles, title: "Premium Fabrics", desc: "Carefully sourced materials from trusted mills." },
  { icon: Zap, title: "Quick Turnaround", desc: "Most orders ready within 7–10 business days." },
  { icon: PenTool, title: "Design Consultation", desc: "Our experts help you pick the perfect design." },
  { icon: RefreshCw, title: "Alterations Included", desc: "Free alterations if the fit isn't perfect." },
  { icon: MapPin, title: "Operating in Bengaluru", desc: "Based in the heart of Bengaluru, serving customers across the city with doorstep pickup and delivery." },
];

function WhyUs() {
  return (
    <section id="why" className="bg-ivory px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Our Promise" title="Why Choose Stitch & Style?" subtitle="Where quality meets craftsmanship." /></Reveal>
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="group h-full rounded-2xl border-2 border-transparent bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-burgundy/40 hover:shadow-xl hover:shadow-burgundy/10">
                <div className="grid h-14 w-14 place-items-center rounded-xl bg-burgundy/5 text-gold transition-colors group-hover:bg-burgundy">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Lookbook ============ */

const lookbookImages = [
  { src: catBridal, cat: "Bridal" },
  { src: catWomen, cat: "Women's" },
  { src: catMen, cat: "Men's" },
  { src: catEthnic, cat: "Ethnic" },
  { src: catParty, cat: "Party" },
  { src: catKids, cat: "Kids" },
  { src: catBridal, cat: "Bridal" },
  { src: catEthnic, cat: "Ethnic" },
];

function Lookbook({ onOrder }: { onOrder: (cat?: string) => void }) {
  const tabs = ["All", "Bridal", "Women's", "Men's", "Ethnic", "Party", "Kids"];
  const [tab, setTab] = useState("All");
  const [light, setLight] = useState<{ src: string; cat: string } | null>(null);
  const items = lookbookImages.filter((i) => tab === "All" || i.cat === tab);
  return (
    <section id="lookbook" className="bg-ivory-soft px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Inspiration" title="Lookbook Gallery" subtitle="Past creations to spark your next outfit." /></Reveal>
        <Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {tabs.map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  tab === t ? "border-burgundy bg-burgundy text-ivory" : "border-border bg-ivory text-charcoal hover:border-gold"
                }`}>{t}</button>
            ))}
          </div>
        </Reveal>
        <div className="mt-10 columns-2 gap-4 md:columns-3 lg:columns-4">
          {items.map((it, i) => (
            <motion.button key={i} layout onClick={() => setLight(it)}
              className="mb-4 block w-full overflow-hidden rounded-xl"
              whileHover={{ scale: 1.02 }}
              style={{ breakInside: "avoid" }}
            >
              <img src={it.src} alt={it.cat} className="w-full transition-transform duration-500 hover:scale-110" />
            </motion.button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {light && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-black/85 p-6" onClick={() => setLight(null)}>
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()} className="max-w-3xl text-center">
              <img src={light.src} alt="" className="mx-auto max-h-[75vh] rounded-2xl shadow-2xl" />
              <button
                onClick={() => { onOrder(light.cat); setLight(null); }}
                className="mt-6 rounded-full bg-gold px-8 py-3 text-sm font-semibold text-charcoal hover:bg-gold-soft"
              >Order Something Similar →</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


/* ============ Testimonials ============ */

const testimonials = [
  { name: "Priya Sharma", city: "Mumbai", initials: "PS", quote: "My bridal lehenga was beyond perfect. The fit, the colours, the embroidery — everything was exactly how I imagined. I felt like royalty on my wedding day." },
  { name: "Arjun Mehta", city: "Delhi", initials: "AM", quote: "Got a bandhgala suit stitched for my sister's wedding. The attention to detail and the fit were unmatched. Will definitely order again." },
  { name: "Ananya Iyer", city: "Bengaluru", initials: "AI", quote: "I've ordered three kurtis so far and each one fits like a dream. The fabric quality is incredible for the price. Highly recommend!" },
];

function StarRow({ shown }: { shown: boolean }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`star-fill h-4 w-4 ${shown ? "lit" : ""}`} style={{ transitionDelay: `${i * 150}ms` }} />
      ))}
    </div>
  );
}

function Testimonials() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && (setLit(true), io.disconnect())), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const t = testimonials[idx];
  return (
    <section className="bg-ivory-soft px-6 py-24 lg:py-32">
      <div ref={ref} className="mx-auto max-w-3xl">
        <Reveal><SectionHeading eyebrow="Reviews" title="What Our Customers Say" subtitle="Stories stitched into every order." /></Reveal>
        <div className="relative mt-12 min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.figure
              key={t.name}
              initial={{ x: 300, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.5 }}
              drag="x" dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) setIdx((idx + 1) % testimonials.length);
                else if (info.offset.x > 60) setIdx((idx - 1 + testimonials.length) % testimonials.length);
              }}
              className="cursor-grab rounded-2xl border border-border bg-card p-10 shadow-sm active:cursor-grabbing"
            >
              <StarRow shown={lit} />
              <blockquote className="mt-5 font-display text-xl italic leading-relaxed text-charcoal">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy text-sm font-semibold text-gold">{t.initials}</span>
                <div>
                  <div className="text-sm font-semibold text-charcoal">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button key={i} onClick={() => setIdx(i)}
              className={`h-2 rounded-full transition-all ${i === idx ? "w-8 bg-burgundy" : "w-2 bg-burgundy/30"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ Contact ============ */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="bg-ivory px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal><SectionHeading eyebrow="Say Hello" title="Get in Touch" subtitle="We'd love to hear from you." /></Reveal>
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <Reveal>
            <ul className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: "41, Hazras, 4th Main Rd, RMV 2nd Stage, Naidu Layout, Sanjayanagara, Bengaluru, Karnataka 560094", href: "https://share.google/QuyXYQFObTKYEMV0q" },
                { icon: Phone, label: "Phone", value: "+91 73532 70412", href: "tel:+917353270412" },
                { icon: Mail, label: "Email", value: "orders@stitchandstyle.in", href: "mailto:orders@stitchandstyle.in" },
                { icon: Clock, label: "Working Hours", value: "Mon – Sat, 10 AM – 7 PM" },
              ].map((c) => (
                <li key={c.label} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-burgundy text-gold"><c.icon className="h-5 w-5" /></span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    {c.href ? (
                      <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                         className="mt-1 block text-base font-medium text-charcoal hover:text-burgundy">{c.value}</a>
                    ) : (
                      <div className="mt-1 text-base font-medium text-charcoal">{c.value}</div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <a href="https://share.google/QuyXYQFObTKYEMV0q" target="_blank" rel="noreferrer"
               className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-burgundy hover:text-gold">
              <MapPin className="h-4 w-4" /> View on Google Maps →
            </a>
            <div className="mt-10">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Follow Us</div>
              <div className="mt-3 flex gap-3">
                {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" aria-label="social" className="grid h-11 w-11 place-items-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-charcoal">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); (e.target as HTMLFormElement).reset(); setTimeout(() => setSent(false), 4000); }}
                  className="rounded-2xl border border-border bg-card p-8 shadow-sm">
              <div className="space-y-5">
                <FloatField label="Name" name="name" required />
                <FloatField label="Email" name="email" type="email" required />
                <FloatField label="Message" name="message" textarea required />
              </div>
              <button onClick={addRipple as any} type="submit"
                className="ripple-container btn-morph mt-6 w-full bg-burgundy px-6 py-3.5 text-sm font-semibold text-ivory hover:bg-burgundy-deep">
                Send Message
              </button>
              {sent && <p className="mt-4 rounded-md bg-gold/15 px-3 py-2 text-sm text-burgundy">Thanks — we'll get back to you shortly.</p>}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ============ Footer ============ */

function Footer() {
  return (
    <footer className="bg-[#1E1E1E] px-6 py-14 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-burgundy text-gold"><Scissors className="h-5 w-5" /></span>
            <span className="font-display text-xl font-bold">Stitch <span className="text-gold">&</span> Style</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ivory/60">Crafted for You. Made to Last.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          {navLinks.map((l) => (
            <a key={l.href} href={`#${l.href}`} className="text-ivory/80 hover:text-gold">{l.label}</a>
          ))}
        </nav>
        <div className="flex justify-start gap-3 md:justify-end">
          {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
            <a key={i} href="#" aria-label="social" className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-charcoal">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-ivory/10 pt-6 text-center text-xs text-ivory/50">
        © 2025 Stitch & Style. All rights reserved. | Made with ♥ in India
      </div>
    </footer>
  );
}

/* ============ helpers ============ */

function SectionHeading({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl font-bold text-charcoal sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function FloatField({ label, name, type = "text", required, textarea }: {
  label: string; name: string; type?: string; required?: boolean; textarea?: boolean;
}) {
  return (
    <div className="float-field">
      {textarea
        ? <textarea name={name} required={required} placeholder=" " />
        : <input name={name} type={type} required={required} placeholder=" " />}
      <label>{label}{required && <span className="ml-1 text-burgundy">*</span>}</label>
    </div>
  );
}

/* ============ Size guide & Fabric swatches ============ */

const fabricList = [
  { name: "Silk", color: "#9C2A47" }, { name: "Cotton", color: "#F2E8D5" },
  { name: "Chiffon", color: "#E6D7E7" }, { name: "Velvet", color: "#3A1530" },
  { name: "Georgette", color: "#D8C3A5" }, { name: "Linen", color: "#E4DCC8" },
  { name: "Crepe", color: "#8C8278" }, { name: "Brocade", color: "#B5862E" },
  { name: "Net", color: "#F4E1E1" }, { name: "Organza", color: "#FFF8E7" },
  { name: "Satin", color: "#C49A6C" }, { name: "Banarasi", color: "#7B1E2C" },
  { name: "Tussar", color: "#C9A064" }, { name: "Khadi", color: "#E8DBC2" },
  { name: "Denim", color: "#3B5B7A" }, { name: "Wool", color: "#5A4A3F" },
  { name: "Polyester", color: "#B7BFC9" }, { name: "Jacquard", color: "#9B6B3A" },
  { name: "Cambric", color: "#EDE5D0" }, { name: "Muslin", color: "#F1EAD8" },
];

function FabricSwatches({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
      {fabricList.map((f) => (
        <button type="button" key={f.name} onClick={() => onChange(f.name)} title={f.name}
          className={`group flex flex-col items-center gap-1`}>
          <span style={{ background: f.color }}
            className={`h-10 w-10 rounded-full border transition-all ${value === f.name ? "border-gold ring-4 ring-gold/40 scale-110" : "border-border"}`} />
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground group-hover:text-burgundy">{f.name}</span>
        </button>
      ))}
    </div>
  );
}

function SizeGuide({ open, onClose, onApply }: { open: boolean; onClose: () => void; onApply: (txt: string) => void }) {
  const [zone, setZone] = useState<string | null>(null);
  const zones: Record<string, string> = {
    chest: "Wrap tape around the fullest part of your chest, keeping it level.",
    waist: "Measure around the narrowest part of your natural waist.",
    hip: "Measure around the fullest part of your hips, feet together.",
    height: "Stand against a wall, measure from head to heel barefoot.",
  };
  return (
    <Modal open={open} onClose={onClose} title="Find My Size" wide>
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className="relative grid place-items-center rounded-2xl bg-ivory-soft p-6">
          <svg viewBox="0 0 100 200" className="h-72 w-auto text-burgundy">
            <circle cx="50" cy="20" r="12" fill="currentColor" />
            <path d="M30 35 H70 L80 80 L70 130 L60 195 H40 L30 130 L20 80 Z" fill="currentColor" opacity="0.85" />
            {[
              { id: "chest", cx: 50, cy: 55 },
              { id: "waist", cx: 50, cy: 90 },
              { id: "hip", cx: 50, cy: 115 },
              { id: "height", cx: 88, cy: 100 },
            ].map((z) => (
              <circle key={z.id} cx={z.cx} cy={z.cy} r="5" fill="#C9A84C" className="cursor-pointer" onClick={() => setZone(z.id)} />
            ))}
          </svg>
          <p className="mt-2 text-xs text-muted-foreground">Tap a gold dot on the diagram</p>
        </div>
        <div>
          {zone ? (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-gold">{zone}</div>
              <p className="mt-2 text-sm text-charcoal">{zones[zone]}</p>
              <input id="size-val" type="number" placeholder="Enter inches" className="mt-4 w-full rounded-md border border-input bg-ivory px-3 py-2 text-sm" />
              <button onClick={() => {
                const v = (document.getElementById("size-val") as HTMLInputElement)?.value;
                if (v) { onApply(`${zone}: ${v} in`); onClose(); }
              }} className="mt-3 w-full rounded-full bg-burgundy py-2.5 text-sm font-semibold text-ivory">Apply Measurement</button>
            </div>
          ) : <p className="text-sm text-muted-foreground">Choose a body zone to see measurement guidance.</p>}
        </div>
      </div>
    </Modal>
  );
}

/* ============ Measurement Vault ============ */

function MeasurementVault({ onLoad }: { onLoad: (m: string) => void }) {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [step, setStep] = useState<"phone" | "pin" | "set">("phone");
  const [msg, setMsg] = useState("");
  const key = (p: string) => `mv:${p}`;
  const check = () => {
    const saved = localStorage.getItem(key(phone));
    if (!saved) { setStep("set"); setMsg("New profile — set a 4-digit PIN to save measurements."); return; }
    setStep("pin");
  };
  const verify = () => {
    const saved = JSON.parse(localStorage.getItem(key(phone)) || "{}");
    if (saved.pin === pin) { onLoad(saved.measurements || ""); setOpen(false); setMsg(""); }
    else setMsg("Wrong PIN.");
  };
  const save = () => {
    if (pin.length !== 4) { setMsg("PIN must be 4 digits."); return; }
    localStorage.setItem(key(phone), JSON.stringify({ pin, measurements: "" }));
    setMsg("Profile created. Measurements will save with your next submitted order.");
    setTimeout(() => setOpen(false), 1500);
  };
  return (
    <>
      <button type="button" onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-dashed border-gold/60 bg-gold/5 px-3 py-2 text-xs font-semibold text-burgundy hover:bg-gold/10">
        <Lock className="h-3.5 w-3.5" /> Returning? Load saved measurements
      </button>
      <Modal open={open} onClose={() => setOpen(false)} title="Measurement Vault">
        <div className="space-y-3">
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number"
            className="w-full rounded-md border border-input bg-ivory px-3 py-2 text-sm" />
          {step === "phone" && (
            <button onClick={check} disabled={phone.length < 7}
              className="w-full rounded-full bg-burgundy py-2.5 text-sm font-semibold text-ivory disabled:opacity-50">Continue</button>
          )}
          {(step === "pin" || step === "set") && (
            <>
              <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                placeholder={step === "set" ? "Create 4-digit PIN" : "Enter PIN"} type="password"
                className="w-full rounded-md border border-input bg-ivory px-3 py-2 text-sm tracking-[0.5em]" />
              <button onClick={step === "set" ? save : verify}
                className="w-full rounded-full bg-burgundy py-2.5 text-sm font-semibold text-ivory">
                {step === "set" ? "Save Profile" : "Load Measurements"}
              </button>
            </>
          )}
          {msg && <p className="text-xs text-burgundy">{msg}</p>}
          <p className="text-[11px] text-muted-foreground">PIN-protected. Stored only on this device.</p>
        </div>
      </Modal>
    </>
  );
}

/* ============ Order Modal ============ */

const trackerStages = [
  { label: "Received", icon: CheckCircle2 },
  { label: "Confirmed", icon: PenTool },
  { label: "Fabric Sourced", icon: Sparkles },
  { label: "Stitching", icon: Scissors },
  { label: "Ready to Dispatch", icon: Package },
];

function OrderTracker() {
  const [stage, setStage] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStage((s) => (s < trackerStages.length - 1 ? s + 1 : s)), 1500);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="mt-6">
      <div className="relative mx-auto flex max-w-2xl items-start justify-between">
        <div className="absolute left-5 right-5 top-5 h-1 rounded-full bg-burgundy/15">
          <motion.div className="h-full rounded-full bg-gold"
            animate={{ width: `${(stage / (trackerStages.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }} />
        </div>
        {trackerStages.map((s, i) => {
          const done = i <= stage;
          return (
            <div key={s.label} className="relative z-10 flex w-20 flex-col items-center text-center">
              <motion.span animate={{ scale: done ? 1 : 0.85, backgroundColor: done ? "#6B1E3D" : "#FDF6EC" }}
                className="grid h-10 w-10 place-items-center rounded-full border-2 border-burgundy text-gold">
                <s.icon className="h-4 w-4" style={{ color: done ? "#C9A84C" : "#6B1E3D" }} />
              </motion.span>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-charcoal">{s.label}</span>
              {done && <span className="text-[9px] text-muted-foreground">{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function OrderModal({ open, onClose, defaultCategory }: { open: boolean; onClose: () => void; defaultCategory?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [wish, setWish] = useState(false);
  const [wishBeat, setWishBeat] = useState(false);

  useEffect(() => {
    if (open) { document.body.style.overflow = "hidden"; setSubmitted(false); setSubmitting(false); }
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const params = {
      to_email_1: "nireeksha.22ad028@sode-edu.in",
      to_email_2: "cscharan.s@gmail.com",
      customer_name: String(fd.get("name") || ""),
      customer_phone: String(fd.get("phone") || ""),
      customer_email: String(fd.get("email") || ""),
      category: String(fd.get("category") || ""),
      outfit_type: String(fd.get("outfit") || ""),
      occasion: String(fd.get("occasion") || ""),
      design_notes: String(fd.get("design") || ""),
      additional_notes: String(fd.get("additional") || ""),
      submitted_at: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };
    setSubmitting(true);
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params, { publicKey: EMAILJS_PUBLIC_KEY });
    } catch (err) {
      console.error("EmailJS send failed:", err);
    }
    setSubmitting(false);
    setSubmitted(true);
    confetti({
      particleCount: 60, spread: 80, origin: { y: 0.5 },
      colors: ["#C9A84C", "#6B1E3D", "#FDF6EC"],
    });
  };

  const selectCls = "w-full rounded-md border border-input bg-ivory px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-gold";

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="animate-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="animate-drape fixed left-1/2 top-1/2 max-h-[92vh] w-[95vw] max-w-3xl overflow-y-auto rounded-3xl bg-ivory shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-ivory/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold">New Order</div>
            <h3 className="font-display text-2xl font-bold text-charcoal">Place Your Custom Order</h3>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => { setWish((w) => !w); setWishBeat(true); setTimeout(() => setWishBeat(false), 500); }}
              aria-label="Wishlist"
              className={`grid h-9 w-9 place-items-center rounded-full hover:bg-ivory-soft ${wishBeat ? "animate-heartbeat" : ""}`}>
              <Heart className={`h-5 w-5 ${wish ? "fill-burgundy text-burgundy" : "text-charcoal"}`} />
            </button>
            <button onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-ivory-soft">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {submitted ? (
          <div className="px-8 py-12 text-center">
            <motion.svg viewBox="0 0 48 48" className="mx-auto h-20 w-20">
              <motion.circle cx="24" cy="24" r="22" fill="#16a34a22" stroke="#16a34a" strokeWidth="2"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }} />
              <motion.path d="M14 25 L22 33 L35 18" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.2 }} />
            </motion.svg>
            <h4 className="mt-5 font-display text-3xl font-bold text-burgundy">Thank you!</h4>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Your order has been received. Track your outfit's journey live below. We'll reach out within 24 hours.
            </p>
            <OrderTracker />
            <button onClick={onClose} className="mt-8 rounded-full bg-burgundy px-8 py-3 text-sm font-semibold text-ivory hover:bg-burgundy-deep">Done</button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="px-6 py-6 sm:px-8">
            <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FloatField label="Full Name" name="name" required />
              <FloatField label="Phone Number" name="phone" type="tel" required />
              <div className="sm:col-span-2"><FloatField label="Email Address" name="email" type="email" required /></div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category *</label>
                <select name="category" required defaultValue={defaultCategory ?? ""} className={selectCls}>
                  <option value="" disabled>Select a category</option>
                  {["Men's", "Women's", "Kids"].map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Outfit Type *</label>
                <select name="outfit" required defaultValue="" className={selectCls}>
                  <option value="" disabled>Select outfit type</option>
                  {["Party", "Ethnic", "Bridal", "Casual", "Formal"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <FloatField label="Occasion" name="occasion" />

              <div className="sm:col-span-2"><FloatField label="Color / Design Notes" name="design" textarea /></div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Reference Image</label>
                <input type="file" name="reference" accept="image/*"
                  className="block w-full text-sm text-charcoal file:mr-3 file:rounded-full file:border-0 file:bg-burgundy file:px-4 file:py-2 file:text-xs file:font-semibold file:text-ivory" />
              </div>
            </div>

            <button onClick={addRipple as any} type="submit" disabled={submitting}
              className="ripple-container btn-morph mt-7 w-full bg-burgundy px-6 py-4 text-sm font-semibold uppercase tracking-wider text-ivory shadow-lg shadow-burgundy/30 hover:bg-burgundy-deep disabled:opacity-70">
              {submitting ? "Submitting…" : "Submit My Order"}
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">By submitting, you agree to be contacted about your order.</p>
          </form>
        )}
      </div>
    </div>

  );
}

/* ============ WhatsApp Button ============ */

function WhatsAppButton() {
  const [pulse, setPulse] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPulse(true), 3000); return () => clearTimeout(t); }, []);
  const text = encodeURIComponent("Hi Stitch & Style! I'd like to place a custom order. Category: ___, Occasion: ___, Budget: ___");
  return (
    <a href={`https://wa.me/919876543210?text=${text}`} target="_blank" rel="noopener noreferrer"
      aria-label="WhatsApp Quick Order"
      className={`fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl ${pulse ? "wa-pulse" : ""}`}>
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

/* ============ Home ============ */

function Home() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [presetCategory, setPresetCategory] = useState<string | undefined>();
  const [portal, setPortal] = useState<Portal | null>(null);
  const festival = useFestival();

  const openOrder = (cat?: string) => { setPresetCategory(cat); setOrderOpen(true); };
  const openPortal = (cat: string, x: number, y: number, img: string) => {
    setPortal({ cat, x, y, img });
  };

  return (
    <div className="min-h-screen bg-ivory">
      {festival && (
        <div className="festival-strip fixed inset-x-0 top-0 z-[55] px-6 py-1.5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-ivory">
          ✦ {festival.name} Mode — {festival.cta} ✦
        </div>
      )}
      <LoyaltyBanner />
      <Navbar onOrder={() => openOrder()} festivalActive={!!festival} />
      <main className={festival ? "pt-8" : ""}>
        <Hero />
        <Stats />
        <Categories onOrderPortal={openPortal} />
        <HowItWorks />
        <WhyUs />
        <Lookbook onOrder={openOrder} />
        
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <OrderModal open={orderOpen} onClose={() => setOrderOpen(false)} defaultCategory={presetCategory} />
      {portal && (
        <CategoryPortal
          portal={portal}
          onDone={() => { const cat = portal.cat; setPortal(null); openOrder(cat); }}
        />
      )}
    </div>
  );
}

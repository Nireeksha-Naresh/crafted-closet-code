import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Scissors,
  Target,
  Sparkles,
  Zap,
  PenTool,
  RefreshCw,
  Package,
  MapPin,
  Phone,
  Mail,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Star,
  ArrowRight,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import catMen from "@/assets/cat-men.jpg";
import catWomen from "@/assets/cat-women.jpg";
import catKids from "@/assets/cat-kids.jpg";
import catBridal from "@/assets/cat-bridal.jpg";
import catEthnic from "@/assets/cat-ethnic.jpg";
import catParty from "@/assets/cat-party.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stitch & Style — Crafted for You. Made to Last." },
      {
        name: "description",
        content:
          "Premium made-to-order clothing crafted to your exact measurements. Men's, women's, bridal & ethnic wear delivered across India.",
      },
      { property: "og:title", content: "Stitch & Style — Premium Made-to-Order Clothing" },
      {
        property: "og:description",
        content: "Custom-tailored outfits for every occasion. Crafted for you. Made to last.",
      },
    ],
  }),
  component: Home,
});

/* ------------------------------ Brand Logo ------------------------------ */

function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`}>
      <span className="grid h-10 w-10 place-items-center rounded-full bg-burgundy text-gold">
        <Scissors className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-burgundy">
        Stitch <span className="text-gold">&</span> Style
      </span>
    </a>
  );
}

/* ------------------------------- Navbar -------------------------------- */

const navLinks = [
  { label: "Home", href: "#top" },
  { label: "Categories", href: "#categories" },
  { label: "Why Us", href: "#why" },
  { label: "How It Works", href: "#how" },
  { label: "Contact", href: "#contact" },
];

function Navbar({ onOrder }: { onOrder: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    handler();
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all ${
        scrolled
          ? "bg-ivory/95 shadow-[0_2px_24px_-12px_rgba(107,30,61,0.25)] backdrop-blur"
          : "bg-ivory/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-charcoal transition-colors hover:text-burgundy"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <button
            onClick={onOrder}
            className="rounded-full border-2 border-gold bg-burgundy px-6 py-2.5 text-sm font-semibold text-ivory transition-all hover:bg-burgundy-deep hover:shadow-[0_8px_24px_-8px_rgba(201,168,76,0.6)]"
          >
            Place Custom Order
          </button>
        </div>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden rounded-md p-2 text-burgundy"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-ivory lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm font-medium text-charcoal hover:bg-ivory-soft"
              >
                {l.label}
              </a>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                onOrder();
              }}
              className="mt-2 rounded-full border-2 border-gold bg-burgundy px-6 py-2.5 text-sm font-semibold text-ivory"
            >
              Place Custom Order
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

/* -------------------------------- Hero --------------------------------- */

function Hero({ onOrder }: { onOrder: () => void }) {
  return (
    <section id="top" className="relative isolate min-h-screen overflow-hidden">
      <img
        src={heroImg}
        alt="Luxurious burgundy fabric with tailoring shears"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-burgundy-deep/70 via-burgundy/50 to-black/80" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 pt-24 text-center">
        <span className="animate-fade-up mb-6 inline-block rounded-full border border-gold/60 bg-black/20 px-4 py-1.5 text-xs uppercase tracking-[0.3em] text-gold backdrop-blur">
          Crafted for You. Made to Last.
        </span>
        <h1
          className="animate-fade-up text-5xl font-bold leading-[1.05] text-ivory sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.1s" }}
        >
          Your Style.
          <br />
          <span className="italic text-gold">Your Fit.</span> Your Story.
        </h1>
        <p
          className="animate-fade-up mt-8 max-w-2xl text-base leading-relaxed text-ivory/85 sm:text-lg"
          style={{ animationDelay: "0.2s" }}
        >
          Premium made-to-order clothing crafted to your exact measurements and taste.
          From everyday elegance to once-in-a-lifetime occasions.
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "0.3s" }}
        >
          <a
            href="#categories"
            className="rounded-full bg-burgundy px-8 py-3.5 text-sm font-semibold text-ivory shadow-lg shadow-black/30 transition-transform hover:scale-105"
          >
            Explore Categories
          </a>
          <a
            href="#how"
            className="rounded-full border-2 border-gold bg-transparent px-8 py-3.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-charcoal"
          >
            How It Works
          </a>
        </div>
        <button
          aria-label="Scroll down"
          onClick={() =>
            document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" })
          }
          className="animate-bounce-down absolute bottom-8 left-1/2 -translate-x-1/2 text-gold"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
}

/* ----------------------------- Categories ------------------------------ */

const categories = [
  { name: "Men's Wear", subtitle: "Shirts, Suits, Kurtas, Sherwanis & more", img: catMen, key: "Men's" },
  { name: "Women's Wear", subtitle: "Salwar suits, Kurtis, Blouses, Dresses & more", img: catWomen, key: "Women's" },
  { name: "Kids' Wear", subtitle: "Frocks, Shirts, Ethnic sets & more", img: catKids, key: "Kids" },
  { name: "Bridal Wear", subtitle: "Lehengas, Bridal sarees, Gowns & more", img: catBridal, key: "Bridal" },
  { name: "Ethnic Wear", subtitle: "Sarees, Kurta sets, Anarkalis & more", img: catEthnic, key: "Ethnic" },
  { name: "Party Wear", subtitle: "Indo-western, Cocktail dresses, Gowns & more", img: catParty, key: "Party" },
];

function Categories({ onOrder }: { onOrder: (cat?: string) => void }) {
  return (
    <section id="categories" className="bg-ivory px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Collections"
          title="Shop by Category"
          subtitle="Every piece crafted with precision, just for you."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => onOrder(c.key)}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl text-left shadow-lg shadow-black/10 transition-shadow hover:shadow-2xl hover:shadow-burgundy/20"
            >
              <img
                src={c.img}
                alt={c.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="font-display text-3xl font-bold text-ivory sm:text-4xl">{c.name}</h3>
                <p className="mt-2 text-sm text-ivory/80">{c.subtitle}</p>
                <span className="mt-5 inline-flex translate-y-2 items-center gap-2 rounded-full bg-gold px-5 py-2 text-xs font-semibold uppercase tracking-wider text-charcoal opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Customise Now <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ How It Works ------------------------------ */

const steps = [
  { n: "01", icon: Sparkles, title: "Choose Your Style", desc: "Browse categories and pick your outfit type." },
  { n: "02", icon: PenTool, title: "Share Your Details", desc: "Fill in measurements, fabric, and design preferences." },
  { n: "03", icon: Scissors, title: "We Craft It", desc: "Our master tailors bring your vision to life." },
  { n: "04", icon: Package, title: "Delivered to You", desc: "Your custom outfit delivered to your doorstep." },
];

function HowItWorks() {
  return (
    <section id="how" className="bg-ivory-soft px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="The Process" title="How It Works" subtitle="Simple steps to your perfect outfit." />
        <div className="relative mt-16">
          <div className="absolute left-1/2 top-12 hidden h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="relative flex flex-col items-center text-center">
                <div className="relative z-10 grid h-24 w-24 place-items-center rounded-full border-2 border-gold bg-ivory shadow-lg shadow-burgundy/10">
                  <s.icon className="h-9 w-9 text-burgundy" />
                </div>
                <span className="mt-5 font-display text-3xl font-bold text-gold">{s.n}</span>
                <h3 className="mt-2 text-lg font-semibold text-charcoal">{s.title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Why Choose Us ------------------------------ */

const features = [
  { icon: Target, title: "100% Custom Fit", desc: "Every outfit stitched to your exact measurements." },
  { icon: Sparkles, title: "Premium Fabrics", desc: "Carefully sourced materials from trusted mills." },
  { icon: Zap, title: "Quick Turnaround", desc: "Most orders ready within 7–10 business days." },
  { icon: PenTool, title: "Design Consultation", desc: "Our experts help you pick the perfect design." },
  { icon: RefreshCw, title: "Alterations Included", desc: "Free alterations if the fit isn't perfect." },
  { icon: Package, title: "Pan-India Delivery", desc: "Fast, secure shipping to your doorstep." },
];

function WhyUs() {
  return (
    <section id="why" className="bg-ivory-soft px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Our Promise"
          title="Why Choose Stitch & Style?"
          subtitle="Where quality meets craftsmanship."
        />
        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border-2 border-transparent bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:border-burgundy/40 hover:shadow-xl hover:shadow-burgundy/10"
            >
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-burgundy/5 text-gold transition-colors group-hover:bg-burgundy group-hover:text-gold">
                <f.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-semibold text-charcoal">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Testimonials ----------------------------- */

const testimonials = [
  {
    name: "Priya Sharma",
    city: "Mumbai",
    quote:
      "My bridal lehenga was beyond perfect. The fit, the colours, the embroidery — everything was exactly how I imagined. I felt like royalty on my wedding day.",
    initials: "PS",
  },
  {
    name: "Arjun Mehta",
    city: "Delhi",
    quote:
      "Got a bandhgala suit stitched for my sister's wedding. The attention to detail and the fit were unmatched. Will definitely order again.",
    initials: "AM",
  },
  {
    name: "Ananya Iyer",
    city: "Bengaluru",
    quote:
      "I've ordered three kurtis so far and each one fits like a dream. The fabric quality is incredible for the price. Highly recommend!",
    initials: "AI",
  },
];

function Testimonials() {
  return (
    <section className="bg-ivory px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Reviews" title="What Our Customers Say" subtitle="Stories stitched into every order." />
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm"
            >
              <div className="flex gap-1 text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold" />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 font-display text-lg italic leading-relaxed text-charcoal">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-burgundy text-sm font-semibold text-gold">
                  {t.initials}
                </span>
                <div>
                  <div className="text-sm font-semibold text-charcoal">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.city}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Contact -------------------------------- */

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="bg-ivory-soft px-6 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Say Hello" title="Get in Touch" subtitle="We'd love to hear from you." />
        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <ul className="space-y-6">
              {[
                { icon: MapPin, label: "Address", value: "12, MG Road, Bengaluru, Karnataka — 560001" },
                { icon: Phone, label: "Phone", value: "+91 98765 43210" },
                { icon: Mail, label: "Email", value: "orders@stitchandstyle.in" },
                { icon: Clock, label: "Working Hours", value: "Mon – Sat, 10 AM – 7 PM" },
              ].map((c) => (
                <li key={c.label} className="flex gap-4">
                  <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-burgundy text-gold">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">{c.label}</div>
                    <div className="mt-1 text-base font-medium text-charcoal">{c.value}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Follow Us</div>
              <div className="mt-3 flex gap-3">
                {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="social"
                    className="grid h-11 w-11 place-items-center rounded-full border border-gold text-gold transition-colors hover:bg-gold hover:text-charcoal"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              (e.target as HTMLFormElement).reset();
              setTimeout(() => setSent(false), 4000);
            }}
            className="rounded-2xl border border-border bg-card p-8 shadow-sm"
          >
            <div className="space-y-4">
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Message" name="message" textarea required />
            </div>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-burgundy px-6 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-burgundy-deep"
            >
              Send Message
            </button>
            {sent && (
              <p className="mt-4 rounded-md bg-gold/15 px-3 py-2 text-sm text-burgundy">
                Thanks — we'll get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Footer --------------------------------- */

function Footer() {
  return (
    <footer className="bg-[#1E1E1E] px-6 py-14 text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-burgundy text-gold">
              <Scissors className="h-5 w-5" />
            </span>
            <span className="font-display text-xl font-bold">
              Stitch <span className="text-gold">&</span> Style
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-ivory/60">Crafted for You. Made to Last.</p>
        </div>
        <nav className="flex flex-wrap justify-center gap-6 text-sm">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="text-ivory/80 hover:text-gold">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex justify-start gap-3 md:justify-end">
          {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
            <a
              key={i}
              href="#"
              aria-label="social"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-charcoal"
            >
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

/* ----------------------------- Form components ---------------------------- */

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</span>
      <h2 className="mt-3 font-display text-4xl font-bold text-charcoal sm:text-5xl">{title}</h2>
      <p className="mt-4 text-base text-muted-foreground">{subtitle}</p>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  children,
  ...rest
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  children?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const baseCls =
    "w-full rounded-md border border-input bg-ivory px-3.5 py-2.5 text-sm text-charcoal outline-none transition-colors placeholder:text-muted-foreground focus:border-gold focus:ring-2 focus:ring-gold/30";
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-burgundy">*</span>}
      </span>
      {children ? (
        children
      ) : textarea ? (
        <textarea name={name} required={required} rows={4} className={baseCls} />
      ) : (
        <input name={name} type={type} required={required} className={baseCls} {...rest} />
      )}
    </label>
  );
}

/* ------------------------------- Order Modal ------------------------------ */

function OrderModal({
  open,
  onClose,
  defaultCategory,
}: {
  open: boolean;
  onClose: () => void;
  defaultCategory?: string;
}) {
  const [submitted, setSubmitted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const selectCls =
    "w-full rounded-md border border-input bg-ivory px-3.5 py-2.5 text-sm text-charcoal outline-none focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={dialogRef}
        className="animate-fade-up relative max-h-[95vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-ivory shadow-2xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-ivory/95 px-6 py-4 backdrop-blur">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-gold">New Order</div>
            <h3 className="font-display text-2xl font-bold text-charcoal">Place Your Custom Order</h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center rounded-full text-charcoal hover:bg-ivory-soft"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="px-8 py-16 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gold/20 text-gold">
              <Sparkles className="h-8 w-8" />
            </div>
            <h4 className="mt-5 font-display text-3xl font-bold text-burgundy">Thank you!</h4>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              We'll contact you within 24 hours to confirm your order and walk you through the next steps.
            </p>
            <button
              onClick={onClose}
              className="mt-8 rounded-full bg-burgundy px-8 py-3 text-sm font-semibold text-ivory hover:bg-burgundy-deep"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="px-6 py-6 sm:px-8"
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" name="name" required />
              <Field
                label="Phone Number"
                name="phone"
                type="tel"
                required
                pattern="[0-9+\-\s]{7,15}"
                placeholder="+91 98765 43210"
              />
              <div className="sm:col-span-2">
                <Field label="Email Address" name="email" type="email" required />
              </div>
              <Field label="Category" name="category" required>
                <select
                  name="category"
                  required
                  defaultValue={defaultCategory ?? ""}
                  className={selectCls}
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  {["Men's", "Women's", "Kids", "Bridal", "Ethnic", "Party"].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Outfit Type" name="outfit" required placeholder="e.g. Sherwani, Lehenga" />
              <Field label="Occasion" name="occasion" placeholder="e.g. Wedding, Festival" />
              <Field label="Fabric Preference" name="fabric" placeholder="e.g. Silk, Cotton" />
              <div className="sm:col-span-2">
                <Field label="Color / Design Notes" name="design" textarea />
              </div>
              <div className="sm:col-span-2">
                <Field
                  label="Measurements"
                  name="measurements"
                  textarea
                  required
                  placeholder="Chest, Waist, Hip, Height, etc."
                />
              </div>
              <Field label="Reference Image" name="reference">
                <input
                  type="file"
                  name="reference"
                  accept="image/*"
                  className="block w-full text-sm text-charcoal file:mr-3 file:rounded-full file:border-0 file:bg-burgundy file:px-4 file:py-2 file:text-xs file:font-semibold file:text-ivory hover:file:bg-burgundy-deep"
                />
              </Field>
              <Field label="Preferred Delivery Date" name="date" type="date" />
              <Field label="Budget Range" name="budget" required>
                <select name="budget" required defaultValue="" className={selectCls}>
                  <option value="" disabled>
                    Select budget
                  </option>
                  <option>Under ₹2,000</option>
                  <option>₹2,000 – ₹5,000</option>
                  <option>₹5,000 – ₹10,000</option>
                  <option>₹10,000+</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Additional Notes" name="notes" textarea />
              </div>
            </div>

            <button
              type="submit"
              className="mt-7 w-full rounded-full bg-burgundy px-6 py-4 text-sm font-semibold uppercase tracking-wider text-ivory shadow-lg shadow-burgundy/30 transition-all hover:bg-burgundy-deep hover:shadow-xl"
            >
              Submit My Order
            </button>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              By submitting, you agree to be contacted about your order.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

function Home() {
  const [orderOpen, setOrderOpen] = useState(false);
  const [presetCategory, setPresetCategory] = useState<string | undefined>();

  const openOrder = (cat?: string) => {
    setPresetCategory(cat);
    setOrderOpen(true);
  };

  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar onOrder={() => openOrder()} />
      <main>
        <Hero onOrder={() => openOrder()} />
        <Categories onOrder={openOrder} />
        <HowItWorks />
        <WhyUs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <OrderModal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        defaultCategory={presetCategory}
      />
    </div>
  );
}

import React from "react";
import { motion } from "framer-motion";
import {
  Code2,
  ShoppingCart,
  LaptopMinimal,
  Wrench,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  CalendarCheck,
} from "lucide-react";

// ----------
// Portfolio Freelance – Single-file React component
// Stack: React + TailwindCSS + Framer Motion + Lucide Icons
// Place this as src/App.jsx (or any route). Ensure Tailwind is configured.
// ----------

const container = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const SectionTitle = ({ kicker, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
    {kicker && (
      <motion.p
        variants={container}
        className="uppercase tracking-wider text-sm text-neutral-500"
      >
        {kicker}
      </motion.p>
    )}
    <motion.h2
      variants={container}
      className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        variants={container}
        className="mt-3 text-neutral-600 leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const Nav = () => (
  <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-neutral-200">
    <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#home" className="font-semibold text-lg tracking-tight">Karlsefni.dev</a>
      <div className="hidden md:flex items-center gap-6 text-sm">
        <a href="#services" className="hover:text-neutral-900 text-neutral-600">Services</a>
        <a href="#portfolio" className="hover:text-neutral-900 text-neutral-600">Portfolio</a>
        <a href="#about" className="hover:text-neutral-900 text-neutral-600">À propos</a>
        <a href="#contact" className="hover:text-neutral-900 text-neutral-600">Contact</a>
      </div>
      <a
        href="#contact"
        className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white text-sm px-4 py-2 shadow-sm hover:opacity-90"
      >
        Discutons de votre projet <ArrowRight size={16} />
      </a>
    </nav>
  </header>
);

const Hero = () => (
  <section id="home" className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-neutral-50" />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-10 items-center"
      >
        <motion.div variants={container}>
          <p className="uppercase tracking-wider text-xs text-neutral-500 mb-3">
            Développeur Web Freelance
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-neutral-900">
            Je crée des sites <span className="underline decoration-4 decoration-neutral-900">modernes</span>
            {" "}et performants pour PME et indépendants.
          </h1>
          <p className="mt-5 text-neutral-600 max-w-xl">
            Sites vitrines, e‑commerce, applications de réservation. Du pixel au déploiement,
            je conçois des expériences rapides, claires et orientées conversion.
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-5 py-3 text-sm shadow-sm hover:opacity-90"
            >
              Discutons de votre projet <ArrowRight size={18} />
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 px-5 py-3 text-sm hover:bg-neutral-50"
            >
              Voir mes projets
            </a>
          </div>
          <div className="mt-8 flex items-center gap-4 text-sm text-neutral-500">
            <div className="flex items-center gap-2"><CheckCircle2 size={18}/>Sites rapides</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={18}/>SEO friendly</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={18}/>Responsive</div>
          </div>
        </motion.div>
        <motion.div
          variants={container}
          className="relative h-56 sm:h-72 md:h-96 rounded-3xl bg-gradient-to-tr from-neutral-900 to-neutral-700"
        >
          <div className="absolute inset-0 rounded-3xl opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_35%),radial-gradient(circle_at_70%_70%,white,transparent_35%)]"/>
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-3">
            {[
              { label: "React", value: "Vite + Tailwind" },
              { label: "E‑commerce", value: "Stripe/Checkout" },
              { label: "SEO", value: "Meta + Sitemap" },
            ].map((chip, i) => (
              <div key={i} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur text-white p-3">
                <p className="text-xs uppercase tracking-wide opacity-80">{chip.label}</p>
                <p className="text-sm font-medium">{chip.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const Services = () => {
  const items = [
    {
      icon: LaptopMinimal,
      title: "Site vitrine",
      desc:
        "Présentez votre activité avec un site clair et rapide orienté conversion (contact, prise de rendez‑vous).",
      price: "À partir de 900€",
    },
    {
      icon: ShoppingCart,
      title: "E‑commerce",
      desc:
        "Vendez en ligne avec gestion produits, paiements sécurisés, taxes et shipping. Formation incluse.",
      price: "À partir de 1900€",
    },
    {
      icon: CalendarCheck,
      title: "Apps sur mesure",
      desc:
        "Réservation, agenda, back‑office… Développement d'applications web adaptées à vos besoins.",
      price: "Sur devis",
    },
    {
      icon: Wrench,
      title: "Maintenance & optimisation",
      desc:
        "Mises à jour, correctifs, performances, SEO technique, audit Lighthouse et plan d'action.",
      price: "À partir de 120€/mois",
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="Services"
          title="Des offres claires, pensées pour les petites entreprises"
          subtitle="Je vous aide à lancer ou moderniser votre présence en ligne avec des packs simples et efficaces."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {items.map(({ icon: Icon, title, desc, price }) => (
            <motion.div
              key={title}
              variants={container}
              className="rounded-2xl border border-neutral-200 p-5 hover:shadow-sm transition-shadow"
            >
              <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white grid place-content-center mb-4">
                <Icon size={22} />
              </div>
              <h3 className="font-semibold text-neutral-900">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{desc}</p>
              <p className="mt-4 text-sm font-medium text-neutral-900">{price}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "Plateforme de prise de rendez‑vous",
      image:
        "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1480&auto=format&fit=crop",
      need: "Réservation en ligne, gestion d'agenda",
      solution:
        "App web avec calendrier synchronisé, formulaires, notifications e‑mail, panneau d'admin.",
      tags: ["React", "API Platform", "Tailwind"],
      link: "#",
    },
    {
      title: "Boutique e‑commerce artisanale",
      image:
        "https://images.unsplash.com/photo-1515165562835-c3b8c1e0b6c6?q=80&w=1480&auto=format&fit=crop",
      need: "Vendre en ligne simplement",
      solution:
        "Catalogue, panier, checkout sécurisé, gestion produits via back‑office.",
      tags: ["React", "Stripe", "Headless CMS"],
      link: "#",
    },
    {
      title: "Site vitrine pour indépendant",
      image:
        "https://images.unsplash.com/photo-1529336953121-a0ce66f9c5fa?q=80&w=1480&auto=format&fit=crop",
      need: "Présenter l'activité et convertir",
      solution:
        "Landing claire, référencement de base, formulaire de contact + suivi analytics.",
      tags: ["Vite", "Tailwind", "SEO"],
      link: "#",
    },
  ];

  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-neutral-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          kicker="Portfolio"
          title="Projets réalisés"
          subtitle="Une sélection courte. Chaque projet répond à un besoin précis avec une solution simple et efficace."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.a
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              key={p.title}
              href={p.link}
              className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white hover:shadow-sm"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-neutral-900">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  <span className="font-medium text-neutral-800">Besoin : </span>
                  {p.need}
                </p>
                <p className="mt-1 text-sm text-neutral-600">
                  <span className="font-medium text-neutral-800">Solution : </span>
                  {p.solution}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="text-xs rounded-full border border-neutral-300 px-2 py-1">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-16 sm:py-24 bg-white">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        kicker="À propos"
        title="Fiable, moderne, orienté client"
        subtitle="Formé à la Web@cademie, je me spécialise dans la création de sites vitrines et e‑commerce adaptés aux besoins des petites entreprises. Mon approche est simple : comprendre votre activité, livrer vite, et optimiser ce qui compte (vitesse, SEO, conversion)."
      />

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <ul className="space-y-3 text-neutral-700">
            {[
              "Communication claire, jalons et livrables hebdomadaires",
              "Code propre (React, Tailwind, bonnes pratiques)",
              "Performances mesurées (Lighthouse, Core Web Vitals)",
              "Déploiement continu (Vercel/Netlify)",
            ].map((line) => (
              <li key={line} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5" size={20} />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-3xl border border-neutral-200 p-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white grid place-content-center">
              <Code2 />
            </div>
            <div>
              <p className="text-sm text-neutral-500">Stack</p>
              <p className="font-medium">React, TailwindCSS, API Platform, Stripe</p>
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm">
            <div className="rounded-xl border border-neutral-200 p-4">
              <p className="text-neutral-500">Focus</p>
              <p className="font-medium">Sites vitrines & e‑commerce</p>
            </div>
            <div className="rounded-xl border border-neutral-200 p-4">
              <p className="text-neutral-500">Dispo</p>
              <p className="font-medium">Ouvert aux nouveaux projets</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-12 sm:py-16 bg-neutral-900 text-white">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 text-center">
        <p className="text-lg font-medium">
          Disponible pour de nouveaux projets —
          <span className="opacity-90"> le premier client bénéficiera d’un tarif préférentiel.</span>
        </p>
        <div className="mt-5">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-5 py-3 text-sm font-medium hover:opacity-90"
          >
            Parlez‑moi de votre projet <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact" className="py-16 sm:py-24 bg-white">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionTitle
        kicker="Contact"
        title="Parlons de votre projet"
        subtitle="Réponse sous 24h ouvrées. Je peux faire un rapide audit gratuit et vous proposer une feuille de route."
      />

      <div className="grid md:grid-cols-2 gap-8">
        <form
          // Remplacez l'URL Formspree ci-dessous par la vôtre ou branchez votre backend (EmailJS/Symfony API)
          action="https://formspree.io/f/your-id-here"
          method="POST"
          className="rounded-2xl border border-neutral-200 p-6"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-neutral-600">Nom</label>
              <input
                type="text"
                name="name"
                required
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
            <div>
              <label className="text-sm text-neutral-600">Email</label>
              <input
                type="email"
                name="email"
                required
                className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900"
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm text-neutral-600">Message</label>
            <textarea
              name="message"
              rows="5"
              required
              className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900"
              placeholder="Décrivez votre besoin en quelques lignes…"
            />
          </div>
          <button
            type="submit"
            className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white px-5 py-3 text-sm hover:opacity-90"
          >
            Envoyer <Mail size={18} />
          </button>
          <p className="mt-3 text-xs text-neutral-500">
            En envoyant ce formulaire, vous acceptez d'être recontacté par email.
          </p>
        </form>

        <div className="rounded-2xl border border-neutral-200 p-6">
          <h3 className="font-semibold text-neutral-900">Contact direct</h3>
          <p className="mt-2 text-neutral-600 text-sm">
            Préférez un email direct ou un message LinkedIn/GitHub.
          </p>
          <div className="mt-4 flex flex-col gap-3">
            <a href="mailto:hello@karlsefni.dev" className="inline-flex items-center gap-2 hover:opacity-80">
              <Mail size={18} /> hello@karlsefni.dev
            </a>
            <a href="https://github.com/your-username" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-80">
              <Github size={18} /> github.com/your-username
            </a>
            <a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-80">
              <Linkedin size={18} /> linkedin.com/in/your-username
            </a>
          </div>
          <div className="mt-6 rounded-xl border border-neutral-200 p-4">
            <p className="text-sm text-neutral-600">
              Stack recommandée : <span className="font-medium">React + TailwindCSS</span> · Déploiement :
              <span className="font-medium"> Vercel ou Netlify</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-neutral-200 py-10 bg-white">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-neutral-600">© {new Date().getFullYear()} Karlsefni.dev — Tous droits réservés.</p>
        <div className="flex items-center gap-5 text-neutral-600">
          <a href="#home" className="hover:text-neutral-900">Accueil</a>
          <a href="#services" className="hover:text-neutral-900">Services</a>
          <a href="#portfolio" className="hover:text-neutral-900">Portfolio</a>
          <a href="#contact" className="hover:text-neutral-900">Contact</a>
        </div>
      </div>
      <p className="mt-4 text-xs text-neutral-500">SIRET / Mentions légales minimales ici.</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <main className="font-sans text-neutral-900">
      <Nav />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import emailjs from "@emailjs/browser";

// Assets (place these files in src/assets)
import BookingVideo from "./assets/Booking.mp4";
import BookingPoster from "./assets/Booking_poster.png";
import HospitalVideo from "./assets/Hospital.mp4";
import HospitalPoster from "./assets/Hospital_poster.png";
import MyoptiqueVideo from "./assets/Myoptique.mp4";
import MyoptiquePoster from "./assets/Myoptique_poster.png";
import ParfumerieVideo from "./assets/Parfumerie.mp4";
import ParfumeriePoster from "./assets/Parfumerie_poster.png";
import BudgetVideo from "./assets/Budget.mp4";
import BudgetPoster from "./assets/Budget_poster.png";
import AutomatisationVideo from "./assets/Automatisation.mp4";
import AutomatisationPoster from "./assets/Automatisation_poster.png";
import NextAyahVideo from "./assets/NextAyah.mp4";
import NextAyahPoster from "./assets/NextAyah_poster.png";
import HotelDemoImg from "./assets/hotel_demo.png";
import ImmoDemoImg from "./assets/immo_demo.png";

import {
  Code2,
  ShoppingCart,
  Laptop,
  Wrench,
  ArrowRight,
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  CalendarCheck,
  Sun,
  Moon,
  Globe,
  X,
  Play,
} from "lucide-react";
import PortfolioCarousel from "./components/PortfolioCarousel";

// ------------------------------------------------------
// Portfolio Freelance – React + Tailwind + Framer Motion
// + EmailJS (form), Dark Mode Toggle, FR/EN i18n, SEO meta per lang
// Modal for projects (video + screenshot behavior)
// Updated: EmailJS init + verbose logs for debugging
// Drop this file in src/App.jsx (Vite project)
// ------------------------------------------------------

const container = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

// i18n dictionary (titles, descriptions, and projects include imported assets)
const i18n = {
  fr: {
    brand: "Karlsefni",
  nav: { home: "Accueil", services: "Services", portfolio: "Portfolio", about: "À propos", contact: "Contact" },
    cta_primary: "Discutons de votre projet",
    hero_badge: "Développeur Web Freelance",
    hero_title_1: "Je crée des sites ",
    hero_title_em: "modernes",
    hero_title_2: " et performants pour PME et indépendants.",
    hero_sub: "Sites vitrines, e‑commerce, applications de réservation. Du pixel au déploiement, je conçois des expériences rapides, claires et orientées conversion.",
    hero_browse: "Voir mes projets",
    chips: [
      { label: "React", value: "Vite + Tailwind" },
      { label: "Symfony", value: "API / Back‑end" },
      { label: "E‑commerce", value: "Stripe" },
      { label: "SEO", value: "Meta + Sitemap" },
    ],
    bullet_fast: "Sites rapides",
    bullet_seo: "SEO friendly",
    bullet_resp: "Responsive",

    services_kicker: "Services",
    services_title: "Des services clairs, pensés pour les petites entreprises",
    services_sub: "Je vous aide à lancer ou moderniser votre présence en ligne. Tout est sur devis, sauf la maintenance.",
    service_cards: [
      { icon: "vitrine", type: "Vitrine", title: "Site vitrine", desc: "Présentez votre activité avec un site clair et rapide orienté conversion (contact, prise de rendez‑vous).", price: "Sur devis" },
      { icon: "ecom", type: "E‑commerce", title: "E‑commerce", desc: "Vendez en ligne avec gestion produits, paiements sécurisés, taxes et shipping. Formation incluse.", price: "Sur devis" },
      { icon: "apps", type: "Application sur mesure", title: "Apps sur mesure", desc: "Réservation, agenda, back‑office… Développement d'applications web adaptées à vos besoins.", price: "Sur devis" },
      { icon: "maint", type: "Maintenance", title: "Maintenance & optimisation", desc: "Mises à jour, correctifs, performances, SEO technique, audit Lighthouse et plan d'action.", price: "À partir de 120€/mois" },
    ],

    portfolio_kicker: "Portfolio",
    portfolio_title: "Projets réalisés",
    portfolio_sub: "Une sélection courte. Chaque projet répond à un besoin précis avec une solution simple et efficace.",
    // Latest works section
    latest_kicker: "Nouveau",
    latest_title: "Mes dernières réalisations",
    latest_sub: "Deux démos récentes hébergées en ligne.",
    view_site: "Voir le site",
    latest_items: [
      {
        id: "hotel-demo",
        title: "Démo site de réservation d'hôtel",
        desc: "Page d'accueil avec barre de recherche (dates, personnes) et mise en avant des chambres.",
        url: "https://karlsefni-hotel.vercel.app/",
        img: HotelDemoImg,
      },
      {
        id: "immo-demo",
        title: "Démo site d'agence immobilière",
        desc: "Hero avec formulaire de recherche (ville, type, budget) et CTA estimation.",
        url: "https://karlsefni-immobilier.vercel.app/",
        img: ImmoDemoImg,
      },
    ],
    projects: [
      // Ligne 1 (à afficher en premier)
      {
        id: "parfumerie",
        title: "Boutique e‑commerce : Parfumerie",
        image: "https://images.unsplash.com/photo-1515165562835-c3b8c1e0b6c6?q=80&w=1480&auto=format&fit=crop",
        need: "Vendre des parfums en ligne avec une expérience d'achat fluide",
        solution: "Boutique e‑commerce avec catalogue, fiches produits, panier et tunnel de commande. Vidéo de démonstration incluse.",
        tags: ["React", "Tailwind", "E‑commerce"],
        video: ParfumerieVideo,
        poster: ParfumeriePoster,
        link: "#",
      },
      {
        id: "ecom",
        title: "Myoptique : Boutique e‑commerce",
        image: "https://images.unsplash.com/photo-1515165562835-c3b8c1e0b6c6?q=80&w=1480&auto=format&fit=crop",
        need: "Vendre en ligne avec un parcours d'achat simple",
        solution: "Catalogue produits, panier, paiement sécurisé, gestion via back‑office. Back‑end : Symfony + Stripe.",
        tags: ["React", "Symfony", "Stripe"],
        video: MyoptiqueVideo,
        poster: MyoptiquePoster,
        link: "#",
      },
      {
        id: "nextayah",
        title: "NextAyah : Compagnon islamique",
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1480&auto=format&fit=crop",
        need: "Réviser et mémoriser ses sourates facilement sur mobile et PC",
        solution: "Compagnon islamique disponible sur mobile et ordinateur pour réviser les sourates avec une interface simple, fluide et adaptée au quotidien.",
        tags: ["React", "Mobile", "Desktop"],
        video: NextAyahVideo,
        poster: NextAyahPoster,
        link: "#",
      },
      {
        id: "automatisation",
        title: "Automatisation : Outils intelligents",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1480&auto=format&fit=crop",
        need: "Automatiser la prospection commerciale en ciblant des departements precis",
        solution: "Site d'automatisation pour la prospection avec recherche automatique de sites selon le ou les departements selectionnes, afin de trouver des prospects qualifies plus rapidement.",
        tags: ["React", "Automation", "Dashboard"],
        video: AutomatisationVideo,
        poster: AutomatisationPoster,
        link: "#",
      },
      // Ligne 2
      {
        id: "budget",
        title: "Application de gestion de budget",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1480&auto=format&fit=crop",
        need: "Suivi des dépenses et gestion budgétaire personnelle",
        solution: "Application web permettant de créer des budgets et suivre les dépenses. Back‑end : Symfony + MySQL.",
        tags: ["React", "Symfony", "MySQL"],
        video: BudgetVideo,
        poster: BudgetPoster,
        link: "https://hess-cej.vercel.app/",
      },
      {
        id: "hospital",
        title: "Centre de santé : Guinée",
        image: "https://images.unsplash.com/photo-1529336953121-a0ce66f9c5fa?q=80&w=1480&auto=format&fit=crop",
        need: "Présenter l'activité, gestion rendez‑vous patients",
        solution: "Site pour un centre de santé (Symfony + React). Projet en cours.",
        tags: ["Symfony", "React", "Tailwind"],
        video: HospitalVideo,
        poster: HospitalPoster,
        link: "#",
      },
      {
        id: "booking",
        title: "Plateforme de prise de rendez‑vous",
        image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1480&auto=format&fit=crop",
        need: "Réservation en ligne, gestion d'agenda",
        solution: "App web avec calendrier synchronisé, Formulaires, Notifications e‑mail, Panneau d'admin. Back‑end : Symfony.",
        tags: ["React", "Symfony", "Tailwind"],
        video: BookingVideo,
        poster: BookingPoster,
  capture: ["/src/assets/screen 1 booking.png", "/src/assets/screen 2 booking.png"],
        link: "#",
      },
    ],

    about_kicker: "À propos",
    about_title: "Fiable, moderne, orienté client",
  about_sub: "Je m'appelle Bafodé Cissé, j'ai 23 ans. Formé à Epitech, je me spécialise dans la création de sites vitrines et e‑commerce adaptés aux besoins des petites entreprises. J'ai créé Karlsefni afin de mettre à profit mes compétences dans un meilleur environnement. Mon approche est simple : comprendre votre activité, livrer rapidement et optimiser ce qui compte (vitesse, SEO, conversion).",
    about_points: [
      "Communication claire, jalons et livrables hebdomadaires",
      "Code propre (React, Tailwind, bonnes pratiques)",
      "Performances mesurées (Lighthouse, Core Web Vitals)",
      "Déploiement continu (Vercel/Netlify)",
    ],
    stack_label: "Stack",
    stack_value: "React, Symfony, TailwindCSS, API Platform, Stripe",
    focus_label: "Focus",
    focus_value: "Sites vitrines & e‑commerce",
    availability_label: "Dispo",
    availability_value: "Ouvert aux nouveaux projets",

    banner_text: "Disponible pour de nouveaux projets",
    banner_note: "",
    banner_btn: "Parlez‑moi de votre projet",

    trust_kicker: "Recommandations",
    trust_title: "Ils m'ont fait confiance",
    trust_sub: "Quelques retours de clients et collaborateurs.",
    trust_items: [
      {
        id: "ayoub-nefzi",
        name: "Ayoub Nefzi",
        meta: "Consultant recrutement Freelance",
        src: "/trust/ayoub-nefzi.png",
        alt: "Recommandation LinkedIn d'Ayoub Nefzi",
        quote:
          "Je recommande vivement Bafodé pour son excellent travail sur mon site web. Professionnel, à l'écoute et force de proposition, il a livré un résultat de grande qualité, parfaitement conforme à mes attentes. Son expertise technique en développement web, alliée à une vraie rigueur et un sens du détail, garantit un résultat de grande qualité.",
      },
      {
        id: "souleymane-bah",
        name: "Souleymane BAH",
        meta: "Sies‑InserSup",
        src: "/trust/souleymane-bah.png",
        alt: "Recommandation de Souleymane BAH",
        quote:
          "J’ai vraiment apprécié travailler avec toi sur ce projet. Ton suivi régulier du versioning, ta bonne compréhension du cahier des charges et des attentes, ainsi que ta maîtrise de Docker pour le déploiement ont fait une vraie différence. Merci pour ton travail et ta bonne humeur. Ravi d’avoir collaboré avec toi !",
      },
    ],

    offers_kicker: "Offres",
    offers_title: "Packs clefs en main",
    offers_sub: "Des packs pensés pour lancer ou développer votre activité en ligne rapidement.",
    packs: {
      pack_presence: {
        title: "💻 Pack Présence",
        price: "900 €",
        desc: "Idéal pour coachs, indépendants et petites entreprises qui veulent une vitrine professionnelle.",
        bullets: [
          "Site vitrine jusqu’à 3 pages (Accueil, Services, Contact)",
          "Design moderne et responsive (ordinateur + mobile)",
          "Formulaire de contact et intégration Google Maps",
          "Optimisation SEO basique (Google, vitesse de chargement)",
          "Livraison en 7–10 jours",
          "Bonus : 1 série de corrections incluse.",
        ],
      },
      pack_rdv: {
        title: "📅 Pack Rendez-vous",
        price: "1 600 €",
        desc: "Parfait pour coachs, consultants et formateurs qui veulent gérer leurs rendez-vous en ligne.",
        bullets: [
          "Site complet jusqu’à 5 pages (Accueil, À propos, Services, FAQ, Contact)",
          "Intégration calendrier en ligne (Calendly, Google Agenda)",
          "CMS simple (vous pouvez changer vos textes et images)",
          "Optimisation SEO et performance",
          "Livraison en 10–14 jours",
          "Bonus : 2 séries de corrections incluses.",
        ],
      },
      pack_premium: {
        title: "🛒 Pack Premium",
        price: "2 800 €",
        desc: "Pour indépendants et petites entreprises qui veulent vendre directement en ligne.",
        bullets: [
          "Site complet (jusqu’à 7 pages)",
          "Intégration boutique (paiement en ligne par Stripe/PayPal)",
          "Espace client simple (connexion + gestion commandes / rendez-vous)",
          "Blog ou espace actualités pour publier du contenu",
          "Formation rapide pour utiliser le site",
          "Livraison en 2–4 semaines",
          "Bonus : 3 séries de corrections incluses.",
        ],
      },
      payment_terms: "Modalités de paiement : 30% à la signature, 40% à mi-parcours, 30% à la livraison.",
  engagement: "Engagement : livraison rapide, communication claire, accompagnement jusqu’à la mise en ligne.",
      corrections_def: "Chaque série de corrections incluse vous permet de demander un ensemble de modifications regroupées après une livraison. Cela garantit que votre site correspond parfaitement à vos attentes tout en respectant des délais rapides.",
    },

    contact_kicker: "Contact",
    contact_title: "Parlons de votre projet",
    contact_sub: "Réponse sous 24h ouvrées. Audit rapide et gratuit. Suivi assuré.",
    form_name: "Nom",
    form_email: "Email",
    form_message: "Message",
    form_placeholder: "Décrivez votre besoin en quelques lignes…",
    form_submit: "Envoyer",
    consent: "En envoyant ce formulaire, vous acceptez d'être recontacté par email.",
    direct_contact: "Contact direct",
    direct_pref: "Vous pouvez aussi me joindre directement par e‑mail ou via LinkedIn/GitHub.",

    footer_legal: "SIRET : 990 412 496 00012",

    sending: "Envoi…",
    sent_ok: "Message envoyé ! Je vous réponds dans les plus brefs délais.",
    sent_ko: "Échec de l'envoi. Réessayez ou écrivez‑moi directement.",

    theme_label: "Théme",
    lang_label: "Langue",

    seo_title: "Bafodé Cissé – Développeur Web Freelance (React & Symfony)",
    seo_desc: "Bafodé Cissé : Développeur Web Freelance spécialisé en React & Symfony. Sites vitrines, e‑commerce et applications sur mesure.",
    og_locale: "fr_FR",
  },

  en: {
    brand: "Karlsefni",
  nav: { home: "Home", services: "Services", portfolio: "Work", about: "About", contact: "Contact" },
    cta_primary: "Let's discuss your project",
    hero_badge: "Freelance Web Developer",
    hero_title_1: "I build ",
    hero_title_em: "modern",
    hero_title_2: " and fast websites for small businesses and solo founders.",
    hero_sub: "Showcase sites, e‑commerce, booking apps. From pixel to production, I craft fast, clear, conversion‑oriented experiences.",
    hero_browse: "See my work",
    chips: [
      { label: "React", value: "Vite + Tailwind" },
      { label: "Symfony", value: "API / Back‑end" },
      { label: "E‑commerce", value: "Stripe" },
      { label: "SEO", value: "Meta + Sitemap" },
    ],
    bullet_fast: "Fast",
    bullet_seo: "SEO‑friendly",
    bullet_resp: "Responsive",

    services_kicker: "Services",
    services_title: "Clear services tailored for small businesses",
    services_sub: "I help you launch or modernize your online presence. Everything is quoted (except maintenance).",
    service_cards: [
      { icon: "vitrine", type: "Showcase", title: "Showcase website", desc: "Present your business with a clear, fast site focused on conversions (contact, booking).", price: "On request" },
      { icon: "ecom", type: "E‑commerce", title: "E‑commerce", desc: "Sell online with product management, secure payments, taxes & shipping. Training included.", price: "On request" },
      { icon: "apps", type: "Custom app", title: "Custom apps", desc: "Booking, scheduling, admin panels… Web apps tailored to your needs.", price: "On request" },
      { icon: "maint", type: "Maintenance", title: "Maintenance & optimization", desc: "Updates, fixes, performance tuning, technical SEO, Lighthouse audit & action plan.", price: "From €120/month" },
    ],

    portfolio_kicker: "Work",
    portfolio_title: "Selected projects",
    portfolio_sub: "A short selection. Each project solves a clear need with a simple, effective solution.",
    // Latest works section
    latest_kicker: "New",
    latest_title: "Latest work",
    latest_sub: "Two fresh demos available online.",
    view_site: "Visit site",
    latest_items: [
      {
        id: "hotel-demo",
        title: "Hotel booking demo",
        desc: "Landing with search bar (dates, guests) and featured rooms.",
        url: "https://karlsefni-hotel.vercel.app/",
        img: HotelDemoImg,
      },
      {
        id: "immo-demo",
        title: "Real‑estate agency demo",
        desc: "Hero + search (city, type, budget) and a call‑to‑action for free estimate.",
        url: "https://karlsefni-immobilier.vercel.app/",
        img: ImmoDemoImg,
      },
    ],
    projects: [
      // Row 1 (show first)
      {
        id: "parfumerie",
        title: "E-commerce store : Perfume shop",
        image: "https://images.unsplash.com/photo-1515165562835-c3b8c1e0b6c6?q=80&w=1480&auto=format&fit=crop",
        need: "Sell perfumes online with a smooth buying experience",
        solution: "E-commerce store with catalog, product pages, cart and checkout flow. Includes a demo video.",
        tags: ["React", "Tailwind", "E‑commerce"],
        video: ParfumerieVideo,
        poster: ParfumeriePoster,
        link: "#",
      },
      {
        id: "ecom",
        title: "Myoptique : E-commerce store",
        image: "https://images.unsplash.com/photo-1515165562835-c3b8c1e0b6c6?q=80&w=1480&auto=format&fit=crop",
        need: "Sell online with a smooth checkout",
        solution: "Product catalog, cart, secure checkout, back-office management. Back-end: Symfony + Stripe.",
        tags: ["React", "Symfony", "Stripe"],
        video: MyoptiqueVideo,
        poster: MyoptiquePoster,
        link: "#",
      },
      {
        id: "nextayah",
        title: "NextAyah : Islamic companion",
        image: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=1480&auto=format&fit=crop",
        need: "Revise and memorize surahs easily on mobile and desktop",
        solution: "Islamic companion for mobile and desktop to revise surahs with a simple, smooth interface designed for everyday practice.",
        tags: ["React", "Mobile", "Desktop"],
        video: NextAyahVideo,
        poster: NextAyahPoster,
        link: "#",
      },
      {
        id: "automatisation",
        title: "Automatisation : Smart automation tools",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1480&auto=format&fit=crop",
        need: "Automate sales prospecting by targeting specific departments",
        solution: "Automation platform for prospecting with automatic website discovery based on one or multiple selected departments to find qualified leads faster.",
        tags: ["React", "Automation", "Dashboard"],
        video: AutomatisationVideo,
        poster: AutomatisationPoster,
        link: "#",
      },
      // Row 2
      {
        id: "budget",
        title: "Budget management application",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1480&auto=format&fit=crop",
        need: "Personal expense tracking and budget management",
        solution: "Web application for creating budgets and tracking expenses. Back‑end: Symfony + MySQL.",
        tags: ["React", "Symfony", "MySQL"],
        video: BudgetVideo,
        poster: BudgetPoster,
        link: "https://hess-cej.vercel.app/",
      },
      {
        id: "hospital",
        title: "Health center : Guinea",
        image: "https://images.unsplash.com/photo-1529336953121-a0ce66f9c5fa?q=80&w=1480&auto=format&fit=crop",
        need: "Present activity, patient appointment management",
        solution: "Site for a health center (Symfony + React). Project ongoing.",
        tags: ["Symfony", "React", "Tailwind"],
        video: HospitalVideo,
        poster: HospitalPoster,
        link: "#",
      },
      {
        id: "booking",
        title: "Online booking platform",
        image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1480&auto=format&fit=crop",
        need: "Online booking, calendar management",
        solution: "Web app with synced calendar, Forms, Email notifications, Admin panel. Back‑end: Symfony.",
        tags: ["React", "Symfony", "Tailwind"],
        video: BookingVideo,
        poster: BookingPoster,
  capture: ["/src/assets/screen 1 booking.png", "/src/assets/screen 2 booking.png"],
        link: "#",
      },
    ],

    about_kicker: "About",
    about_title: "Reliable, modern, client‑oriented",
  about_sub: "My name is Bafodé Cissé, I'm 23 years old. Trained at Epitech, I specialize in showcase and e‑commerce websites for small businesses. I founded Karlsefni to put my skills to use in a better environment. My approach is simple: understand your business, deliver quickly, and optimize what matters (speed, SEO, conversion).",
    about_points: ["Clear communication, weekly milestones & deliverables", "Clean code (React, Tailwind, best practices)", "Measured performance (Lighthouse, Core Web Vitals)", "Continuous deployment (Vercel/Netlify)"],
    stack_label: "Stack",
    stack_value: "React, Symfony, TailwindCSS, API Platform, Stripe",
    focus_label: "Focus",
    focus_value: "Showcase sites & e‑commerce",
    availability_label: "Availability",
    availability_value: "Open to new projects",

    banner_text: "Available for new projects",
    banner_note: "",
    banner_btn: "Tell me about your project",

    trust_kicker: "Recommendations",
    trust_title: "Trusted by",
    trust_sub: "A couple of client/collaboration endorsements.",
    trust_items: [
      {
        id: "ayoub-nefzi",
        name: "Ayoub Nefzi",
        meta: "Freelance recruitment consultant",
        src: "/trust/ayoub-nefzi.png",
        alt: "LinkedIn recommendation screenshot from Ayoub Nefzi",
        quote:
          "I highly recommend Bafodé for his excellent work on my website. Professional, attentive, and proactive, he delivered a high-quality result that fully met my expectations. His technical expertise in web development, combined with rigor and attention to detail, guarantees a great outcome.",
      },
      {
        id: "souleymane-bah",
        name: "Souleymane BAH",
        meta: "Sies‑InserSup",
        src: "/trust/souleymane-bah.png",
        alt: "Recommendation screenshot from Souleymane BAH",
        quote:
          "I really enjoyed working with you on this project. Your consistent versioning follow-up, strong understanding of the requirements, and Docker skills for deployment made a real difference. Thanks for your work and great attitude, glad we collaborated!",
      },
    ],

    offers_kicker: "Offers",
    offers_title: "Turnkey packages",
    offers_sub: "Packages designed to launch or grow your online activity quickly.",
    packs: {
      pack_presence: {
        title: "💻 Presence Pack",
        price: "€900",
        desc: "Ideal for coaches, freelancers and small businesses who want a professional showcase.",
        bullets: [
          "Showcase site up to 3 pages (Home, Services, Contact)",
          "Modern responsive design (desktop + mobile)",
          "Contact form and Google Maps integration",
          "Basic SEO optimization (Google, loading speed)",
          "Delivery in 7–10 days",
          "Bonus: 1 round of corrections included.",
        ],
      },
      pack_rdv: {
        title: "📅 Booking Pack",
        price: "€1,600",
        desc: "Perfect for coaches, consultants and trainers who want to manage online bookings.",
        bullets: [
          "Full site up to 5 pages (Home, About, Services, FAQ, Contact)",
          "Calendar integration (Calendly, Google Calendar)",
          "Simple CMS (you can change texts and images)",
          "SEO and performance optimization",
          "Delivery in 10–14 days",
          "Bonus: 2 rounds of corrections included.",
        ],
      },
      pack_premium: {
        title: "🛒 Premium Pack",
        price: "€2,800",
        desc: "For freelancers and small businesses who want to sell directly online.",
        bullets: [
          "Full site (up to 7 pages)",
          "Shop integration (online payment via Stripe/PayPal)",
          "Simple client area (login + manage orders / bookings)",
          "Blog or news area to publish content",
          "Quick training to use the site",
          "Delivery in 2–4 weeks",
          "Bonus: 3 rounds of corrections included.",
        ],
      },
      payment_terms: "Payment terms: 30% on signature, 40% mid-project, 30% on delivery.",
      engagement: "Commitment: fast delivery, clear communication, support until launch.",
      corrections_def: "Each included round of corrections lets you request a grouped set of changes after delivery. This ensures your site matches your expectations while keeping turnaround times short.",
    },

    contact_kicker: "Contact",
    contact_title: "Let's talk about your project",
    contact_sub: "Reply within 1 business day. Quick and free audit. Guaranteed follow-up.",
    form_name: "Name",
    form_email: "Email",
    form_message: "Message",
    form_placeholder: "Describe your needs in a few lines…",
    form_submit: "Send",
    consent: "By sending this form, you agree to be contacted by email.",
    direct_contact: "Direct contact",
    direct_pref: "You can also reach me directly via email or LinkedIn/GitHub.",

    footer_legal: "SIRET : 990 412 496 00012",

    sending: "Sending…",
    sent_ok: "Message sent! I'll get back to you shortly.",
    sent_ko: "Failed to send. Please retry or email me directly.",

    theme_label: "Theme",
    lang_label: "Language",

    seo_title: "Bafodé Cissé – Freelance Web Developer (React & Symfony)",
    seo_desc: "Bafodé Cissé : Freelance web developer specialized in React & Symfony. Showcase sites, e‑commerce and custom apps.",
    og_locale: "en_US",
  },
};

// Small utility to safely set meta tags
function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    const match = selector.match(/\[(name|property)="([^"]+)"\]/);
    if (match) el.setAttribute(match[1], match[2]);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
}
function upsertLink(rel, hreflang, href, id) {
  let el = id ? document.getElementById(id) : document.querySelector(`link[rel="${rel}"][hreflang="${hreflang}"]`);
  if (!el) {
    el = document.createElement("link");
    if (id) el.id = id;
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  if (href) el.setAttribute("href", href);
}

// Modal component
function ProjectModal({ project, onClose, lang }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const videoRef = useRef(null);
  const [showCapture, setShowCapture] = useState(false);

  useEffect(() => {
    if (!project) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    console.log('ProjectModal opened for', project.id, 'captures=', project.capture);
    setTimeout(() => closeBtnRef.current?.focus(), 80);
    function onKey(e) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = prev; setShowCapture(false); };
  }, [project, onClose]);

  if (!project) return null;
  const needLabel = lang === "fr" ? "Besoin :" : "Need :"; // FR only Besoin

  const handleOverlayClick = (e) => { if (e.target === overlayRef.current) onClose(); };
  const onVideoEnded = () => project.capture && setShowCapture(true);

  return (
    <div ref={overlayRef} onMouseDown={handleOverlayClick} className="fixed inset-0 z-50 grid place-items-center bg-black/60">
      <Motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="max-w-5xl w-[95%] md:w-4xl bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="font-semibold text-lg">{project.title}</h3>
          <button ref={closeBtnRef} onClick={onClose} aria-label="Fermer" className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"><X /></button>
        </div>

  <div className="p-4 space-y-4 max-h-[80vh] overflow-auto">
          {project.video && (
            <div>
              <video ref={videoRef} onEnded={onVideoEnded} controls className="w-full rounded-md bg-black" poster={project.poster || ""}>
                <source src={project.video} type="video/mp4" />
                {"Votre navigateur ne supporte pas la vidéo."}
              </video>
              {/* description removed per request */}
              <div className="mt-2 flex gap-2">
                {project.capture && (
                  <button onClick={() => { console.log('toggle captures, before=', project.capture); setShowCapture((s) => !s); }} className="px-3 py-2 rounded-md border">{showCapture ? (lang === "fr" ? "Cacher les captures" : "Hide captures") : (lang === "fr" ? "Afficher les captures" : "Show captures")}</button>
                )}
              </div>
            </div>
          )}

          {project.capture && showCapture && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Array.isArray(project.capture) ? project.capture : [project.capture]).map((src, i) => (
                <div key={i}>
                  <img src={src} alt={`Capture ${i + 1}`} className="w-full rounded-md border" />
                </div>
              ))}
            </div>
          )}

          <div>
            <p className="text-sm text-neutral-700 dark:text-neutral-300"><span className="font-medium">{needLabel}</span> {project.need}</p>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300"><span className="font-medium">Solution :</span> {project.solution}</p>
            <div className="mt-3 flex flex-wrap gap-2">{project.tags?.map((tag) => (<span key={tag} className="text-xs rounded-full border px-2 py-1">{tag}</span>))}</div>
            
            {project.link && project.link !== "#" && (
              <div className="mt-4">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 rounded-md text-sm hover:opacity-90 transition-opacity"
                >
                  {lang === "fr" ? "Voir le projet en ligne" : "View live project"}
                  <ArrowRight size={16} />
                </a>
              </div>
            )}
          </div>
        </div>
      </Motion.div>
    </div>
  );
}

function TrustModal({ item, onClose, lang }) {
  const overlayRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [imgOk, setImgOk] = useState(true);

  useEffect(() => {
    if (!item) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setImgOk(true);
    setTimeout(() => closeBtnRef.current?.focus(), 80);
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [item, onClose]);

  if (!item) return null;
  const closeLabel = lang === "fr" ? "Fermer" : "Close";

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div ref={overlayRef} onMouseDown={handleOverlayClick} className="fixed inset-0 z-50 grid place-items-center bg-black/60">
      <Motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="max-w-4xl w-[95%] bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="font-semibold text-lg text-neutral-900 dark:text-white">{item.name}</h3>
            {item.meta && <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.meta}</p>}
          </div>
          <button ref={closeBtnRef} onClick={onClose} aria-label={closeLabel} className="p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800">
            <X />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[80vh] overflow-auto">
          {imgOk && item.src ? (
            <img
              src={item.src}
              alt={item.alt || item.name}
              loading="lazy"
              onError={() => setImgOk(false)}
              className="w-full max-h-[60vh] object-contain rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
            />
          ) : null}

          {item.quote ? (
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">“{item.quote}”</p>
          ) : null}
        </div>
      </Motion.div>
    </div>
  );
}

// Smaller components reused from previous version (Hero, Services, About, Contact, Footer) adapted to accept lang where needed
const SectionTitle = ({ kicker, title, subtitle }) => (
  <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
    {kicker && <Motion.p variants={container} className="uppercase tracking-wider text-sm text-neutral-500 dark:text-neutral-400">{kicker}</Motion.p>}
    <Motion.h2 variants={container} className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white">{title}</Motion.h2>
    {subtitle && <Motion.p variants={container} className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">{subtitle}</Motion.p>}
  </div>
);

const Nav = ({ t, theme, toggleTheme, lang, toggleLang }) => (
  <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200 dark:border-neutral-800">
    <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <a href="#home" className="font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">{t.brand}</a>
      <div className="hidden md:flex items-center gap-6 text-sm">
        <a href="#services" className="hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-300">{t.nav.services}</a>
        <a href="#portfolio" className="hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-300">{t.nav.portfolio}</a>
        <a href="#about" className="hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-300">{t.nav.about}</a>
        <a href="#contact" className="hover:text-neutral-900 dark:hover:text-white text-neutral-600 dark:text-neutral-300">{t.nav.contact}</a>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={toggleLang} aria-label={t.lang_label} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900"><Globe size={16}/> {lang.toUpperCase()}</button>
        <button onClick={toggleTheme} aria-label={t.theme_label} className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 px-3 py-2 text-sm text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900">{theme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}</button>
        <a href="#contact" className="ml-1 inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-sm px-2 sm:px-4 py-2 shadow-sm hover:opacity-90">
          <span className="hidden sm:inline">{t.cta_primary}</span>
          <span className="sm:hidden">Projet</span>
          <ArrowRight size={16}/>
        </a>
      </div>
    </nav>
  </header>
);

const Hero = ({ t }) => (
  <section id="home" className="relative overflow-hidden">
    <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white via-white to-neutral-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900" />
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <Motion.div variants={stagger} initial="hidden" animate="show" className="grid md:grid-cols-2 gap-10 items-center">
        <Motion.div variants={container}>
          <p className="uppercase tracking-wider text-xs text-neutral-500 dark:text-neutral-400 mb-3">{t.hero_badge}</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-neutral-900 dark:text-white">{t.hero_title_1}<span className="underline decoration-4 decoration-neutral-900 dark:decoration-white">{t.hero_title_em}</span>{t.hero_title_2}</h1>
          <p className="mt-5 text-neutral-600 dark:text-neutral-300 max-w-xl">{t.hero_sub}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3"><a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 text-sm shadow-sm hover:opacity-90">{t.cta_primary} <ArrowRight size={18}/></a><a href="#portfolio" className="inline-flex items-center gap-2 rounded-2xl border border-neutral-300 dark:border-neutral-700 px-5 py-3 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900">{t.hero_browse}</a></div>
          <div className="mt-8 flex items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400"><div className="flex items-center gap-2"><CheckCircle2 size={18}/> {t.bullet_fast}</div><div className="flex items-center gap-2"><CheckCircle2 size={18}/> {t.bullet_seo}</div><div className="flex items-center gap-2"><CheckCircle2 size={18}/> {t.bullet_resp}</div></div>
        </Motion.div>
        <Motion.div variants={container} className="relative h-56 sm:h-72 md:h-96 rounded-3xl bg-gradient-to-tr from-neutral-900 to-neutral-700 dark:from-neutral-800 dark:to-neutral-600">
          <div className="absolute inset-0 rounded-3xl opacity-20 bg-[radial-gradient(circle_at_30%_30%,white,transparent_35%),radial-gradient(circle_at_70%_70%,white,transparent_35%)]"/>
          <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 sm:grid-cols-4 gap-3">{t.chips.map((chip,i)=>(<div key={i} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur text-white p-3"><p className="text-xs uppercase tracking-wide opacity-80">{chip.label}</p><p className="text-sm font-medium">{chip.value}</p></div>))}</div>
        </Motion.div>
      </Motion.div>
    </div>
  </section>
);

const Services = ({ t }) => {
  const items = useMemo(() => t.service_cards, [t]);
  const iconMap = { vitrine: Laptop, ecom: ShoppingCart, apps: CalendarCheck, maint: Wrench };
  return (
    <section id="services" className="py-16 sm:py-24 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker={t.services_kicker} title={t.services_title} subtitle={t.services_sub} />
        <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item, idx) => { 
            const { icon, title, desc, price, type } = item; 
            const Icon = iconMap[icon] || Code2; 
            return (
              <Motion.div key={idx} variants={container} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 hover:shadow-sm transition-shadow bg-white dark:bg-neutral-900 flex flex-col h-full">
                <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 grid place-content-center mb-4"><Icon size={22} /></div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{title}</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed flex-1 mb-4">{desc}</p>
                <div className="flex items-center justify-between mt-auto pt-2">
                  <span className="text-xs rounded-full border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-neutral-700 dark:text-neutral-200 flex-shrink-0">{type}</span>
                  <span className="text-sm font-medium text-neutral-900 dark:text-white text-right ml-2 flex-shrink-0">{price}</span>
                </div>
              </Motion.div>
            ); 
          })}
        </Motion.div>
      </div>
    </section>
  );
};

const Portfolio = ({ t, lang, onOpen }) => {
  const projects = useMemo(() => t.projects, [t]);
  // Regrouper les projets 2 par 2 pour forcer l'affichage 2 puis 2 sur desktop
  const rows = [];
  for (let i = 0; i < projects.length; i += 2) {
    rows.push(projects.slice(i, i + 2));
  }
  return (
    <section id="portfolio" className="py-16 sm:py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
  <SectionTitle kicker={t.portfolio_kicker} title={t.portfolio_title} subtitle={t.portfolio_sub} />
        {/* Carousel for all screen sizes (replaces previous desktop grid) */}
        <div>
          <PortfolioCarousel projects={projects} lang={lang} onOpen={onOpen} />
        </div>
        {/* (Duplicate mobile carousel removed) */}
      </div>
    </section>
  );
};

const About = ({ t }) => (
  <section id="about" className="py-16 sm:py-24 bg-white dark:bg-neutral-950">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <SectionTitle kicker={t.about_kicker} title={t.about_title} subtitle={t.about_sub} />
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <Motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}>
          <ul className="space-y-3 text-neutral-700 dark:text-neutral-300">{t.about_points.map((line)=> (<li key={line} className="flex items-start gap-3"><CheckCircle2 className="mt-0.5" size={20}/><span>{line}</span></li>))}</ul>
        </Motion.div>
        <Motion.div variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
          <div className="flex items-center gap-3"><div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 grid place-content-center"><Code2/></div><div><p className="text-sm text-neutral-500 dark:text-neutral-400">{t.stack_label}</p><p className="font-medium text-neutral-900 dark:text-white">{t.stack_value}</p></div></div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4 text-sm"><div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900"><p className="text-neutral-500 dark:text-neutral-400">{t.focus_label}</p><p className="font-medium text-neutral-900 dark:text-white">{t.focus_value}</p></div><div className="rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-neutral-900"><p className="text-neutral-500 dark:text-neutral-400">{t.availability_label}</p><p className="font-medium text-neutral-900 dark:text-neutral-400">{t.availability_value}</p></div></div>
        </Motion.div>
      </div>
    </div>
  </section>
);

const TrustedBy = ({ t, onOpen }) => {
  const items = useMemo(() => t.trust_items || [], [t]);
  return (
    <section id="trust" className="py-16 sm:py-24 bg-neutral-50 dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker={t.trust_kicker} title={t.trust_title} subtitle={t.trust_sub} />
        <Motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} className="grid md:grid-cols-2 gap-6">
          {items.map((it) => (
            <TrustCard key={it.id} item={it} onOpen={onOpen} />
          ))}
        </Motion.div>
      </div>
    </section>
  );
};

function TrustCard({ item, onOpen }) {
  const [imgOk, setImgOk] = useState(true);
  return (
    <Motion.button
      type="button"
      variants={container}
      onClick={() => onOpen?.(item)}
      className="text-left w-full rounded-2xl border border-neutral-200 dark:border-neutral-800 p-5 bg-white dark:bg-neutral-900 hover:shadow-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-offset-neutral-900"
      aria-label={(item?.alt || item?.name) ?? "Open"}
    >
      {imgOk && item.src ? (
        <img
          src={item.src}
          alt={item.alt || item.name}
          loading="lazy"
          onError={() => setImgOk(false)}
          className="w-full h-56 sm:h-64 object-contain rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950"
        />
      ) : (
        <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">“{item.quote}”</p>
      )}

      <div className="mt-4">
        <p className="font-semibold text-neutral-900 dark:text-white">{item.name}</p>
        {item.meta && <p className="text-sm text-neutral-600 dark:text-neutral-300">{item.meta}</p>}
      </div>
    </Motion.button>
  );
}

const Banner = ({ t }) => (
  <section className="py-12 sm:py-16 bg-neutral-900 text-white dark:bg-neutral-800">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"><div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 text-center"><p className="text-lg font-medium">{t.banner_text}{t.banner_note ? <span className="opacity-90">{t.banner_note}</span> : null}</p><div className="mt-5"><a href="#contact" className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-5 py-3 text-sm font-medium hover:opacity-90">{t.banner_btn} <ArrowRight size={18}/></a></div></div></div>
  </section>
);

const Contact = ({ t, lang }) => {
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    if (!formRef.current) {
      console.error('Form ref is missing');
      setStatus('error');
      return;
    }

    // Debug: collect form data
    const formPayload = {};
    new FormData(formRef.current).forEach((v, k) => (formPayload[k] = v));
    console.log('EmailJS: sending form with payload', formPayload, {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      hasPublicKey: !!import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    });

    try {
      const res = await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formRef.current);
      console.log('EmailJS sendForm response', res);
      formRef.current?.reset();
      setStatus("success");
    } catch (err) {
      console.error('EmailJS send error', err);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionTitle kicker={t.contact_kicker} title={t.contact_title} subtitle={t.contact_sub} />
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={onSubmit} ref={formRef} className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="page_url" value={pageUrl} />
            <div className="grid sm:grid-cols-2 gap-4"><div><label className="text-sm text-neutral-600 dark:text-neutral-300">{t.form_name}</label><input type="text" name="name" required className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"/></div><div><label className="text-sm text-neutral-600 dark:text-neutral-300">{t.form_email}</label><input type="email" name="email" required className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"/></div></div>
            <div className="mt-4"><label className="text-sm text-neutral-600 dark:text-neutral-300">{t.form_message}</label><textarea name="message" rows="5" required placeholder={t.form_placeholder} className="mt-1 w-full rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 px-3 py-2 outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-200"/></div>
            <button type="submit" disabled={status === "loading"} className="mt-5 inline-flex items-center gap-2 rounded-2xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-5 py-3 text-sm hover:opacity-90 disabled:opacity-60">{status === "loading" ? t.sending : t.form_submit} <Mail size={18}/></button>
            <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">{t.consent}</p>
            {status === "success" && (<div className="mt-4 rounded-xl border border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-900/30 px-4 py-3 text-sm text-green-800 dark:text-green-200">{t.sent_ok}</div>)}
            {status === "error" && (<div className="mt-4 rounded-xl border border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/30 px-4 py-3 text-sm text-red-800 dark:text-red-200">{t.sent_ko}</div>)}
          </form>

          <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-6 bg-white dark:bg-neutral-900">
            <h3 className="font-semibold text-neutral-900 dark:text-white">{t.direct_contact}</h3>
            <p className="mt-2 text-neutral-600 dark:text-neutral-300 text-sm">{t.direct_pref} {lang === 'fr' ? (<span>Vous pouvez prendre rendez‑vous directement <a href="https://calendly.com/cissebafode-pro/30min" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">ici</a>.</span>) : (<span>You can book a meeting directly <a href="https://calendly.com/cissebafode-pro/30min" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">here</a>.</span>)}</p>
            <div className="mt-4 flex flex-col gap-3">
              <a href="mailto:cissebafode.pro@gmail.com" className="inline-flex items-center gap-2 hover:opacity-80 text-neutral-700 dark:text-neutral-200"><Mail size={18}/> cissebafode.pro@gmail.com</a>
              <a href="https://github.com/bcisse14" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-80 text-neutral-700 dark:text-neutral-200"><Github size={18}/> github.com/bcisse14</a>
              <a href="https://www.linkedin.com/in/bafod%C3%A9-ciss%C3%A9/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:opacity-80 text-neutral-700 dark:text-neutral-200"><Linkedin size={18}/> linkedin.com/in/bafodé-cissé</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ t }) => (
  <footer className="border-t border-neutral-200 dark:border-neutral-800 py-10 bg-white dark:bg-neutral-950">
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-neutral-600 dark:text-neutral-300">© {new Date().getFullYear()} {t.brand} · Tous droits réservés / All rights reserved.</p>
        <div className="flex items-center gap-5 text-neutral-600 dark:text-neutral-300">
          <a href="#home" className="hover:text-neutral-900 dark:hover:text-white">{t.nav.home}</a>
          <a href="#services" className="hover:text-neutral-900 dark:hover:text-white">{t.nav.services}</a>
          <a href="#portfolio" className="hover:text-neutral-900 dark:hover:text-white">{t.nav.portfolio}</a>
          <a href="#contact" className="hover:text-neutral-900 dark:hover:text-white">{t.nav.contact}</a>
        </div>
      </div>
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">{t.footer_legal}</p>
    </div>
  </footer>
);

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem("lang") || "fr");
  const t = useMemo(() => i18n[lang], [lang]);
  const toggleLang = () => { const next = lang === "fr" ? "en" : "fr"; setLang(next); localStorage.setItem("lang", next); };

  // Theme default to light (if no saved setting)
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const toggleTheme = () => setTheme((p) => (p === "dark" ? "light" : "dark"));
  useEffect(() => { const root = document.documentElement; if (theme === "dark") root.classList.add("dark"); else root.classList.remove("dark"); localStorage.setItem("theme", theme); }, [theme]);

  // Initialize EmailJS (step 5) : important for debugging & optional if you pass publicKey in sendForm
  useEffect(() => {
    try {
      const key = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      if (key) {
        emailjs.init(key);
        console.log('EmailJS initialized with public key');
      } else {
        console.warn('VITE_EMAILJS_PUBLIC_KEY is not set. EmailJS not initialized.');
      }
    } catch (e) {
      console.error('Error initializing EmailJS', e);
    }
  }, []);

  // SEO / html lang
  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.title = t.seo_title;
    upsertMeta('meta[name="description"]', { name: 'description', content: t.seo_desc });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: t.seo_title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: t.seo_desc });
    upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: t.og_locale });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: '/og-image.png' });

    const FR = import.meta.env.VITE_SITE_URL_FR;
    const EN = import.meta.env.VITE_SITE_URL_EN;
    if (FR && EN) { upsertLink('alternate', 'fr', FR, 'alt-fr'); upsertLink('alternate', 'en', EN, 'alt-en'); upsertLink('canonical', null, lang === 'fr' ? FR : EN, 'canonical'); }
  }, [lang, t]);

  // Modal state
  const [selectedProject, setSelectedProject] = useState(null);
  const openProject = (p) => setSelectedProject(p);
  const closeProject = () => setSelectedProject(null);

  const [selectedTrust, setSelectedTrust] = useState(null);
  const openTrust = (it) => setSelectedTrust(it);
  const closeTrust = () => setSelectedTrust(null);

  return (
    <main className="font-sans bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50">
      <Nav t={t} theme={theme} toggleTheme={toggleTheme} lang={lang} toggleLang={toggleLang} />
      <Hero t={t} />
      <Services t={t} />
      <Portfolio t={t} lang={lang} onOpen={openProject} />
      <About t={t} />
      <TrustedBy t={t} onOpen={openTrust} />
      <Banner t={t} />
      <Contact t={t} lang={lang} />
      <Footer t={t} />

      <ProjectModal project={selectedProject} onClose={closeProject} lang={lang} />
      <TrustModal item={selectedTrust} onClose={closeTrust} lang={lang} />
    </main>
  );
}
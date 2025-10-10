import React from "react";
import { motion as Motion } from "framer-motion";

const container = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };

function Card({ item, viewLabel }) {
  const fallback = (e) => {
    // Use a neutral fallback image if the provided one isn't found locally
    if (!e.target.dataset.fallback) {
      e.target.dataset.fallback = "1";
      e.target.src =
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1480&auto=format&fit=crop";
    }
  };

  return (
  <Motion.div variants={container} className="group relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
      <img
        src={item.img}
        onError={fallback}
        alt={item.title}
        className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
        {item.desc && (
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">{item.desc}</p>
        )}
      </div>
      {/* Hover overlay with CTA (centered) */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="pointer-events-auto">
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-4 py-2 text-sm font-medium shadow-lg hover:opacity-90"
          >
            {viewLabel}
          </a>
        </div>
      </div>
    </Motion.div>
  );
}

export default function LatestWorks({ t }) {
  const items = t.latest_items || [];
  return (
    <section id="latest" className="py-16 sm:py-24 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          {t.latest_kicker && (
            <Motion.p variants={container} className="uppercase tracking-wider text-sm text-neutral-500 dark:text-neutral-400">
              {t.latest_kicker}
            </Motion.p>
          )}
          <Motion.h2 variants={container} className="text-2xl sm:text-3xl md:text-4xl font-semibold text-neutral-900 dark:text-white">
            {t.latest_title}
          </Motion.h2>
          {t.latest_sub && (
            <Motion.p variants={container} className="mt-3 text-neutral-600 dark:text-neutral-300 leading-relaxed">
              {t.latest_sub}
            </Motion.p>
          )}
        </div>

        <Motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {items.map((it) => (
            <Card key={it.id} item={it} viewLabel={t.view_site} />
          ))}
        </Motion.div>
      </div>
    </section>
  );
}

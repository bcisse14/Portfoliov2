import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion as Motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';

export default function PortfolioCarousel({ projects = [], lang = 'fr', onOpen }) {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const isDraggingRef = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const a11y = useMemo(() => {
    const fr = lang === 'fr';
    return {
      carouselLabel: fr ? 'Carousel des projets' : 'Project carousel',
      prev: fr ? 'Projet précédent' : 'Previous project',
      next: fr ? 'Projet suivant' : 'Next project',
      open: (title) => (fr ? `Ouvrir le projet : ${title}` : `Open project: ${title}`),
      dot: (i, total) => (fr ? `Aller au projet ${i} sur ${total}` : `Go to project ${i} of ${total}`),
      video: fr ? 'Vidéo' : 'Video',
      hint: fr ? 'Utilisez les flèches gauche/droite pour naviguer.' : 'Use left/right arrows to navigate.',
    };
  }, [lang]);

  useEffect(() => {
    function update() { setSlideWidth(viewportRef.current?.clientWidth || 0); }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduceMotion(!!mql.matches);
    onChange();

    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChange);
    };
  }, []);

  const goPrev = () => setIndex(i => (i - 1 + projects.length) % projects.length);
  const goNext = () => setIndex(i => (i + 1) % projects.length);

  const onKeyDown = (e) => {
    if (projects.length <= 1) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); goNext(); }
    if (e.key === 'Home') { e.preventDefault(); setIndex(0); }
    if (e.key === 'End') { e.preventDefault(); setIndex(Math.max(0, projects.length - 1)); }
  };

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={a11y.carouselLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <span className="sr-only">{a11y.hint}</span>

      <div ref={viewportRef} className="relative overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <Motion.div
          className="flex will-change-transform"
          style={{ width: slideWidth ? `${projects.length * slideWidth}px` : '100%' }}
          animate={slideWidth ? { x: -index * slideWidth } : { x: 0 }}
          transition={reduceMotion ? { duration: 0 } : { type: 'spring', stiffness: 260, damping: 30 }}
          drag="x"
          dragConstraints={{ left: -(projects.length - 1) * slideWidth, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={(_, info) => {
            const offset = info.offset.x;
            const threshold = (slideWidth || 100) / 4;
            if (offset > threshold) setIndex(i => (i - 1 + projects.length) % projects.length);
            else if (offset < -threshold) setIndex(i => (i + 1) % projects.length);
            window.setTimeout(() => {
              isDraggingRef.current = false;
            }, 250);
          }}
        >
          {projects.map((p) => (
            <button
              key={p.id}
              type="button"
              style={{ width: slideWidth ? `${slideWidth}px` : '100%' }}
              className="w-full flex-shrink-0 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-offset-neutral-900"
              aria-label={a11y.open(p.title)}
              onClick={() => {
                if (isDraggingRef.current) return;
                onOpen?.(p);
              }}
            >
              <div className="w-full aspect-[16/10] min-h-[160px] overflow-hidden bg-black relative">
                {p.video ? (
                  <video className="w-full h-full object-contain sm:object-cover object-center block" src={p.video} preload="metadata" muted playsInline poster={p.poster || ''} aria-hidden="true" />
                ) : (
                  <img src={p.image} alt={p.title} className="w-full h-full object-contain sm:object-cover object-center block" loading="lazy" />
                )}
                {p.video && (
                  <div className="absolute inset-0 grid place-items-center pointer-events-none">
                    <div className="flex flex-col items-center gap-2 text-white pointer-events-auto">
                      <div className="w-14 h-14 rounded-full grid place-content-center bg-black/50 backdrop-blur"><Play size={28} /></div>
                      <span className="text-xs">{a11y.video}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <h3 className="font-semibold text-neutral-900 dark:text-white text-xl md:text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 dark:text-neutral-300"><span className="font-medium text-neutral-800 dark:text-neutral-200">{lang === 'fr' ? 'Besoin :' : 'Need :'}</span> {p.need}</p>
                <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300"><span className="font-medium text-neutral-800 dark:text-neutral-200">Solution :</span> {p.solution}</p>
                <div className="mt-4 flex flex-wrap gap-2">{p.tags?.map((tag) => (<span key={tag} className="text-xs rounded-full border border-neutral-300 dark:border-neutral-700 px-2 py-1 text-neutral-700 dark:text-neutral-200">{tag}</span>))}</div>
              </div>
            </button>
          ))}
        </Motion.div>
      </div>

      <div className="mt-4 flex items-center justify-center gap-3">
        {projects.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={a11y.dot(i + 1, projects.length)}
            aria-current={i === index ? 'true' : 'false'}
            className={`w-3 h-3 rounded-full ${i === index ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'} transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-offset-neutral-900`}
          />
        ))}
      </div>

      <button type="button" onClick={goPrev} aria-label={a11y.prev} className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 p-2 shadow-sm hover:scale-105 z-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-offset-neutral-900">
        <ArrowRight className="-rotate-180" />
      </button>

      <button type="button" onClick={goNext} aria-label={a11y.next} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 dark:bg-neutral-800/80 p-2 shadow-sm hover:scale-105 z-20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-300 dark:focus:ring-offset-neutral-900">
        <ArrowRight />
      </button>
    </div>
  );
}

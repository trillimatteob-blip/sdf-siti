"use client";

import { useState, useEffect, useRef, useCallback } from "react";

function useCountUp(target, shouldStart, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    const num = typeof target === "string" ? parseInt(target, 10) : target;
    if (isNaN(num) || num === 0) {
      setCount(target);
      return;
    }

    let start = 0;
    const increment = num / (duration / 16);
    let raf;

    function step() {
      start += increment;
      if (start >= num) {
        setCount(num);
        return;
      }
      setCount(Math.floor(start));
      raf = requestAnimationFrame(step);
    }

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, shouldStart, duration]);

  return count;
}

function StatItem({ value, label, prefix = "", suffix = "", started }) {
  const numericValue = parseInt(String(value).replace(/\D/g, ""), 10) || 0;
  const animated = useCountUp(numericValue, started);

  return (
    <div className="text-center">
      <p className="font-heading text-4xl sm:text-5xl md:text-6xl text-gold-gradient leading-none mb-2">
        {prefix}
        {started ? animated : 0}
        {suffix}
      </p>
      <p className="text-xs sm:text-sm tracking-wider text-gray-muted uppercase">
        {label}
      </p>
    </div>
  );
}

export default function StatsCounter({ stats = [] }) {
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4"
    >
      {stats.map((stat, i) => (
        <StatItem
          key={i}
          value={stat.value}
          label={stat.label}
          prefix={stat.prefix}
          suffix={stat.suffix}
          started={started}
        />
      ))}
    </div>
  );
}

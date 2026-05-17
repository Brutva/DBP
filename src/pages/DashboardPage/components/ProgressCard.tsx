"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MILESTONES, OVERALL_PROGRESS, PHASES } from "@/src/data/buildingPassportData";
import type { Phase } from "@/src/data/types";

function PhaseBar({ phase, delay }: { phase: Phase; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 break-words text-sm font-medium text-[#1C2340]">
          {phase.label}
        </span>
        <span
          className="flex-shrink-0 text-sm font-semibold font-mono tabular-nums"
          style={{ color: phase.color }}
        >
          {phase.percent}%
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-[#F2F0EC]">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${phase.percent}%` } : { width: 0 }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ backgroundColor: phase.color }}
        />
      </div>
    </div>
  );
}

export default function ProgressCard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1200;
    const step = 16;
    const increment = (OVERALL_PROGRESS / duration) * step;

    const timer = setInterval(() => {
      start += increment;

      if (start >= OVERALL_PROGRESS) {
        setCount(OVERALL_PROGRESS);
        clearInterval(timer);
        return;
      }

      setCount(Math.round(start));
    }, step);

    return () => clearInterval(timer);
  }, [inView]);

  const circumference = 2 * Math.PI * 38;
  const progressOffset = circumference - (OVERALL_PROGRESS / 100) * circumference;

  return (
    <div ref={ref} className="space-y-5 sm:space-y-6">
      <div className="flex flex-col gap-5 sm:gap-6 md:flex-row">
        <div className="flex flex-col items-start gap-4 min-[480px]:flex-row min-[480px]:items-center sm:gap-6">
          <div className="relative h-20 w-20 flex-shrink-0 sm:h-24 sm:w-24">
            <div
              className="absolute inset-2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(196,98,45,0.12) 0%, transparent 70%)",
              }}
            />
            <svg className="h-20 w-20 -rotate-90 sm:h-24 sm:w-24" viewBox="0 0 88 88">
              <circle
                cx="44"
                cy="44"
                r="38"
                fill="none"
                stroke="#F2F0EC"
                strokeWidth="8"
              />
              <motion.circle
                cx="44"
                cy="44"
                r="38"
                fill="none"
                stroke="#C4622D"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={
                  inView
                    ? { strokeDashoffset: progressOffset }
                    : { strokeDashoffset: circumference }
                }
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-bold leading-none text-[#1C2340] font-mono tabular-nums sm:text-2xl">
                {count}%
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#8B90A4]">
              Общий прогресс
            </p>
            <p className="break-words text-base font-semibold text-[#1C2340] sm:text-lg">
              Строительство идёт по плану
            </p>
            <p className="mt-0.5 text-sm text-[#4A5068]">
              Расчётное завершение — июнь 2026
            </p>
          </div>
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#8B90A4]">
            Этапы строительства
          </p>
          <div className="space-y-2">
            {MILESTONES.map((milestone) => (
              <div
                key={milestone.label}
                className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-3 gap-y-0.5 min-[420px]:grid-cols-[auto_minmax(0,1fr)_auto]"
              >
                <div
                  className={`
                    flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2
                    ${
                      milestone.done
                        ? "bg-[#2D9B57] border-[#2D9B57]"
                        : milestone.current
                          ? "bg-white border-[#C4622D] shadow-[0_0_0_3px_rgba(196,98,45,0.15)]"
                          : "bg-white border-[#E4E1DA]"
                    }
                  `}
                >
                  {milestone.done && (
                    <svg className="h-2 w-2 text-white" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1 4l2 2 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {milestone.current && (
                    <div className="h-1.5 w-1.5 rounded-full bg-[#C4622D]" />
                  )}
                </div>
                <span
                  className={`min-w-0 break-words text-xs ${
                    milestone.done
                      ? "text-[#4A5068] line-through decoration-[#8B90A4]/50"
                      : milestone.current
                        ? "font-semibold text-[#C4622D]"
                        : "text-[#8B90A4]"
                  }`}
                >
                  {milestone.label}
                </span>
                <span className="col-start-2 flex-shrink-0 text-[11px] font-mono text-[#8B90A4] min-[420px]:col-start-auto">
                  {milestone.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {PHASES.map((phase, index) => (
          <PhaseBar key={phase.label} phase={phase} delay={0.15 + index * 0.12} />
        ))}
      </div>
    </div>
  );
}

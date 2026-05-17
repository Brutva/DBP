"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Save } from "lucide-react";
import type { ProjectStatus } from "@/src/data/types";

export type { ProjectStatus } from "@/src/data/types";

const STATUS_CONFIG: Record<
  ProjectStatus,
  { color: string; bg: string; dot: string; label: string }
> = {
  "В проектировании": {
    color: "text-[#5A3A8A]",
    bg: "bg-[#EDE5F7]",
    dot: "bg-[#5A3A8A]",
    label: "В проектировании",
  },
  Строится: {
    color: "text-[#C4622D]",
    bg: "bg-[#F5E6DC]",
    dot: "bg-[#C4622D]",
    label: "Строится",
  },
  Приостановлен: {
    color: "text-[#8B5E00]",
    bg: "bg-[#FFF3D4]",
    dot: "bg-[#D4A017]",
    label: "Приостановлен",
  },
  Сдан: {
    color: "text-[#1E6B3C]",
    bg: "bg-[#E6F4EC]",
    dot: "bg-[#2D9B57]",
    label: "Сдан",
  },
};

const ALL_STATUSES: ProjectStatus[] = [
  "В проектировании",
  "Строится",
  "Приостановлен",
  "Сдан",
];

interface DropdownPortalProps {
  isOpen: boolean;
  listboxId: string;
  anchorRect: DOMRect | null;
  selected: ProjectStatus;
  onSelect: (status: ProjectStatus) => void;
  onClose: () => void;
}

function DropdownPortal({
  isOpen,
  listboxId,
  anchorRect,
  selected,
  onSelect,
  onClose,
}: DropdownPortalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (!panelRef.current?.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("scroll", onClose, true);
    window.addEventListener("resize", onClose);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("scroll", onClose, true);
      window.removeEventListener("resize", onClose);
    };
  }, [isOpen, onClose]);

  if (!anchorRect || typeof document === "undefined") return null;

  const viewportPadding = 12;
  const viewportWidth = typeof window === "undefined" ? anchorRect.width : window.innerWidth;
  const panelWidth = Math.min(anchorRect.width, viewportWidth - viewportPadding * 2);
  const panelLeft = Math.min(
    Math.max(anchorRect.left, viewportPadding),
    viewportWidth - panelWidth - viewportPadding
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={listboxId}
          ref={panelRef}
          role="listbox"
          aria-label="Выбор статуса"
          initial={{ opacity: 0, y: -6, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -6, scale: 0.98 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "fixed",
            top: anchorRect.bottom + 6,
            left: panelLeft,
            width: panelWidth,
            maxHeight: "min(18rem, calc(100vh - 1.5rem))",
            zIndex: 99999,
          }}
          className="overflow-y-auto rounded-xl border border-[#E4E1DA] bg-white shadow-[0_8px_32px_rgba(28,35,64,0.14),0_2px_8px_rgba(28,35,64,0.08)]"
        >
          {ALL_STATUSES.map((status) => {
            const cfg = STATUS_CONFIG[status];
            const isSelected = selected === status;

            return (
              <button
                key={status}
                type="button"
                role="option"
                aria-selected={isSelected}
                onMouseDown={(event) => {
                  event.preventDefault();
                  onSelect(status);
                }}
                className={`
                  flex w-full items-center justify-between gap-3 px-4 py-3
                  text-left text-sm font-medium transition-colors duration-100
                  ${isSelected ? "bg-[#F5E6DC]" : "hover:bg-[#F8F7F4]"}
                `}
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <span className={`h-2 w-2 flex-shrink-0 rounded-full ${cfg.dot}`} />
                  <span className={`${cfg.color} min-w-0 truncate`}>{status}</span>
                </span>
                {isSelected && (
                  <Check className="h-3.5 w-3.5 flex-shrink-0 text-[#C4622D]" />
                )}
              </button>
            );
          })}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export function StatusBadge({ status }: { status: ProjectStatus }) {
  const cfg = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex max-w-[8.5rem] items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium sm:max-w-none sm:px-3 sm:text-sm ${cfg.color} ${cfg.bg}`}
    >
      <span className={`h-1.5 w-1.5 flex-shrink-0 rounded-full ${cfg.dot}`} />
      <span className="min-w-0 truncate">{status}</span>
    </span>
  );
}

interface StatusEditorProps {
  initialStatus: ProjectStatus;
  onStatusChange?: (status: ProjectStatus) => void;
}

export default function StatusEditor({
  initialStatus,
  onStatusChange,
}: StatusEditorProps) {
  const [selected, setSelected] = useState<ProjectStatus>(initialStatus);
  const [saved, setSaved] = useState<ProjectStatus>(initialStatus);
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [anchorRect, setAnchorRect] = useState<DOMRect | null>(null);

  const listboxId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        clearTimeout(saveTimerRef.current);
      }

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const openDropdown = useCallback(() => {
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setAnchorRect(rect);
    }
    setIsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const handleSelect = useCallback((status: ProjectStatus) => {
    setSelected(status);
    setIsOpen(false);
  }, []);

  const handleSave = useCallback(() => {
    if (selected === saved || isSaving) return;

    setIsSaving(true);

    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }

    saveTimerRef.current = setTimeout(() => {
      setSaved(selected);
      onStatusChange?.(selected);
      setIsSaving(false);
      setShowToast(true);
      saveTimerRef.current = null;

      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }

      toastTimerRef.current = setTimeout(() => {
        setShowToast(false);
        toastTimerRef.current = null;
      }, 3000);
    }, 520);
  }, [selected, saved, isSaving, onStatusChange]);

  const cfg = STATUS_CONFIG[selected];
  const isDirty = selected !== saved;

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-[#8B90A4]">
          Актуальный статус
        </p>
        <StatusBadge status={saved} />
      </div>

      <div className="h-px bg-[#F2F0EC]" />

      <div className="space-y-3">
        <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8B90A4]">
          Изменить статус
        </p>

        <button
          ref={triggerRef}
          type="button"
          onClick={isOpen ? closeDropdown : openDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          className={`
            flex w-full items-center justify-between gap-3 rounded-xl border bg-white px-3 py-3
            text-sm font-medium outline-none transition-all duration-150 sm:px-4
            focus-visible:ring-2 focus-visible:ring-[#C4622D]/30
            ${
              isOpen
                ? "border-[#C4622D] shadow-[0_0_0_3px_rgba(196,98,45,0.12)]"
                : "border-[#E4E1DA] hover:border-[#C4622D]/50"
            }
          `}
        >
          <span className="flex min-w-0 items-center gap-2.5">
            <span className={`h-2 w-2 flex-shrink-0 rounded-full ${cfg.dot}`} />
            <span className={`${cfg.color} min-w-0 truncate`}>{selected}</span>
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.18 }}
            className="flex-shrink-0"
          >
            <ChevronDown className="h-4 w-4 text-[#8B90A4]" />
          </motion.span>
        </button>

        <DropdownPortal
          isOpen={isOpen}
          listboxId={listboxId}
          anchorRect={anchorRect}
          selected={selected}
          onSelect={handleSelect}
          onClose={closeDropdown}
        />

        <motion.button
          type="button"
          onClick={handleSave}
          disabled={!isDirty || isSaving}
          whileHover={isDirty && !isSaving ? { scale: 1.015 } : {}}
          whileTap={isDirty && !isSaving ? { scale: 0.97 } : {}}
          className={`
            flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3
            text-sm font-semibold transition-all duration-200
            ${
              isDirty && !isSaving
                ? "bg-[#C4622D] text-white shadow-[0_4px_16px_rgba(196,98,45,0.30)] hover:bg-[#B3561F] cursor-pointer"
                : "bg-[#F2F0EC] text-[#B0B5C8] cursor-not-allowed"
            }
          `}
        >
          {isSaving ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
              className="block h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
            />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {isSaving ? "Сохраняем…" : "Сохранить статус"}
        </motion.button>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
            className="flex items-start gap-2.5 rounded-xl border border-[#2D9B57]/25 bg-[#E6F4EC] px-3.5 py-3"
          >
            <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#2D9B57]">
              <Check className="h-3 w-3 text-white" />
            </span>
            <p className="min-w-0 break-words text-sm font-medium text-[#1E6B3C]">
              Статус обновлён: <span className="font-semibold">{saved}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

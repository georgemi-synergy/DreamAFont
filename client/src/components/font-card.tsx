import { useState } from "react";
import type { Font } from "@shared/schema";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
}

const colorPalette = [
  { name: "Default", value: "currentColor", bg: "bg-foreground" },
  { name: "Slate", value: "#475569", bg: "bg-slate-600" },
  { name: "Rose", value: "#e11d48", bg: "bg-rose-600" },
  { name: "Orange", value: "#ea580c", bg: "bg-orange-600" },
  { name: "Emerald", value: "#059669", bg: "bg-emerald-600" },
  { name: "Blue", value: "#2563eb", bg: "bg-blue-600" },
  { name: "Violet", value: "#7c3aed", bg: "bg-violet-600" },
  { name: "Pink", value: "#db2777", bg: "bg-pink-600" },
];

export function FontCard({ font, previewText, fontSize }: FontCardProps) {
  const [selectedColor, setSelectedColor] = useState(colorPalette[0]);

  const getCategoryBadgeStyle = (category: string) => {
    switch (category.toLowerCase()) {
      case "serif":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300";
      case "sans-serif":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
      case "monospace":
        return "bg-slate-100 text-slate-800 dark:bg-slate-800/50 dark:text-slate-300";
      case "display":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col h-full bg-card rounded-md border border-border/60",
        "shadow-sm hover:shadow-xl hover:border-primary/20",
        "transition-all duration-300 ease-out overflow-hidden"
      )}
      data-testid={`card-font-${font.id}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-4 border-b border-border/40 bg-muted/20">
        <h3 className="font-semibold text-lg text-foreground tracking-tight truncate">
          {font.name}
        </h3>
        <span
          className={cn(
            "text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full shrink-0",
            getCategoryBadgeStyle(font.category)
          )}
        >
          {font.category}
        </span>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-6 flex flex-col justify-center min-h-[180px] overflow-hidden bg-white/50 dark:bg-black/20">
        <div
          className="break-words leading-tight transition-all duration-300"
          style={{
            fontFamily: font.family,
            fontSize: `${fontSize}px`,
            color: selectedColor.value === "currentColor" ? undefined : selectedColor.value,
          }}
        >
          {previewText || "The quick brown fox jumps over the lazy dog."}
        </div>
      </div>

      {/* Color Palette */}
      <div className="px-4 py-3 border-t border-border/40 bg-muted/10">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground mr-1">Colors:</span>
          {colorPalette.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              className={cn(
                "w-5 h-5 rounded-full transition-all duration-200 border-2",
                color.bg,
                selectedColor.name === color.name
                  ? "ring-2 ring-offset-2 ring-primary border-white dark:border-gray-900"
                  : "border-transparent hover:scale-110"
              )}
              title={color.name}
              data-testid={`button-color-${color.name.toLowerCase()}-${font.id}`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

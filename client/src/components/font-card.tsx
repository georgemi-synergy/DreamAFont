import type { Font } from "@shared/schema";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
}

export function FontCard({ font, previewText, fontSize }: FontCardProps) {
  // Determine a subtle gradient or style based on category just for visual variety
  const getCategoryBadgeStyle = (category: string) => {
    switch (category) {
      case "serif":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "sans-serif":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "mono":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "display":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "group relative flex flex-col h-full bg-card rounded-2xl border border-border/60",
        "shadow-sm hover:shadow-xl hover:border-primary/20",
        "transition-all duration-300 ease-out overflow-hidden"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/40 bg-muted/20">
        <h3 className="font-semibold text-lg text-foreground tracking-tight">
          {font.name}
        </h3>
        <span
          className={cn(
            "text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full border",
            getCategoryBadgeStyle(font.category)
          )}
        >
          {font.category}
        </span>
      </div>

      {/* Preview Area */}
      <div className="flex-1 p-6 flex flex-col justify-center min-h-[200px] overflow-hidden bg-white/50 dark:bg-black/20">
        <div
          className="break-words leading-tight transition-all duration-300"
          style={{
            fontFamily: font.family,
            fontSize: `${fontSize}px`,
          }}
        >
          {previewText || "The quick brown fox jumps over the lazy dog."}
        </div>
      </div>
      
      {/* Footer / Meta info */}
      <div className="px-4 py-2 border-t border-border/40 bg-muted/10 text-xs text-muted-foreground flex justify-between">
        <span>Google Fonts</span>
        <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary font-medium">
          Select Font &rarr;
        </span>
      </div>
    </motion.div>
  );
}

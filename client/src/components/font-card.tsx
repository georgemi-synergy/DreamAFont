import { useState } from "react";
import type { Font } from "@shared/schema";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
}

const presetColors = [
  "#000000", "#475569", "#64748b", "#94a3b8",
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
];

export function FontCard({ font, previewText, fontSize }: FontCardProps) {
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [isOpen, setIsOpen] = useState(false);

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
        <motion.div
          className="break-words leading-tight"
          animate={{ color: selectedColor }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            fontFamily: font.family,
            fontSize: `${fontSize}px`,
          }}
        >
          {previewText || "The quick brown fox jumps over the lazy dog."}
        </motion.div>
      </div>

      {/* Color Picker */}
      <div className="px-4 py-3 border-t border-border/40 bg-muted/10">
        <div className="flex items-center gap-3">
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="gap-2"
                data-testid={`button-color-picker-${font.id}`}
              >
                <motion.div 
                  className="w-4 h-4 rounded-full border border-border"
                  animate={{ backgroundColor: selectedColor }}
                  transition={{ duration: 0.3 }}
                />
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Palette className="w-4 h-4" />
                </motion.div>
                <span className="text-xs">Color</span>
              </Button>
            </PopoverTrigger>
            <AnimatePresence>
              {isOpen && (
                <PopoverContent className="w-64 p-0 overflow-hidden" align="start" asChild forceMount>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    <div className="p-3 space-y-3">
                      {/* Color Wheel Input */}
                      <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                      >
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <input
                            type="color"
                            value={selectedColor}
                            onChange={(e) => setSelectedColor(e.target.value)}
                            className="w-14 h-14 rounded-full cursor-pointer border-2 border-border p-0 bg-transparent"
                            style={{ WebkitAppearance: "none" }}
                            data-testid={`input-color-wheel-${font.id}`}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            animate={{
                              boxShadow: `0 0 20px ${selectedColor}40`,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pick a color</p>
                          <motion.p 
                            className="text-xs text-muted-foreground uppercase font-mono"
                            key={selectedColor}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            {selectedColor}
                          </motion.p>
                        </div>
                      </motion.div>

                      {/* Preset Colors Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, duration: 0.3 }}
                      >
                        <p className="text-xs text-muted-foreground mb-2">Presets</p>
                        <div className="grid grid-cols-8 gap-1.5">
                          {presetColors.map((color, index) => (
                            <motion.button
                              key={color}
                              onClick={() => setSelectedColor(color)}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ 
                                delay: 0.2 + index * 0.02,
                                duration: 0.2,
                                type: "spring",
                                stiffness: 500,
                                damping: 25
                              }}
                              whileHover={{ scale: 1.2, zIndex: 10 }}
                              whileTap={{ scale: 0.9 }}
                              className={cn(
                                "w-6 h-6 rounded-md transition-shadow duration-150 border",
                                selectedColor === color
                                  ? "ring-2 ring-offset-1 ring-primary border-white dark:border-gray-800"
                                  : "border-transparent"
                              )}
                              style={{ backgroundColor: color }}
                              title={color}
                              data-testid={`button-preset-${color.replace('#', '')}-${font.id}`}
                            />
                          ))}
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </PopoverContent>
              )}
            </AnimatePresence>
          </Popover>

          <motion.span 
            className="text-xs text-muted-foreground"
            animate={{ opacity: isOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          >
            Click to open color wheel
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

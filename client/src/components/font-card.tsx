import { useState } from "react";
import type { Font } from "@shared/schema";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette, Play, Bold, Italic, Underline } from "lucide-react";
import { Button } from "@/components/ui/button";

function FloralCorner({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 80 80" 
      className={cn("absolute w-16 h-16 pointer-events-none", className)}
      fill="currentColor"
    >
      <g>
        <path d="M 10 5 Q 15 10 10 15 Q 5 10 10 5" />
        <path d="M 20 8 Q 25 13 20 18 Q 15 13 20 8" />
        <path d="M 30 5 Q 35 10 30 15 Q 25 10 30 5" />
        <circle cx="10" cy="10" r="2" />
        <circle cx="20" cy="13" r="2.5" />
        <circle cx="30" cy="10" r="2" />
        <path d="M 5 20 Q 10 25 5 30 Q 0 25 5 20" />
        <path d="M 8 30 Q 13 35 8 40 Q 3 35 8 30" />
        <path d="M 5 40 Q 10 45 5 50 Q 0 45 5 40" />
        <circle cx="5" cy="25" r="2" />
        <circle cx="8" cy="35" r="2.5" />
        <circle cx="5" cy="45" r="2" />
        <path d="M 15 15 Q 20 20 15 25 Q 10 20 15 15" />
        <circle cx="15" cy="20" r="3" />
        <path d="M 0 0 L 50 0 Q 45 5 40 10 L 10 10 Q 5 15 0 20 Z" opacity="0.15" />
        <path d="M 25 20 C 30 25 35 30 40 25 C 45 20 50 15 45 10" strokeWidth="1" fill="none" stroke="currentColor" opacity="0.4" />
        <path d="M 20 25 C 25 30 30 35 35 30" strokeWidth="0.8" fill="none" stroke="currentColor" opacity="0.3" />
      </g>
    </svg>
  );
}

function VineEdge({ position }: { position: "top" | "bottom" | "left" | "right" }) {
  const isHorizontal = position === "top" || position === "bottom";
  
  return (
    <svg 
      viewBox={isHorizontal ? "0 0 200 20" : "0 0 20 200"}
      className={cn(
        "absolute pointer-events-none",
        isHorizontal ? "h-5 left-16 right-16" : "w-5 top-16 bottom-16",
        position === "top" && "top-0",
        position === "bottom" && "bottom-0 rotate-180",
        position === "left" && "left-0",
        position === "right" && "right-0 rotate-180"
      )}
      fill="currentColor"
      preserveAspectRatio="none"
    >
      {isHorizontal ? (
        <g>
          <path d="M 0 10 Q 10 5 20 10 T 40 10 T 60 10 T 80 10 T 100 10 T 120 10 T 140 10 T 160 10 T 180 10 T 200 10" 
                stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M 15 8 Q 18 5 15 2 Q 12 5 15 8" opacity="0.6" />
          <path d="M 45 12 Q 48 9 45 6 Q 42 9 45 12" opacity="0.6" />
          <path d="M 75 8 Q 78 5 75 2 Q 72 5 75 8" opacity="0.6" />
          <path d="M 105 12 Q 108 9 105 6 Q 102 9 105 12" opacity="0.6" />
          <path d="M 135 8 Q 138 5 135 2 Q 132 5 135 8" opacity="0.6" />
          <path d="M 165 12 Q 168 9 165 6 Q 162 9 165 12" opacity="0.6" />
          <circle cx="30" cy="10" r="1.5" opacity="0.4" />
          <circle cx="60" cy="10" r="1.5" opacity="0.4" />
          <circle cx="90" cy="10" r="1.5" opacity="0.4" />
          <circle cx="120" cy="10" r="1.5" opacity="0.4" />
          <circle cx="150" cy="10" r="1.5" opacity="0.4" />
          <circle cx="180" cy="10" r="1.5" opacity="0.4" />
        </g>
      ) : (
        <g>
          <path d="M 10 0 Q 5 10 10 20 T 10 40 T 10 60 T 10 80 T 10 100 T 10 120 T 10 140 T 10 160 T 10 180 T 10 200" 
                stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5" />
          <path d="M 8 15 Q 5 18 2 15 Q 5 12 8 15" opacity="0.6" />
          <path d="M 12 45 Q 9 48 6 45 Q 9 42 12 45" opacity="0.6" />
          <path d="M 8 75 Q 5 78 2 75 Q 5 72 8 75" opacity="0.6" />
          <path d="M 12 105 Q 9 108 6 105 Q 9 102 12 105" opacity="0.6" />
          <path d="M 8 135 Q 5 138 2 135 Q 5 132 8 135" opacity="0.6" />
          <path d="M 12 165 Q 9 168 6 165 Q 9 162 12 165" opacity="0.6" />
          <circle cx="10" cy="30" r="1.5" opacity="0.4" />
          <circle cx="10" cy="60" r="1.5" opacity="0.4" />
          <circle cx="10" cy="90" r="1.5" opacity="0.4" />
          <circle cx="10" cy="120" r="1.5" opacity="0.4" />
          <circle cx="10" cy="150" r="1.5" opacity="0.4" />
          <circle cx="10" cy="180" r="1.5" opacity="0.4" />
        </g>
      )}
    </svg>
  );
}

interface FontCardProps {
  font: Font;
  previewText: string;
  fontSize: number;
  index?: number;
  color: string;
  onColorChange: (color: string) => void;
}

const presetColors = [
  "#000000", "#475569", "#64748b", "#94a3b8",
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#06b6d4", "#3b82f6", "#6366f1",
  "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
];

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    scale: 0.6,
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 15,
      delay: index * 0.04,
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.6,
    y: -40,
    transition: {
      duration: 0.15,
    },
  },
  hover: {
    y: -10,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 600,
      damping: 15,
    },
  },
  tap: {
    scale: 0.95,
  },
};

const textAnimations = {
  bounce: {
    y: [0, -20, 0, -10, 0, -5, 0],
    transition: { duration: 0.6, ease: "easeOut" }
  },
  pulse: {
    scale: [1, 1.1, 1, 1.05, 1],
    transition: { duration: 0.5 }
  },
  shake: {
    x: [0, -10, 10, -10, 10, -5, 5, 0],
    transition: { duration: 0.5 }
  },
  flip: {
    rotateX: [0, 360],
    transition: { duration: 0.6 }
  },
  swing: {
    rotate: [0, 10, -10, 5, -5, 0],
    transition: { duration: 0.6 }
  },
};

export function FontCard({ font, previewText, fontSize, index = 0, color, onColorChange }: FontCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAnim, setCurrentAnim] = useState<keyof typeof textAnimations>("bounce");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const textControls = useAnimation();

  const playAnimation = async () => {
    await textControls.start(textAnimations[currentAnim]);
  };

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
      case "cursive":
        return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
      case "spooky":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300";
    }
  };

  return (
    <motion.div
      layout
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover="hover"
      whileTap="tap"
      custom={index}
      className={cn(
        "group relative flex flex-col h-full bg-card rounded-md",
        "shadow-sm cursor-pointer",
        "transition-shadow duration-300 ease-out overflow-visible",
        "border border-border/40"
      )}
      style={{ perspective: 1000 }}
      data-testid={`card-font-${font.id}`}
    >
      {/* Intricate floral corner decorations */}
      <FloralCorner className="top-0 left-0 text-foreground/80" />
      <FloralCorner className="top-0 right-0 text-foreground/80 -scale-x-100" />
      <FloralCorner className="bottom-0 left-0 text-foreground/80 -scale-y-100" />
      <FloralCorner className="bottom-0 right-0 text-foreground/80 -scale-x-100 -scale-y-100" />
      
      {/* Vine edges connecting the corners */}
      <div className="text-foreground/80">
        <VineEdge position="top" />
        <VineEdge position="bottom" />
        <VineEdge position="left" />
        <VineEdge position="right" />
      </div>

      {/* Animated glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-md opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        style={{
          background: `radial-gradient(circle at 50% 50%, ${color}15, transparent 70%)`,
        }}
      />

      {/* Header */}
      <motion.div 
        className="flex items-center justify-between gap-2 p-4 border-b border-border/40 bg-muted/20 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08 + 0.2, duration: 0.4 }}
      >
        <h3 className="font-semibold text-lg text-foreground tracking-tight truncate">
          {font.name}
        </h3>
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            delay: index * 0.08 + 0.3, 
            type: "spring",
            stiffness: 500,
            damping: 25
          }}
          className={cn(
            "text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full shrink-0",
            getCategoryBadgeStyle(font.category)
          )}
        >
          {font.category}
        </motion.span>
      </motion.div>

      {/* Preview Area */}
      <div className="flex-1 p-6 flex flex-col justify-center min-h-[180px] overflow-hidden bg-white/50 dark:bg-black/20 relative z-10">
        <motion.div
          className="break-words leading-tight origin-center"
          initial={{ opacity: 1 }}
          animate={textControls}
          style={{
            fontFamily: font.family,
            fontSize: `${fontSize}px`,
            color: color,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
          }}
        >
          {previewText || "The quick brown fox jumps over the lazy dog."}
        </motion.div>
      </div>

      {/* Controls */}
      <motion.div 
        className="px-4 py-3 border-t border-border/40 bg-muted/10 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04 + 0.15, duration: 0.3 }}
      >
        <div className="flex items-center gap-2 flex-wrap">
          {/* Text Effect Toggles */}
          <div className="flex items-center gap-1">
            <Button
              variant={isBold ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setIsBold(!isBold)}
              className="h-8 w-8"
              data-testid={`button-bold-${font.id}`}
            >
              <Bold className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={isItalic ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setIsItalic(!isItalic)}
              className="h-8 w-8"
              data-testid={`button-italic-${font.id}`}
            >
              <Italic className="w-3.5 h-3.5" />
            </Button>
            <Button
              variant={isUnderline ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setIsUnderline(!isUnderline)}
              className="h-8 w-8"
              data-testid={`button-underline-${font.id}`}
            >
              <Underline className="w-3.5 h-3.5" />
            </Button>
          </div>

          {/* Animation Button */}
          <Popover>
            <PopoverTrigger asChild>
              <Button 
                variant="default" 
                size="sm"
                className="gap-2"
                data-testid={`button-animate-${font.id}`}
              >
                <Play className="w-3 h-3" />
                <span className="text-xs">Animate</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-2" align="start">
              <div className="space-y-1">
                {(Object.keys(textAnimations) as Array<keyof typeof textAnimations>).map((anim) => (
                  <Button
                    key={anim}
                    variant={currentAnim === anim ? "secondary" : "ghost"}
                    size="sm"
                    className="w-full justify-start capitalize"
                    onClick={() => {
                      setCurrentAnim(anim);
                      textControls.start(textAnimations[anim]);
                    }}
                    data-testid={`button-anim-${anim}-${font.id}`}
                  >
                    <Play className="w-3 h-3 mr-2" />
                    {anim}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Color Picker */}
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
                  animate={{ 
                    backgroundColor: color,
                    boxShadow: isOpen ? `0 0 10px ${color}` : "none"
                  }}
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
                    initial={{ opacity: 0, scale: 0.8, y: -20, rotateX: -15 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 400,
                      damping: 25
                    }}
                  >
                    <div className="p-3 space-y-3">
                      {/* Color Wheel Input */}
                      <motion.div 
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
                      >
                        <motion.div
                          className="relative"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <input
                            type="color"
                            value={color}
                            onChange={(e) => onColorChange(e.target.value)}
                            className="w-14 h-14 rounded-full cursor-pointer border-2 border-border p-0 bg-transparent"
                            style={{ WebkitAppearance: "none" }}
                            data-testid={`input-color-wheel-${font.id}`}
                          />
                          <motion.div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            animate={{
                              boxShadow: `0 0 25px ${color}60`,
                            }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Pick a color</p>
                          <motion.p 
                            className="text-xs text-muted-foreground uppercase font-mono"
                            key={color}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          >
                            {color}
                          </motion.p>
                        </div>
                      </motion.div>

                      {/* Preset Colors Grid */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15, type: "spring", stiffness: 300 }}
                      >
                        <p className="text-xs text-muted-foreground mb-2">Presets</p>
                        <div className="grid grid-cols-8 gap-1.5">
                          {presetColors.map((presetColor, i) => (
                            <motion.button
                              key={presetColor}
                              onClick={() => onColorChange(presetColor)}
                              initial={{ opacity: 0, scale: 0, rotate: -180 }}
                              animate={{ opacity: 1, scale: 1, rotate: 0 }}
                              transition={{ 
                                delay: 0.2 + i * 0.03,
                                type: "spring",
                                stiffness: 500,
                                damping: 20
                              }}
                              whileHover={{ 
                                scale: 1.3, 
                                zIndex: 10,
                                rotate: 10,
                                transition: { duration: 0.15 }
                              }}
                              whileTap={{ scale: 0.8 }}
                              className={cn(
                                "w-6 h-6 rounded-md border",
                                color === presetColor
                                  ? "ring-2 ring-offset-1 ring-primary border-white dark:border-gray-800"
                                  : "border-transparent"
                              )}
                              style={{ backgroundColor: presetColor }}
                              title={presetColor}
                              data-testid={`button-preset-${presetColor.replace('#', '')}-${font.id}`}
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

        </div>
      </motion.div>
    </motion.div>
  );
}

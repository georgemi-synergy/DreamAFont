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

function VineBorder() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 300 400"
      fill="none"
      preserveAspectRatio="none"
    >
      <g stroke="currentColor" strokeWidth="2" opacity="1">
        <path d="M 10 5 Q 30 12 50 5 T 90 5 T 130 5 T 170 5 T 210 5 T 250 5 T 290 5
                 Q 295 5 295 10 
                 Q 288 30 295 50 T 295 90 T 295 130 T 295 170 T 295 210 T 295 250 T 295 290 T 295 330 T 295 370 T 295 390
                 Q 295 395 290 395
                 Q 270 388 250 395 T 210 395 T 170 395 T 130 395 T 90 395 T 50 395 T 10 395
                 Q 5 395 5 390
                 Q 12 370 5 350 T 5 310 T 5 270 T 5 230 T 5 190 T 5 150 T 5 110 T 5 70 T 5 30 T 5 10
                 Q 5 5 10 5" />
      </g>
      <g fill="currentColor" opacity="0.9">
        <path d="M 30 3 Q 35 8 30 13 Q 25 8 30 3" />
        <path d="M 70 7 Q 75 12 70 17 Q 65 12 70 7" />
        <path d="M 110 3 Q 115 8 110 13 Q 105 8 110 3" />
        <path d="M 150 7 Q 155 12 150 17 Q 145 12 150 7" />
        <path d="M 190 3 Q 195 8 190 13 Q 185 8 190 3" />
        <path d="M 230 7 Q 235 12 230 17 Q 225 12 230 7" />
        <path d="M 270 3 Q 275 8 270 13 Q 265 8 270 3" />
        
        <path d="M 297 30 Q 292 35 287 30 Q 292 25 297 30" />
        <path d="M 293 70 Q 288 75 283 70 Q 288 65 293 70" />
        <path d="M 297 110 Q 292 115 287 110 Q 292 105 297 110" />
        <path d="M 293 150 Q 288 155 283 150 Q 288 145 293 150" />
        <path d="M 297 190 Q 292 195 287 190 Q 292 185 297 190" />
        <path d="M 293 230 Q 288 235 283 230 Q 288 225 293 230" />
        <path d="M 297 270 Q 292 275 287 270 Q 292 265 297 270" />
        <path d="M 293 310 Q 288 315 283 310 Q 288 305 293 310" />
        <path d="M 297 350 Q 292 355 287 350 Q 292 345 297 350" />
        
        <path d="M 270 397 Q 275 392 270 387 Q 265 392 270 397" />
        <path d="M 230 393 Q 235 388 230 383 Q 225 388 230 393" />
        <path d="M 190 397 Q 195 392 190 387 Q 185 392 190 397" />
        <path d="M 150 393 Q 155 388 150 383 Q 145 388 150 393" />
        <path d="M 110 397 Q 115 392 110 387 Q 105 392 110 397" />
        <path d="M 70 393 Q 75 388 70 383 Q 65 388 70 393" />
        <path d="M 30 397 Q 35 392 30 387 Q 25 392 30 397" />
        
        <path d="M 3 370 Q 8 365 13 370 Q 8 375 3 370" />
        <path d="M 7 330 Q 12 325 17 330 Q 12 335 7 330" />
        <path d="M 3 290 Q 8 285 13 290 Q 8 295 3 290" />
        <path d="M 7 250 Q 12 245 17 250 Q 12 255 7 250" />
        <path d="M 3 210 Q 8 205 13 210 Q 8 215 3 210" />
        <path d="M 7 170 Q 12 165 17 170 Q 12 175 7 170" />
        <path d="M 3 130 Q 8 125 13 130 Q 8 135 3 130" />
        <path d="M 7 90 Q 12 85 17 90 Q 12 95 7 90" />
        <path d="M 3 50 Q 8 45 13 50 Q 8 55 3 50" />
      </g>
      <g fill="currentColor" opacity="0.8">
        <circle cx="50" cy="5" r="2" />
        <circle cx="130" cy="5" r="2" />
        <circle cx="210" cy="5" r="2" />
        <circle cx="295" cy="50" r="2" />
        <circle cx="295" cy="130" r="2" />
        <circle cx="295" cy="210" r="2" />
        <circle cx="295" cy="290" r="2" />
        <circle cx="250" cy="395" r="2" />
        <circle cx="170" cy="395" r="2" />
        <circle cx="90" cy="395" r="2" />
        <circle cx="5" cy="350" r="2" />
        <circle cx="5" cy="270" r="2" />
        <circle cx="5" cy="190" r="2" />
        <circle cx="5" cy="110" r="2" />
      </g>
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
      {/* Continuous vine border around the whole card */}
      <div className="text-foreground">
        <VineBorder />
      </div>
      
      {/* Floral corner accents */}
      <FloralCorner className="top-0 left-0 text-foreground z-10" />
      <FloralCorner className="top-0 right-0 text-foreground -scale-x-100 z-10" />
      <FloralCorner className="bottom-0 left-0 text-foreground -scale-y-100 z-10" />
      <FloralCorner className="bottom-0 right-0 text-foreground -scale-x-100 -scale-y-100 z-10" />

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

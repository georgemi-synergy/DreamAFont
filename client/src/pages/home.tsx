import { useState, useRef, useEffect } from "react";
import { useFonts } from "@/hooks/use-fonts";
import { FontCard } from "@/components/font-card";
import { Toolbar, ProjectPreset } from "@/components/toolbar";
import { LoadingGrid } from "@/components/loading-skeleton";
import { AlertCircle, Search, Volume2, VolumeX, Moon, Sun, Sparkles, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import pinkFlowersWallpaper from "@assets/generated_images/pink_flowers_wallpaper_pattern.png";
import starsAndMoonsWallpaper from "@assets/generated_images/stars_and_moons_night_pattern.png";
import dreamyMusic from "@assets/dreamy-ambient.mp3";
import confetti from "canvas-confetti";
import { playSuccessSound, playWhooshSound, playSparkleSound, playClickSound, playMagicSound } from "@/lib/sounds";

export default function Home() {
  const { data: fonts, isLoading, error } = useFonts();
  
  const [text, setText] = useState("Dream of a font and it will be here.");
  const [fontSize, setFontSize] = useState(32);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [globalColor, setGlobalColor] = useState("#000000");
  const [aiStyles, setAiStyles] = useState<React.CSSProperties>({});
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('dreamafont-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('dreamafont-theme');
    return saved === 'dark';
  });
  const [highlightedFontId, setHighlightedFontId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    localStorage.setItem('dreamafont-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('dreamafont-theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleFavorite = (fontId: number) => {
    const isAdding = !favorites.includes(fontId);
    setFavorites(prev => 
      prev.includes(fontId) 
        ? prev.filter(id => id !== fontId)
        : [...prev, fontId]
    );
    
    if (isAdding) {
      playSuccessSound();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#ff69b4', '#ff1493', '#db7093', '#ffb6c1', '#ffc0cb']
      });
    } else {
      playClickSound();
    }
  };

  const surpriseMe = () => {
    if (!filteredFonts?.length) return;
    
    const randomIndex = Math.floor(Math.random() * filteredFonts.length);
    const randomFont = filteredFonts[randomIndex];
    
    playMagicSound();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#ec4899', '#f97316', '#22c55e', '#3b82f6']
    });
    
    setHighlightedFontId(randomFont.id);
    
    setTimeout(() => {
      playWhooshSound();
      const cardElement = document.querySelector(`[data-testid="card-font-${randomFont.id}"]`);
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    
    setTimeout(() => {
      setHighlightedFontId(null);
    }, 3000);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleApplyPreset = (preset: ProjectPreset | null) => {
    if (preset === null) {
      // Reset to defaults
      setCategory("all");
      setSearch("");
      setFontSize(32);
      setGlobalColor("#000000");
      setShowFavorites(false);
    } else {
      setCategory(preset.category);
      setSearch(preset.searchTerm);
      setFontSize(preset.fontSize);
      setGlobalColor(preset.color);
      setShowFavorites(false);
    }
  };

  const filteredFonts = fonts?.filter(font => {
    const matchesCategory = category === "all" || font.category === category;
    const matchesSearch = font.name.toLowerCase().includes(search.toLowerCase());
    const matchesFavorites = !showFavorites || favorites.includes(font.id);
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  if (error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background p-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="bg-destructive/10 p-4 rounded-full w-fit mx-auto">
            <AlertCircle className="w-12 h-12 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Failed to load fonts</h2>
          <p className="text-muted-foreground">
            We couldn't connect to the server to fetch the font library. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Background Music */}
      <audio ref={audioRef} src={dreamyMusic} loop />
      
      {/* Floating Stars Animation */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-yellow-400/30 dark:text-yellow-300/20"
            style={{
              left: `${10 + (i * 12) % 80}%`,
              top: `${15 + (i * 17) % 70}%`,
            }}
            animate={{ 
              y: [0, -60 - i * 10, 0],
              x: [0, 30 - i * 8, 0],
              rotate: [0, 360],
              scale: [0.6 + i * 0.05, 1, 0.6 + i * 0.05]
            }}
            transition={{ 
              duration: 8 + i * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: i * 0.5
            }}
          >
            <Star className="w-6 h-6 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Header / Brand */}
      <header className="bg-background pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-border/40 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Dream a Font
            </motion.h1>
            <motion.p 
              className="text-muted-foreground mt-2 text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Do you want a fancy font or animation for work or school? Well you've come to the right place.
            </motion.p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={surpriseMe}
              disabled={isLoading || !filteredFonts?.length}
              className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-200 dark:border-purple-800/40 hover:from-purple-200 hover:to-pink-200 dark:hover:from-purple-900/50 dark:hover:to-pink-900/50"
              data-testid="button-surprise-me"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Surprise Me!
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsDark(!isDark)}
              className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/40"
              data-testid="button-toggle-theme"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMusic}
              className="bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/40"
              data-testid="button-toggle-music"
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>
            <div className="text-sm font-medium text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/40">
              {isLoading ? "Loading library..." : `${fonts?.length || 0} fonts available`}
            </div>
          </div>
        </div>
      </header>

      {/* Toolbar Controls */}
      <Toolbar 
        text={text}
        setText={setText}
        fontSize={fontSize}
        setFontSize={setFontSize}
        category={category}
        setCategory={setCategory}
        search={search}
        setSearch={setSearch}
        aiStyles={aiStyles}
        setAiStyles={setAiStyles}
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        favoritesCount={favorites.length}
        onApplyPreset={handleApplyPreset}
      />

      {/* Main Grid */}
      <main 
        className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500"
        style={{
          backgroundImage: `url(${isDark ? starsAndMoonsWallpaper : pinkFlowersWallpaper})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
        }}
      >
        <div className="max-w-7xl mx-auto">
        {isLoading ? (
          <LoadingGrid />
        ) : (
          <div className="min-h-[50vh]">
             {!filteredFonts?.length ? (
               <div className="flex flex-col items-center justify-center py-20 text-center text-muted-foreground">
                 <Search className="w-16 h-16 mb-4 opacity-40" />
                 <h3 className="text-xl font-semibold">No fonts found</h3>
                 <p>Try adjusting your search or category filters.</p>
               </div>
             ) : (
               <motion.div 
                 layout
                 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
               >
                 <AnimatePresence mode="popLayout">
                   {filteredFonts.map((font, index) => (
                     <FontCard
                       key={font.id}
                       font={font}
                       previewText={text}
                       fontSize={fontSize}
                       index={index}
                       color={globalColor}
                       onColorChange={setGlobalColor}
                       aiStyles={aiStyles}
                       isFavorite={favorites.includes(font.id)}
                       onToggleFavorite={toggleFavorite}
                       isHighlighted={highlightedFontId === font.id}
                     />
                   ))}
                 </AnimatePresence>
               </motion.div>
             )}
          </div>
        )}
        </div>
      </main>

      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-muted/10">
        <p>Designed with precision. Powered by Google Fonts.</p>
      </footer>
    </div>
  );
}

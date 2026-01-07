import { useState } from "react";
import { useFonts } from "@/hooks/use-fonts";
import { FontCard } from "@/components/font-card";
import { Toolbar } from "@/components/toolbar";
import { LoadingGrid } from "@/components/loading-skeleton";
import { AlertCircle, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { data: fonts, isLoading, error } = useFonts();
  
  const [text, setText] = useState("The quick brown fox jumps over the lazy dog.");
  const [fontSize, setFontSize] = useState(32);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [globalColor, setGlobalColor] = useState("#000000");

  const filteredFonts = fonts?.filter(font => {
    const matchesCategory = category === "all" || font.category === category;
    const matchesSearch = font.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
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
      {/* Header / Brand */}
      <header className="bg-background pt-8 pb-6 px-4 sm:px-6 lg:px-8 border-b border-border/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end md:items-center gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              TypeScale
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">
              Explore and preview Google Fonts in real-time.
            </p>
          </div>
          <div className="text-sm font-medium text-muted-foreground bg-muted/30 px-4 py-2 rounded-full border border-border/40">
            {isLoading ? "Loading library..." : `${fonts?.length || 0} fonts available`}
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
      />

      {/* Main Grid */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
                     />
                   ))}
                 </AnimatePresence>
               </motion.div>
             )}
          </div>
        )}
      </main>

      <footer className="border-t border-border/40 py-8 text-center text-sm text-muted-foreground bg-muted/10">
        <p>Designed with precision. Powered by Google Fonts.</p>
      </footer>
    </div>
  );
}

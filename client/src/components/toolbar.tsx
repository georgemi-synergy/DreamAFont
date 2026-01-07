import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Type, ALargeSmall, Search, Sparkles, Loader2, Heart } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";

interface ToolbarProps {
  text: string;
  setText: (val: string) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
  category: string;
  setCategory: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
  aiStyles: React.CSSProperties;
  setAiStyles: (styles: React.CSSProperties) => void;
  showFavorites: boolean;
  setShowFavorites: (val: boolean) => void;
  favoritesCount: number;
}

const fontSizePresets = [
  { label: "Body", size: 18 },
  { label: "Subheading", size: 28 },
  { label: "Heading", size: 48 },
  { label: "Display", size: 72 },
];

export function Toolbar({
  text,
  setText,
  fontSize,
  setFontSize,
  category,
  setCategory,
  search,
  setSearch,
  aiStyles,
  setAiStyles,
  showFavorites,
  setShowFavorites,
  favoritesCount
}: ToolbarProps) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAiEffect = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    try {
      const response = await apiRequest("POST", "/api/ai/text-effect", { prompt: aiPrompt });
      const data = await response.json();
      if (data.styles) {
        setAiStyles(data.styles);
      }
    } catch (error) {
      console.error("Failed to generate AI effect:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const clearAiEffect = () => {
    setAiStyles({});
    setAiPrompt("");
  };

  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="mb-4 bg-green-100 dark:bg-green-900/30">
            <TabsTrigger 
              value="basic" 
              data-testid="tab-basic"
              className="data-[state=active]:bg-green-200 data-[state=active]:text-green-800 dark:data-[state=active]:bg-green-800 dark:data-[state=active]:text-green-100"
            >
              <Type className="w-4 h-4 mr-2" />
              Basic
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              data-testid="tab-ai"
              className="data-[state=active]:bg-green-200 data-[state=active]:text-green-800 dark:data-[state=active]:bg-green-800 dark:data-[state=active]:text-green-100"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 md:space-y-0 md:flex md:items-center md:gap-6">
            {/* Text Input */}
            <div className="flex-1 min-w-[300px] relative group">
              <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400 group-focus-within:text-pink-500 transition-colors" />
              <Input 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type something to preview..."
                className="pl-9 h-11 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/40 focus:bg-pink-50 dark:focus:bg-pink-900/30 transition-all"
                data-testid="input-preview-text"
              />
            </div>

            {/* Controls Container */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              
              {/* Font Size Presets */}
              <div className="flex items-center gap-1 bg-pink-50 dark:bg-pink-900/20 px-2 py-1.5 rounded-lg border border-pink-200 dark:border-pink-800/40">
                {fontSizePresets.map(preset => (
                  <Button
                    key={preset.label}
                    variant={fontSize === preset.size ? "secondary" : "ghost"}
                    size="sm"
                    onClick={() => setFontSize(preset.size)}
                    className="text-xs px-2"
                    data-testid={`button-preset-${preset.label.toLowerCase()}`}
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>

              {/* Font Size Slider */}
              <div className="flex items-center gap-3 min-w-[150px] bg-pink-50 dark:bg-pink-900/20 px-3 py-2 rounded-lg border border-pink-200 dark:border-pink-800/40">
                <ALargeSmall className="w-4 h-4 text-pink-400" />
                <Slider
                  value={[fontSize]}
                  onValueChange={(vals) => setFontSize(vals[0])}
                  min={12}
                  max={120}
                  step={1}
                  className="w-full"
                  data-testid="slider-font-size"
                />
                <span className="text-xs font-mono w-8 text-right text-pink-500 dark:text-pink-300">
                  {fontSize}px
                </span>
              </div>

              {/* Category Filter */}
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[150px] h-11 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/40" data-testid="select-category">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-pink-50 dark:bg-pink-950">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Sans-serif">Sans Serif</SelectItem>
                  <SelectItem value="Serif">Serif</SelectItem>
                  <SelectItem value="Monospace">Monospace</SelectItem>
                  <SelectItem value="Display">Display</SelectItem>
                  <SelectItem value="Cursive">Cursive</SelectItem>
                  <SelectItem value="Spooky">Spooky</SelectItem>
                </SelectContent>
              </Select>
              
              {/* Font Name Search */}
               <div className="relative w-full sm:w-[200px]">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pink-400" />
                 <Input 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search fonts..."
                  className="pl-9 h-11 bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/40 focus:bg-pink-50 dark:focus:bg-pink-900/30"
                  data-testid="input-search-fonts"
                 />
               </div>

              {/* Favorites Toggle */}
              <Button
                variant={showFavorites ? "default" : "outline"}
                size="default"
                onClick={() => setShowFavorites(!showFavorites)}
                className={cn(
                  "gap-2",
                  showFavorites 
                    ? "bg-red-500 hover:bg-red-600 text-white" 
                    : "bg-pink-50 dark:bg-pink-900/20 border-pink-200 dark:border-pink-800/40"
                )}
                data-testid="button-toggle-favorites"
              >
                <Heart className={cn("w-4 h-4", showFavorites && "fill-white")} />
                <span className="text-xs">{favoritesCount}</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
              <div className="flex-1 w-full relative group">
                <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input 
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && generateAiEffect()}
                  placeholder="Describe a text effect... (e.g., 'balloon looking text', 'make it look like brick', 'neon glow')"
                  className="pl-9 h-11 bg-muted/40 border-border/60 focus:bg-background transition-all"
                  data-testid="input-ai-prompt"
                />
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={generateAiEffect}
                  disabled={isGenerating || !aiPrompt.trim()}
                  data-testid="button-generate-ai"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Effect
                    </>
                  )}
                </Button>
                {Object.keys(aiStyles).length > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={clearAiEffect}
                    data-testid="button-clear-ai"
                  >
                    Clear Effect
                  </Button>
                )}
              </div>
            </div>
            {Object.keys(aiStyles).length > 0 && (
              <div className="p-3 bg-muted/30 rounded-lg border border-border/40">
                <p className="text-sm text-muted-foreground mb-2">Active AI Effect:</p>
                <div 
                  className="text-2xl font-bold"
                  style={aiStyles}
                >
                  Preview Text
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

import { Slider } from "@/components/ui/slider";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Type, ALargeSmall, Search } from "lucide-react";

interface ToolbarProps {
  text: string;
  setText: (val: string) => void;
  fontSize: number;
  setFontSize: (val: number) => void;
  category: string;
  setCategory: (val: string) => void;
  search: string;
  setSearch: (val: string) => void;
}

export function Toolbar({
  text,
  setText,
  fontSize,
  setFontSize,
  category,
  setCategory,
  search,
  setSearch
}: ToolbarProps) {
  return (
    <div className="sticky top-0 z-50 w-full backdrop-blur-xl bg-background/80 border-b border-border/60 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4 md:space-y-0 md:flex md:items-center md:gap-6">
        
        {/* Text Input */}
        <div className="flex-1 min-w-[300px] relative group">
          <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <Input 
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type something to preview..."
            className="pl-9 h-11 bg-muted/40 border-border/60 focus:bg-background transition-all"
          />
        </div>

        {/* Controls Container */}
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          
          {/* Font Size Slider */}
          <div className="flex items-center gap-3 min-w-[180px] bg-muted/30 px-3 py-2 rounded-lg border border-border/40">
            <ALargeSmall className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[fontSize]}
              onValueChange={(vals) => setFontSize(vals[0])}
              min={12}
              max={120}
              step={1}
              className="w-full"
            />
            <span className="text-xs font-mono w-8 text-right text-muted-foreground">
              {fontSize}px
            </span>
          </div>

          {/* Category Filter */}
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full sm:w-[150px] h-11 bg-muted/30 border-border/40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="sans-serif">Sans Serif</SelectItem>
              <SelectItem value="display">Display</SelectItem>
              <SelectItem value="mono">Monospace</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Font Name Search */}
           <div className="relative w-full sm:w-[200px]">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
             <Input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search fonts..."
              className="pl-9 h-11 bg-muted/30 border-border/40 focus:bg-background"
             />
           </div>
        </div>

      </div>
    </div>
  );
}

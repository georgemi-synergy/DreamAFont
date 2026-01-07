import { type Font, type InsertFont } from "@shared/schema";

export interface IStorage {
  getFonts(): Promise<Font[]>;
  seedFonts(): Promise<void>;
}

export class MemStorage implements IStorage {
  private fonts: Font[];
  private idCounter: number;

  constructor() {
    this.fonts = [];
    this.idCounter = 1;
  }

  async getFonts(): Promise<Font[]> {
    return this.fonts;
  }

  async seedFonts(): Promise<void> {
    if (this.fonts.length > 0) return;

    const seedData: Omit<Font, "id">[] = [
      // Sans-serif
      { name: "Inter", family: "Inter", category: "Sans-serif" },
      { name: "Roboto", family: "Roboto", category: "Sans-serif" },
      { name: "Open Sans", family: "Open Sans", category: "Sans-serif" },
      { name: "Montserrat", family: "Montserrat", category: "Sans-serif" },
      { name: "DM Sans", family: "DM Sans", category: "Sans-serif" },
      { name: "Plus Jakarta Sans", family: "Plus Jakarta Sans", category: "Sans-serif" },
      { name: "Outfit", family: "Outfit", category: "Sans-serif" },
      { name: "IBM Plex Sans", family: "IBM Plex Sans", category: "Sans-serif" },
      { name: "Geist", family: "Geist", category: "Sans-serif" },
      { name: "Poppins", family: "Poppins", category: "Sans-serif" },
      { name: "Lato", family: "Lato", category: "Sans-serif" },
      { name: "Nunito", family: "Nunito", category: "Sans-serif" },
      { name: "Raleway", family: "Raleway", category: "Sans-serif" },
      { name: "Work Sans", family: "Work Sans", category: "Sans-serif" },
      { name: "Quicksand", family: "Quicksand", category: "Sans-serif" },
      { name: "Mulish", family: "Mulish", category: "Sans-serif" },
      { name: "Oswald", family: "Oswald", category: "Sans-serif" },
      { name: "Rubik", family: "Rubik", category: "Sans-serif" },
      { name: "Manrope", family: "Manrope", category: "Sans-serif" },
      
      // Serif
      { name: "Playfair Display", family: "Playfair Display", category: "Serif" },
      { name: "Lora", family: "Lora", category: "Serif" },
      { name: "Merriweather", family: "Merriweather", category: "Serif" },
      { name: "Libre Baskerville", family: "Libre Baskerville", category: "Serif" },
      { name: "Source Serif 4", family: "Source Serif 4", category: "Serif" },
      { name: "Cormorant Garamond", family: "Cormorant Garamond", category: "Serif" },
      { name: "Crimson Text", family: "Crimson Text", category: "Serif" },
      { name: "EB Garamond", family: "EB Garamond", category: "Serif" },
      { name: "Bitter", family: "Bitter", category: "Serif" },
      { name: "Spectral", family: "Spectral", category: "Serif" },
      { name: "Cinzel", family: "Cinzel", category: "Serif" },
      { name: "Vollkorn", family: "Vollkorn", category: "Serif" },
      
      // Monospace
      { name: "Fira Code", family: "Fira Code", category: "Monospace" },
      { name: "Roboto Mono", family: "Roboto Mono", category: "Monospace" },
      { name: "JetBrains Mono", family: "JetBrains Mono", category: "Monospace" },
      { name: "Space Mono", family: "Space Mono", category: "Monospace" },
      { name: "Source Code Pro", family: "Source Code Pro", category: "Monospace" },
      { name: "IBM Plex Mono", family: "IBM Plex Mono", category: "Monospace" },
      { name: "Geist Mono", family: "Geist Mono", category: "Monospace" },
      { name: "Inconsolata", family: "Inconsolata", category: "Monospace" },
      { name: "Ubuntu Mono", family: "Ubuntu Mono", category: "Monospace" },
      
      // Display
      { name: "Architects Daughter", family: "Architects Daughter", category: "Display" },
      { name: "Oxanium", family: "Oxanium", category: "Display" },
      { name: "Space Grotesk", family: "Space Grotesk", category: "Display" },
      { name: "Permanent Marker", family: "Permanent Marker", category: "Display" },
      { name: "Rock Salt", family: "Rock Salt", category: "Display" },
      { name: "Bangers", family: "Bangers", category: "Display" },
      { name: "Fredoka", family: "Fredoka", category: "Display" },
      { name: "Righteous", family: "Righteous", category: "Display" },
      { name: "Monoton", family: "Monoton", category: "Display" },
      { name: "Bungee Shade", family: "Bungee Shade", category: "Display" },
      { name: "Bebas Neue", family: "Bebas Neue", category: "Display" },
      { name: "Anton", family: "Anton", category: "Display" },
      { name: "Comfortaa", family: "Comfortaa", category: "Display" },
      { name: "Abril Fatface", family: "Abril Fatface", category: "Display" },
      { name: "Alfa Slab One", family: "Alfa Slab One", category: "Display" },
      { name: "Russo One", family: "Russo One", category: "Display" },
      { name: "Black Ops One", family: "Black Ops One", category: "Display" },
      { name: "Bungee", family: "Bungee", category: "Display" },
      { name: "Press Start 2P", family: "Press Start 2P", category: "Display" },
      { name: "Orbitron", family: "Orbitron", category: "Display" },
      
      // Cursive / Handwriting
      { name: "Dancing Script", family: "Dancing Script", category: "Cursive" },
      { name: "Pacifico", family: "Pacifico", category: "Cursive" },
      { name: "Great Vibes", family: "Great Vibes", category: "Cursive" },
      { name: "Satisfy", family: "Satisfy", category: "Cursive" },
      { name: "Sacramento", family: "Sacramento", category: "Cursive" },
      { name: "Lobster", family: "Lobster", category: "Cursive" },
      { name: "Caveat", family: "Caveat", category: "Cursive" },
      { name: "Kaushan Script", family: "Kaushan Script", category: "Cursive" },
      { name: "Cookie", family: "Cookie", category: "Cursive" },
      { name: "Allura", family: "Allura", category: "Cursive" },
      { name: "Tangerine", family: "Tangerine", category: "Cursive" },
      { name: "Amatic SC", family: "Amatic SC", category: "Cursive" },
      { name: "Indie Flower", family: "Indie Flower", category: "Cursive" },
      { name: "Shadows Into Light", family: "Shadows Into Light", category: "Cursive" },
      { name: "Patrick Hand", family: "Patrick Hand", category: "Cursive" },
      { name: "Gloria Hallelujah", family: "Gloria Hallelujah", category: "Cursive" },
      { name: "Handlee", family: "Handlee", category: "Cursive" },
      { name: "Yellowtail", family: "Yellowtail", category: "Cursive" },
      
      // Spooky / Monster
      { name: "Creepster", family: "Creepster", category: "Spooky" },
      { name: "Nosifer", family: "Nosifer", category: "Spooky" },
      { name: "Rubik Glitch", family: "Rubik Glitch", category: "Spooky" },
      { name: "Butcherman", family: "Butcherman", category: "Spooky" },
      { name: "Eater", family: "Eater", category: "Spooky" },
      { name: "Metal Mania", family: "Metal Mania", category: "Spooky" },
      { name: "Freckle Face", family: "Freckle Face", category: "Spooky" },
      
      // More fonts
      { name: "Josefin Sans", family: "Josefin Sans", category: "Sans-serif" },
      { name: "Barlow", family: "Barlow", category: "Sans-serif" },
      { name: "Karla", family: "Karla", category: "Sans-serif" },
      { name: "Noto Sans", family: "Noto Sans", category: "Sans-serif" },
      { name: "PT Sans", family: "PT Sans", category: "Sans-serif" },
      { name: "Cabin", family: "Cabin", category: "Sans-serif" },
      { name: "Archivo", family: "Archivo", category: "Sans-serif" },
      { name: "Lexend", family: "Lexend", category: "Sans-serif" },
      { name: "Exo 2", family: "Exo 2", category: "Sans-serif" },
      { name: "Philosopher", family: "Philosopher", category: "Serif" },
      { name: "Marcellus", family: "Marcellus", category: "Serif" },
      { name: "Cardo", family: "Cardo", category: "Serif" },
      { name: "Antic Slab", family: "Antic Slab", category: "Serif" },
      { name: "Arvo", family: "Arvo", category: "Serif" },
      { name: "Zilla Slab", family: "Zilla Slab", category: "Serif" },
    ];

    seedData.forEach(font => {
      this.fonts.push({ ...font, id: this.idCounter++ });
    });
  }
}

export const storage = new MemStorage();

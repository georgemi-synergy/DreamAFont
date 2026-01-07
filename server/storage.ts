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
      
      // Serif
      { name: "Playfair Display", family: "Playfair Display", category: "Serif" },
      { name: "Lora", family: "Lora", category: "Serif" },
      { name: "Merriweather", family: "Merriweather", category: "Serif" },
      { name: "Libre Baskerville", family: "Libre Baskerville", category: "Serif" },
      { name: "Source Serif 4", family: "Source Serif 4", category: "Serif" },
      
      // Monospace
      { name: "Fira Code", family: "Fira Code", category: "Monospace" },
      { name: "Roboto Mono", family: "Roboto Mono", category: "Monospace" },
      { name: "JetBrains Mono", family: "JetBrains Mono", category: "Monospace" },
      { name: "Space Mono", family: "Space Mono", category: "Monospace" },
      { name: "Source Code Pro", family: "Source Code Pro", category: "Monospace" },
      { name: "IBM Plex Mono", family: "IBM Plex Mono", category: "Monospace" },
      { name: "Geist Mono", family: "Geist Mono", category: "Monospace" },
      
      // Display
      { name: "Architects Daughter", family: "Architects Daughter", category: "Display" },
      { name: "Oxanium", family: "Oxanium", category: "Display" },
      { name: "Space Grotesk", family: "Space Grotesk", category: "Display" },
    ];

    seedData.forEach(font => {
      this.fonts.push({ ...font, id: this.idCounter++ });
    });
  }
}

export const storage = new MemStorage();

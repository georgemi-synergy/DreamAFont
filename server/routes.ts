import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed the fonts into memory
  await storage.seedFonts();

  app.get(api.fonts.list.path, async (req, res) => {
    const fonts = await storage.getFonts();
    res.json(fonts);
  });

  return httpServer;
}

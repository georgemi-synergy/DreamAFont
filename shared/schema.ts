import { pgTable, text, serial, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const fonts = pgTable("fonts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  family: text("family").notNull(),
  category: text("category").notNull(), // serif, sans-serif, mono, display
});

export const insertFontSchema = createInsertSchema(fonts).omit({ id: true });

export type Font = typeof fonts.$inferSelect;
export type InsertFont = z.infer<typeof insertFontSchema>;

export type FontResponse = Font;

import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
  baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
});

// Whitelist of safe CSS properties for AI-generated styles
const ALLOWED_CSS_PROPERTIES = new Set([
  'textShadow',
  'color',
  'background',
  'backgroundClip',
  'WebkitBackgroundClip',
  'WebkitTextFillColor',
  'filter',
  'transform',
  'letterSpacing',
  'fontWeight',
  'opacity',
  'textStroke',
  'WebkitTextStroke',
]);

// Sanitize AI-generated styles to prevent CSS injection
function sanitizeStyles(styles: Record<string, unknown>): Record<string, string> {
  const sanitized: Record<string, string> = {};
  
  for (const [key, value] of Object.entries(styles)) {
    // Only allow whitelisted properties
    if (!ALLOWED_CSS_PROPERTIES.has(key)) {
      continue;
    }
    
    // Value must be a string
    if (typeof value !== 'string') {
      continue;
    }
    
    // Block dangerous patterns
    const dangerousPatterns = [
      /url\s*\(/i,           // url() can load external resources
      /expression\s*\(/i,    // IE expression()
      /javascript:/i,        // javascript: URIs
      /behavior:/i,          // IE behavior
      /@import/i,            // @import rules
      /binding:/i,           // Mozilla binding
    ];
    
    if (dangerousPatterns.some(pattern => pattern.test(value))) {
      continue;
    }
    
    sanitized[key] = value;
  }
  
  return sanitized;
}

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

  // AI text effect generation endpoint
  app.post("/api/ai/text-effect", async (req, res) => {
    try {
      const { prompt } = req.body;
      
      if (!prompt) {
        return res.status(400).json({ error: "Prompt is required" });
      }

      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are a CSS text styling expert. Given a user's description of how they want text to look, generate CSS styles that create that effect. Return ONLY a valid JSON object with these properties:
- textShadow: CSS text-shadow value (can be multiple shadows separated by commas)
- color: CSS color value (can be gradient using background + backgroundClip)
- background: optional CSS background value for gradient text
- backgroundClip: set to "text" if using gradient
- WebkitBackgroundClip: set to "text" if using gradient
- WebkitTextFillColor: set to "transparent" if using gradient
- filter: optional CSS filter effects
- transform: optional CSS transform
- letterSpacing: optional letter spacing
- fontWeight: optional font weight

Be creative! For effects like "balloon", use rounded shadows and bright colors. For "brick", use blocky shadows and earthy tones. For "neon", use glowing shadows. For "3D", use layered shadows for depth.

Example for "balloon looking text":
{"textShadow": "2px 2px 0 #ff69b4, 4px 4px 0 #ff1493, 6px 6px 10px rgba(0,0,0,0.3)", "color": "#ff69b4", "letterSpacing": "2px"}

Example for "brick":
{"textShadow": "2px 2px 0 #8b4513, 4px 4px 0 #654321, -1px -1px 0 #5c3317", "color": "#cd853f", "letterSpacing": "3px", "fontWeight": "bold"}

Return ONLY the JSON object, no markdown, no explanation.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_completion_tokens: 500,
      });

      const content = response.choices[0]?.message?.content || "{}";
      
      // Try to parse the JSON response
      let rawStyles: Record<string, unknown> = {};
      try {
        rawStyles = JSON.parse(content.trim());
      } catch (e) {
        // If parsing fails, try to extract JSON from the response
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          rawStyles = JSON.parse(jsonMatch[0]);
        }
      }

      // Sanitize the styles to prevent CSS injection
      const styles = sanitizeStyles(rawStyles);

      res.json({ styles, prompt });
    } catch (error) {
      console.error("Error generating text effect:", error);
      res.status(500).json({ error: "Failed to generate text effect" });
    }
  });

  return httpServer;
}

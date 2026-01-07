import { z } from 'zod';
import { fonts } from './schema';

export const errorSchemas = {
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  fonts: {
    list: {
      method: 'GET' as const,
      path: '/api/fonts',
      responses: {
        200: z.array(z.custom<typeof fonts.$inferSelect>()),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type FontsListResponse = z.infer<typeof api.fonts.list.responses[200]>;

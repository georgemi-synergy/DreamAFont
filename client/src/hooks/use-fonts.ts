import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useFonts() {
  return useQuery({
    queryKey: [api.fonts.list.path],
    queryFn: async () => {
      const res = await fetch(api.fonts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch fonts");
      return api.fonts.list.responses[200].parse(await res.json());
    },
  });
}

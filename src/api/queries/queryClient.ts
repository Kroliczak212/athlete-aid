import { QueryClient } from "@tanstack/react-query";
import { ApiError } from "../client/errors";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        retry: (failureCount, error) => {
          const e = error as ApiError | undefined;
          if (!e) return failureCount < 2;
          return !!e.retriable && failureCount < 2;
        },
      },
      mutations: { retry: 0 },
    },
  });
}
export const queryClient = createQueryClient();

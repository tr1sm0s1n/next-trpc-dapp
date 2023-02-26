import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  issue: procedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        course: z.string(),
        grade: z.string(),
        date: z.string(),
      })
    )
    .mutation((req) => {
      return {
        message: `Certificate for ID: ${req.input.id} is issued`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { router, publicProcedure } from "./trpc";
import { db } from "@/prisma/db";
export const appRouter = router({
  greetings: publicProcedure.query(async () => "hello trPC"),
});
export type AppRouter = typeof appRouter;

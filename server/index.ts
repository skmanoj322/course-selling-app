import { addCourse } from "./modifiy";
import { router } from "./trpc";
import { db } from "@/prisma/db";
import { protectedProcedure } from "./middleware";
export const appRouter = router({
  greetings: protectedProcedure.query(async () => "hello trPC"),
  addCourse: addCourse,
});
export type AppRouter = typeof appRouter;

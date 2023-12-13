import { addCourse } from "./Procedures/addCourse";
import { router } from "./trpc";
import { db } from "@/prisma/db";
import { protectedProcedure } from "./middleware";
import { showAllCourse } from "./Procedures/cources";
export const appRouter = router({
  greetings: protectedProcedure.query(async (opts) => {
    return "hello trPC";
  }),
  addCourse: addCourse,
  allCourse: showAllCourse,
});
export type AppRouter = typeof appRouter;

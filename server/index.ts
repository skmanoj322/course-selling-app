import { addCourse } from "./Procedures/addCourse";
import { router } from "./trpc";
import { db } from "@/prisma/db";
import { protectedProcedure } from "./middleware";
import { showAllCourse } from "./Procedures/cources";
import { buyCourses } from "./Procedures/buyCourse";
export const appRouter = router({
  greetings: protectedProcedure.query(async (opts) => {
    return "hello trPC";
  }),
  addCourse: addCourse,
  allCourse: showAllCourse,
  buyCourses: buyCourses,
});
export type AppRouter = typeof appRouter;

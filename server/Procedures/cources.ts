import { publicProcedure } from "../trpc";

export const showAllCourse = publicProcedure.query(async ({ ctx }) => {
  return ctx.prisma.courses.findMany();
});

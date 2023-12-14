import { z } from "zod";
import { isAdminProcedure, protectedProcedure } from "../middleware";
import { publicProcedure } from "../trpc";

const buy = z.object({
  courseId: z.string(),
});
// interface buy {
//   courseId: string;
// }

export const buyCourses = protectedProcedure
  .input(buy)
  .mutation(async (opts) => {
    const { courseId } = opts.input;
    const { prisma } = opts.ctx;
    console.log(courseId);
    console.log("sesseion", opts.ctx.session);

    try {
      const dbData = prisma.cource_Brought.create({
        data: {
          courseId: courseId,
          customerId: opts.ctx.session.user.id,
        },
      });
      return dbData;
    } catch (error) {
      throw error;
    }
  });

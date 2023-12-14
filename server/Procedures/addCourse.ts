import { z } from "zod";
import { isAdminProcedure } from "../middleware";

const addInput = z.object({
  title: z.string(),
  des: z.string(),
  price: z.string(),
});
const deleteInput = z.object({
  courseid: z.string(),
});

export const addCourse = isAdminProcedure
  .input(addInput)
  .mutation(async (opts) => {
    const { title, des, price } = opts.input;
    const { prisma } = opts.ctx;

    try {
      const dbData = prisma.courses.create({
        data: {
          title: title,
          des: des,
          price: price,
        },
      });
      return dbData;
    } catch (error) {
      throw error;
    }
  });

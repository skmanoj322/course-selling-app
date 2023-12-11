import { z } from "zod";
import { publicProcedure } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { title } from "process";

const prisma = new PrismaClient();

const addInput = z.object({
  title: z.string(),
  des: z.string(),
  price: z.string(),
});

export const addCourse = publicProcedure
  .input(addInput)
  .mutation(async (opts) => {
    const { title, des, price } = opts.input;
    console.log(title);
    try {
      const add = await prisma.courses.create({
        data: {
          title: title,
          des: des,
          price: price,
        },
      });
      return {
        status: "success",
        data: {
          add,
        },
      };
    } catch (error) {
      throw error;
    }
  });

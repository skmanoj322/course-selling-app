import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "./trpc";

const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
    });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});
export const protectedProcedure = publicProcedure.use(isAuthed);

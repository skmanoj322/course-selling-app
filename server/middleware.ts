import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "./trpc";

const isAuthed = middleware(({ next, ctx }) => {
  console.log("MIddleware");
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
const isAdmin = middleware(({ next, ctx }) => {
  if (ctx.session?.user.isAdmin) {
    return next({
      ctx: {
        session: ctx.session,
      },
    });
  }

  throw new TRPCError({
    code: "UNAUTHORIZED",
  });
});
export const protectedProcedure = publicProcedure.use(isAuthed);
export const isAdminProcedure = publicProcedure.use(isAdmin);

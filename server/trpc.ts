import { TRPCError, initTRPC } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth/next";

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await getServerSession();
  console.log(session, opts.req);
  return {
    session,
  };
};
export type Context = Awaited<ReturnType<typeof createContext>>;
const t = initTRPC.context<Context>().create();

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;

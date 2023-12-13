import { authOptions } from "@/lib/auth";
import prisma from "@/prisma/db";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getServerSession } from "next-auth";
type CreateContextOptions = Record<string, never>;

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await getServerSession(authOptions);

  const contextInner = await createContextInner({});
  return {
    ...contextInner,
    session,
  };
};

export async function createContextInner(opts: CreateContextOptions) {
  return {
    prisma,
  };
}

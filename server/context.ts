import prisma from "@/prisma/db";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import type { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth";
type CreateContextOptions = Record<string, never>;

export const createContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await getServerSession();
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

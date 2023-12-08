"use client";
import { trpc } from "../_trpc/client";

export default function TodoList() {
  const getTodo = trpc.greetings.useQuery();
  return <div>{JSON.stringify(getTodo.data)}</div>;
}

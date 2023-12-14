import { getServerSession } from "next-auth/next";
import TodoList from "./todo";
// import { serverClient } from "../_trpc/serverClient";
import { getSession } from "next-auth/react";
import { authOptions } from "@/lib/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return <>Hi from dash board{session.user.isAdmin}</>;
  } else {
    return <>Please login</>;
  }
};
export default Dashboard;

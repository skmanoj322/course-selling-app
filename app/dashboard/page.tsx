import { getServerSession } from "next-auth/next";
import TodoList from "./todo";
import { serverClient } from "../_trpc/serverClient";
import { getSession } from "next-auth/react";
// import { useSession } from "next-auth/react";

const Dashboard = async () => {
  const session = await getServerSession();
  // const session = await getSession();

  console.log(session);
  // const todos = await serverClient.greetings();
  // console.log(todos);
  if (session) {
    return (
      <>
        Hi from dash board
        {/* {todos} */}
        {/* <TodoList /> */}
      </>
    );
  } else {
    return <>Please login</>;
  }
};
export default Dashboard;

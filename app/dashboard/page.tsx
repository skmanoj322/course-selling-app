import { getServerSession } from "next-auth/next";
// import { useSession } from "next-auth/react";

const Dashboard = async () => {
  const session = await getServerSession();
  // console.log();
  if (session) {
    return <>Hi from dash board</>;
  } else {
    return <>Please login</>;
  }
};
export default Dashboard;

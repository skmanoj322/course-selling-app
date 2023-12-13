import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    username: string | null;
    isAdmin: Boolean | null;
  }
  interface Session {
    user: User & {
      username: string;
      isAdmin: Boolean;
    };
    token: {
      username: string;
      isAdmin: Boolean;
    };
  }
}

import { db } from "@/prisma/db";
import { useSearchParams } from "next/navigation";
import { NextResponse } from "next/server";
// import { parse } from "path";
import { hash } from "bcrypt";
import { z } from "zod";
// import { signIn } from "next-auth/react";

const signupInput = z.object({
  email: z.string().min(5, "minimun 5 character are requires").max(100),
  username: z.string().min(5, "minimun 5 character are requires").max(100),
  password: z.string().min(5).max(100),
});

export async function POST(req: Request, res: Response) {
  // console.log("req", req);
  // const bodyReq = await req.text();
  // console.log("BodyReq", bodyReq);
  // const body = JSON.parse(bodyReq);
  // console.log("body", body);
  const body = await req.json();
  const userData = signupInput.safeParse(body);
  if (!userData.success) {
    return NextResponse.json(
      {
        error: userData.error,
        message: "error",
      },
      { status: 409 }
    );
  }
  const { email, username, password } = userData.data;
  // console.log(username, password, email);
  const existEmail = await db.user.findUnique({
    where: {
      email: email,
    },
  });
  if (existEmail) {
    return NextResponse.json({
      user: null,
      message: "Email already exists",
      status: 409,
    });
  }
  const existUsername = await db.user.findUnique({
    where: {
      username: username,
    },
  });
  if (existUsername) {
    return NextResponse.json({
      user: null,
      message: "Username already exists ",
      status: 409,
    });
  }
  const hashedPassword = await hash(password, 10);
  const newUser = await db.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
      isAdmin: false,
    },
  });
  const { password: newPassword, ...rest } = newUser;
  return NextResponse.json({
    newUser: rest,
    message: "new User Created",
    status: 201,
  });
}

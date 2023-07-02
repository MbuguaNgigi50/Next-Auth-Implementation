/*STORE API

This is an API route that will be used to create stores

-Imports Prisma from Prisma
-Imports Auth from Clerk which will be used to get the client token which will be used to tie a store to the respective user
-Imports NextResponse
*/

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth(); //Using Clerk to authenticate the POST route
    //Gives us access to the currently logged in user's ID that is trying to create a store
    const body = await req.json();
//Creating a variable that will store the name of the store in JSON form

    const { name } = body;
//Deconstructing the name from the body

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
//If the user does not exist, return a response that the user is unauthorized to create a store

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
//If there is no name entered for the store, return a response that the name is required.

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });
//Creating a variable STORE that waits for the store name and proceeds to create the store, with the name entered as well as the userID of the user

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORES_POST]", error);
//Catching the errors that would occur if there was a problem with creating a store
    return new NextResponse("Internal Error", { status: 500 });
  }
}

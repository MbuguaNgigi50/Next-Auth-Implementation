import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

/*
EDIT API ROUTE
TAKES IN A REQUEST AND PARAMETERS
GETS THE USER ID FROM CLERK THROUGH THE AUTH FUNCTION
ONE CANNOT EDIT A STORE WITHOUT HAVING AN ACCOUNT, OR THE STORE NOT BEING LINKED TO THE USER
THE STORE ID IS REQUIRED TO EDIT THE STORE
THE BODY IS REQUIRED TO MAKE SOME CHANGES TO THE STORE
*/
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 401 });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_PATCH]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

/*
DELETE API ROUTE
TAKES IN A REQUEST AND PARAMETERS
GETS THE USER ID FROM CLERK THROUGH THE AUTH FUNCTION
ONE CANNOT DELETE A STORE WITHOUT HAVING AN ACCOUNT, OR THE STORE NOT BEING LINKED TO THE USER
THE STORE ID IS REQUIRED TO DELETE THE STORE
*/
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", { status: 401 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[STORE_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

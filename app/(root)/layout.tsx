import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();
  //Extracting the user ID

  if (!userId) {
    redirect("/sign-in");
  }
  //If there is no user ID, the user is redirected to the sign in page

  const store = await prismadb.store.findFirst({
    where: {
      userId,
    },
  });
  //Loading the first store using the userId

  if (store) {
    redirect(`/${store.id}`);
  }
  //If Store exists, redirecting to /storeId

  return <>{children}</>;
}

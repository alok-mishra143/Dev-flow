import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getUserById } from "@/lib/actions/user.action";

import type { ParamsProps } from "@/types";
import type { Metadata } from "next";
import Profile from "@/components/forms/Profile";

export const metadata: Metadata = {
  title: "Edit Profile — DevOverflow",
};

const Page = async ({ params }: ParamsProps) => {
  const { userId } = auth();

  if (!userId) return null;

  const mongoUser = await getUserById({ userId });
  if (!mongoUser?.onboarded) redirect("/onboarding");

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <div className="mt-9">
        <Profile clerkId={userId} user={JSON.stringify(mongoUser)} />
      </div>
    </>
  );
};

export default Page;

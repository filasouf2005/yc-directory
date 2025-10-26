import Link from "next/link";
import Image from "next/image";
import React from "react";
import { auth, signIn, signOut } from "@/auth";
import { redirect } from "next/dist/server/api-utils";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const Navbar = async () => {
  const session = await auth();

  console.log("Navbar session:", session);

  return (
    <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>
        <div className="flex items-cnter gap-5 text-black ">
          {session && session.user ? (
            <>
              <Link href="/startup/create">
                <span className=" max-sm-heddin ">Create</span>
                <BadgePlus className="size-6 sm:heddin"/>
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit">
                <span className=" max-sm-heddin ">LogOut</span>
                  <LogOut className="size-6 sm:heddin text-red-500" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`}>
                  <Avatar className="size-10">
                    <AvatarImage src={session?.user?.image || ''} alt="avatar" />
                    <AvatarFallback>
                      AV
                    </AvatarFallback>
                  </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              <button type="submit">Login</button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    id?: string; // 👈 هنا نُعلِم TypeScript أن session لديه id
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface JWT {
    id?: string;
  }
}

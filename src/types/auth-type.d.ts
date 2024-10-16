// types.ts (or you can define this in the same file as your component)
import { DefaultSession } from "next-auth";

// Extend the DefaultSession interface to include the id property
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      firstName?: string;
      lastName?: string;
      isVerified?: boolean;
      isAdmin?: boolean;
      telephone?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    isVerified?: boolean;
    isAdmin?: boolean;
    telephone?: string;
  }
}

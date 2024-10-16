import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { JWT } from "next-auth/jwt";
const bcrypt = require("bcrypt");

const MAX_AGE = 1 * 24 * 60 * 60;

interface UserType {
  user: {
    id: String;
    email: String;
    firstName?: String;
    lastName?: String;
    telephone?: String;
    address?: String;
  };
}
interface SessionType {
  user: UserType;
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),

    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);
        await connectToDB();
        // Add logic here to look up the user from the credentials supplied
        if (credentials == null) return null;
        // login

        try {
          const user = await User.findOne({ email: credentials.email });

          console.log("User", user);
          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            console.log("User not found");
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: MAX_AGE,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.telephone = user.telephone;
        token.isVerified = user.isVerified;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.user.email = token.email;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.telephone = token.telephone;
      session.user.isVerified = token.isVerified;
      session.user.isAdmin = token.isAdmin;
      return session;
    },
    async signIn({ account, profile, user, credentials }: any) {
      console.log("Hello");
      console.log(account, profile, user, credentials);
      if (account.provider === "google") {
        try {
          await connectToDB();
          const userExists = await User.findOne({ email: profile.email });

          if (!userExists) {
            await User.create({
              email: profile.email,
              firstName: profile.name.split(" ")[0].toLowerCase(),
              image: profile.picture,
            });
          }
          return true;
        } catch (error: any) {
          console.log("Error checking if user exists: ", error.message);
          return false;
        }
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };

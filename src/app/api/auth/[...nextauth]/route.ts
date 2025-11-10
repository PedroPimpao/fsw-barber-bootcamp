import NextAuth from "next-auth"
import { authOpitons } from "@/app/_lib/auth"

const handler = NextAuth(authOpitons)

export { handler as GET, handler as POST }

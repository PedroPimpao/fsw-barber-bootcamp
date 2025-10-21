import { PrismaClient } from "../../generated/prisma"
// import { PrismaClient } from "@prisma/client"

// declare global {
//   // eslint-disable-next-line no-unused-vars
//   var cachedPrisma: PrismaClient | undefined
// }

// let prisma: PrismaClient
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient()
// } else {
//   if (!global.cachedPrisma) {
//     global.cachedPrisma = new PrismaClient()
//   }
//   prisma = global.cachedPrisma
// }

// export const db = prisma

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  const g = globalThis as unknown as { cachedPrisma?: PrismaClient }
  if (!g.cachedPrisma) {
    g.cachedPrisma = new PrismaClient()
  }
  prisma = g.cachedPrisma
}

export const db = prisma

import { PrismaClient } from "../../generated/prisma"

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

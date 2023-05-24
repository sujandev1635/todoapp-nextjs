import { PrismaClient } from '@prisma/client'



const globalForPrisma =global as unknown as {
    prisma: PrismaClient | undefined
}

export const Prisma =
globalForPrisma.prisma ??
new PrismaClient({
    log: ['query'],
})

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma=Prisma


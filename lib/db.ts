import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

declare global {
    var cachedPrisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.cachedPrisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.cachedPrisma = prisma

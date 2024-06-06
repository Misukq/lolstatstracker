import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const password = await hash('killian2002', 12)
  const user = await prisma.user.upsert({
    where: { email: 'killianodn@gmail.com' },
    update: {},
    create: {
      email: 'killianodn@gmail.com',
      name: 'Misukq',
      role:"admin",
      password,
      
    }
  })
  console.log({ user })
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
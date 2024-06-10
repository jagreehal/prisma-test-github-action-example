import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const DELETE = true;

async function deleteExistingData() {
  if (DELETE) {
    await prisma.user.deleteMany();
  }
}

async function seedDatabase() {
  await prisma.user.create({
    data: {
      email: 'seed@example.com',
      name: 'Seeded User',
    },
  });
}

async function main() {
  try {
    await deleteExistingData();
    await seedDatabase();
    console.log('Seeding successful');
  } catch (error) {
    console.error(error);
  }

  await prisma.$disconnect();
}

main();

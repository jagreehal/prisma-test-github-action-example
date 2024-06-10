import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

describe('User Model Test', () => {
  beforeAll(() => {
    return prisma.$connect();
  });
  afterAll(() => {
    return prisma.$disconnect();
  });
  it('create & save user successfully', async () => {
    await prisma.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        avatar: 'https://i.imgur.com/dM7Thhn.png',
      },
    });

    const savedUser = await prisma.user.findFirst({
      where: {
        email: 'test@example.com',
      },
    });
    expect(savedUser.name).toBe('Test User');
  });

  it('checked seeded user', async () => {
    const savedUser = await prisma.user.findFirst({
      where: {
        email: 'seed@example.com',
      },
    });
    expect(savedUser.name).toBe('Seeded User');
  });
});

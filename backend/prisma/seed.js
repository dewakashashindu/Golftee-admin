const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Clear existing (safe for dev only)
  await prisma.notification.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.event.deleteMany();
  await prisma.user.deleteMany();

  // Create users
  const alice = await prisma.user.create({ data: { username: 'alice', email: 'alice@example.com', password: 'dev-pass' } });
  const bob = await prisma.user.create({ data: { username: 'bob', email: 'bob@example.com', password: 'dev-pass' } });

  // Create bookings
  await prisma.booking.create({ data: { name: 'Zod Booking', date: '2025-12-05', members: 3, status: 'confirmed', userId: alice.id } });
  await prisma.booking.create({ data: { name: 'Test Booking via JWT 2', date: '2025-11-27', members: 2, status: 'confirmed', userId: bob.id } });

  // Create events
  await prisma.event.create({ data: { title: 'Prisma Event 1', date: '2025-12-01', description: 'Test event' } });
  await prisma.event.create({ data: { title: 'Zod Event', date: '2025-12-10', description: 'Created in smoke test' } });

  // Notifications
  await prisma.notification.create({ data: { type: 'booking', text: 'New booking: Zod Booking' } });
  await prisma.notification.create({ data: { type: 'booking', text: 'New booking: Test Booking via JWT 2' } });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

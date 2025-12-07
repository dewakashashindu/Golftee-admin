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

  // Create bookings with all frontend-required fields
  await prisma.booking.create({ 
    data: { 
      name: 'John Doe',
      fullName: 'John Doe',
      date: '2025-12-07',
      startTime: '09:00',
      endTime: '11:00',
      members: 2,
      noPlayers: 2,
      nonPlayers: 1,
      email: 'john@example.com',
      phoneNo: '+1234567890',
      status: 'Confirmed',
      userId: alice.id
    } 
  });
  await prisma.booking.create({ 
    data: { 
      name: 'Jane Smith',
      fullName: 'Jane Smith',
      date: '2025-12-08',
      startTime: '10:00',
      endTime: '12:00',
      members: 4,
      noPlayers: 4,
      nonPlayers: 0,
      email: 'jane@example.com',
      phoneNo: '+1987654321',
      status: 'Pending',
      userId: bob.id
    } 
  });
  await prisma.booking.create({ 
    data: { 
      name: 'Bob Johnson',
      fullName: 'Bob Johnson',
      date: '2025-12-07',
      startTime: '14:00',
      endTime: '16:00',
      members: 3,
      noPlayers: 3,
      nonPlayers: 2,
      email: 'bob@example.com',
      phoneNo: '+1122334455',
      status: 'Confirmed',
      userId: alice.id
    } 
  });

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

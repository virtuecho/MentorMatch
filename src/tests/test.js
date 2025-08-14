const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Step 1: Hash a password
  const plainPassword = 'secure123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Step 2: Create a new user
  const newUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'testuser@example.com',
      password_hash: hashedPassword,
      bio: 'I love mentoring.',
      expertise: ['JavaScript', 'Docker'],
      isMentor: true,
      isMentorApproved: true,
      role: 'mentor',
    },
  });

  console.log('User created:', newUser);

  // Step 3: Fetch user by email
  const fetchedUser = await prisma.user.findUnique({
    where: { email: 'testuser@example.com' },
  });

  console.log('Fetched user:', fetchedUser);

  // Optional Step 4: Delete user after test
  await prisma.user.delete({ where: { email: 'testuser@example.com' } });
  console.log('Test user deleted');
}

main()
  .catch((e) => {
    console.error('Error:', e);
  })
  .finally(() => {
    prisma.$disconnect();
  });

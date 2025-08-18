const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email, 
        passwordHash: hashedPassword, 
        role: role || 'mentee'}
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
    console.error('Raise error: ', err)
  }
};
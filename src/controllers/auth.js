const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    // Check if email is not in the database
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'This email address has been linked to an existing account' });
    }

    // Hash password in create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email, 
        passwordHash: hashedPassword, 
        role: role || 'mentee',
        profile: { create: { fullName: fullName || 'default-user' } }
      },
      include: { profile: true }
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    res.status(400).json({ error: 'Registration failed' });
    console.error('Registration error: ', err);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check credentials
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // Return token and basic user info
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
    console.error('Login error: ', err);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch profile' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { fullName, bio, location, profileImageUrl, linkedinUrl, websiteUrl } = req.body;

    const updatedProfile = await prisma.userProfile.update({
      where: { userId },
      data: {
        fullName,
        bio,
        location,
        profileImageUrl,
        linkedinUrl,
        websiteUrl
      }
    });

    res.json({ message: 'Profile updated', profile: updatedProfile });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Profile not found' });
    }
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

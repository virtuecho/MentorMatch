const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Default avatar fallback
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff';

// Helper to ensure avatar fallback
function ensureAvatar(profileImageUrl) {
  return profileImageUrl || DEFAULT_AVATAR;
}

exports.register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  const normalizedEmail = email ? email.trim().toLowerCase() : '';

  try {
    // Basic validations
    if (!normalizedEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalizedEmail)) {
        return res.status(400).json({ error: "Invalid email format" });
    }

    if (!password || password.trim() === "") {
        return res.status(400).json({ error: "Password is required" });
    }

    if (fullName && fullName.length > 255) {
        return res.status(400).json({ error: "Full name too long" });
    }

    if (password.length > 1024) {
        return res.status(400).json({ error: "Password too long" });
    }

    // Check if email already exists (case-insensitive via normalizedEmail)
    const existingUser = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(409).json({ error: 'This email address has been linked to an existing account' });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash: hashedPassword,
        role: role || 'mentee',
        profile: { create: { fullName: fullName || 'default-user' } }
      },
      select: {
        id: true,
        email: true,
        role: true,
        profile: true
      }
    });

    res.status(201).json({ message: 'User registered', user });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: 'Registration failed' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email ? email.trim().toLowerCase() : '';

  if (!normalizedEmail) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (!password || password.trim() === "") {
    return res.status(400).json({ error: "Password is required" });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalizedEmail)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid credentials' });

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // Return token and basic user info without passwordHash
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        profile: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const profile = user.profile || {};
    const safeProfile = {
      ...profile,
      profileImageUrl: ensureAvatar(profile.profileImageUrl)
    };

    res.json({
      id: user.id,
      email: user.email,
      role: user.role,
      profile: safeProfile
    });
  } catch (err) {
    console.error('Get profile error:', err);
    res.status(500).json({ error: 'Could not fetch profile' });
  }
};

exports.getMentorPublicProfile = async (req, res) => {
  try {
    const { mentorId } = req.params;
    
    const mentor = await prisma.user.findUnique({
      where: { 
        id: parseInt(mentorId),
        isMentorApproved: true
      },
      include: {
        profile: {
          select: {
            fullName: true,
            profileImageUrl: true,
            bio: true,
            location: true,
            linkedinUrl: true,
            websiteUrl: true
          }
        },
        mentorSkills: {
          select: {
            skillName: true
          }
        }
      }
    });

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    // Formatted
    const profile = mentor.profile || {};
    const publicProfile = {
      id: mentor.id,
      fullName: profile.fullName,
      profileImageUrl: ensureAvatar(profile.profileImageUrl),
      bio: profile.bio,
      location: profile.location,
      linkedinUrl: profile.linkedinUrl,
      websiteUrl: profile.websiteUrl,
      skills: mentor.mentorSkills.map(skill => skill.skillName)
    };

    res.json(publicProfile);
  } catch (err) {
    console.error('Get mentor profile error:', err);
    res.status(500).json({ error: 'Failed to fetch mentor profile' });
  }
};

// Function to update profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      fullName,
      bio,
      location,
      phone,
      socialMedia,
      profileImageUrl,
      linkedinUrl,
      websiteUrl
    } = req.body;

    if (fullName !== undefined && fullName.trim() === '') {
      return res.status(400).json({ error: 'Full name cannot be empty' });
    }

    // Build update object only with provided fields
    const updateData = {};
    if (fullName !== undefined) updateData.fullName = fullName;
    if (bio !== undefined) updateData.bio = bio;
    if (location !== undefined) updateData.location = location;
    if (phone !== undefined) updateData.phone = phone;
    if (socialMedia !== undefined) updateData.socialMedia = socialMedia;
    if (profileImageUrl !== undefined) updateData.profileImageUrl = profileImageUrl;
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl;
    if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl;

    const updatedProfile = await prisma.userProfile.update({
      where: { userId },
      data: updateData
    });

    if (Array.isArray(req.body.educations)) {
      await updateEducations(userId, req.body.educations);
    }

    if (Array.isArray(req.body.experience)) {
      await updateExperiences(userId, req.body.experience);
    }

    // Ensure avatar fallback in response
    const safeProfile = {
      ...updatedProfile,
      profileImageUrl: ensureAvatar(updatedProfile.profileImageUrl)
    };

    res.json({ message: 'Profile updated', profile: safeProfile });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(404).json({ error: 'Profile not found' });
    }
    console.error('Update profile error:', err);
    res.status(500).json({ error: 'Failed to update profile' });
  }
};

// Helpers for updating profile
async function updateEducations(userId, educations) {
  for (const edu of educations) {
    const { action, id, university, degree, startYear, endYear, major } = edu;
    if (action === 'add') {
      await prisma.education.create({
        data: { 
          university,
          degree,
          startYear,
          endYear,
          major,
          userProfile: {
            connect: {
                userId: userId
      }
    }
        }
      });
    } else if (action === 'edit' && id) {
      await prisma.education.update({
        where: { id },
        data: {
          university,
          degree,
          endYear,
          startYear,
          major
        }
      });
    } else if (action === 'delete' && id) {
      await prisma.education.delete({ where: { id: id } });
    }
  }
}

async function updateExperiences(userId, experiences) {
  for (const exp of experiences) {
    const { action, id, company, position, startYear, endYear, skills } = exp;
    const expertise = skills ? JSON.stringify(skills) : undefined;

    if (action === 'add') {
      await prisma.experience.create({
        data: { 
          userProfile: {
            connect: {
              userId: userId
            }
          },
          company,
          position,
          startYear,
          endYear,
          expertise
        }
      });
    } else if (action === 'edit' && id) {
      await prisma.experience.update({
        where: { id },
        data: {
          company,
          position,
          startYear,
          endYear,
          expertise
        }
      });
    } else if (action === 'delete' && id) {
      await prisma.experience.delete({ where: { id: id } });
    }
  }
}
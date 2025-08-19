const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchMentors = async (req, res) => {
  try {
    const { skill, location, maxResults = 10 } = req.query;
    
    const mentors = await prisma.user.findMany({
      where: {
        role: 'mentor',  // Find mentor only
		isMentorApproved: true,
        profile: {
          location: location ? { contains: location, mode: 'insensitive' } : undefined
        },
        mentorSkills: skill ? {
          some: { skillName: { contains: skill, mode: 'insensitive' } }
        } : undefined
      },
      include: {
        profile: true,
        mentorSkills: true,
		availabilitySlots: true
      },
      take: Number(maxResults)
    });

    if (mentors.length === 0) {
      return res.status(404).json({ message: 'No mentors found' });
    }

    res.json(mentors);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search mentors' });
  }
};
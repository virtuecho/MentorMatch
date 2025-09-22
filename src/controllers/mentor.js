const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchMentors = async (req, res) => {
  try {
    const { skill, location, maxResults = 10 } = req.query;
    
    const mentors = await prisma.user.findMany({
      where: {
        isMentorApproved: true, // Check this instead of role
        profile: {
          location: location ? { contains: location, mode: 'insensitive' } : undefined
        },
        mentorSkills: skill ? {
          some: { skillName: { contains: skill, mode: 'insensitive' } }
        } : undefined
      },
      include: {
        profile: {
          select: {
            fullName: true,
            profileImageUrl: true
          }
        },
        mentorSkills: {
          select: {
            skillName: true
          }
        }
      },
      take: Number(maxResults)
    });

    if (mentors.length === 0) {
      return res.status(404).json({ message: 'No mentors found' });
    }

    // Formatted for frontend
    const formattedMentors = mentors.map(mentor => ({
      id: mentor.id,
      fullName: mentor.profile?.fullName,
      profileImageUrl: mentor.profile?.profileImageUrl,
      skills: mentor.mentorSkills.map(skill => skill.skillName)
    }));

    res.json(formattedMentors);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search mentors' });
  }
};
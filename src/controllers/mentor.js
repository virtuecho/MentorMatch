const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.searchMentors = async (req, res) => {
  try {
    const { skill, location, maxResults = 10 } = req.query;

    const mentors = await prisma.user.findMany({
      where: {
        isMentorApproved: true,
        availabilitySlots: {
          some: {} // ensures there is at least one slot
        },
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
            profileImageUrl: true,
            userId: true,
            experience: {
              orderBy: { startYear: 'desc' },
              take: 1,
              select: {
                position: true,
                company: true,
                expertise: true
              }
            },
            educations: {
              orderBy: { startYear: 'desc' },
              take: 1,
              select: {
                university: true,
                major: true,
                degree: true
              }
            }
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

    // Format response
    const formattedMentors = mentors.map(mentor => {
      const profile = mentor.profile;
      const experience = profile?.experience?.[0];
      const education = profile?.educations?.[0];

      let position, company, skill;

      if (experience) {
        // Latest experience
        position = experience.position || null;
        company = experience.company || null;
        skill = experience.expertise || null;
      } else if (education) {
        // Fallback: latest education
        position = 'student';
        company = education.university || null;
        skill = education.major || null;
      } else {
        // No experience or education
        position = null;
        company = null;
        skill = null;
      }

      return {
        id: mentor.id,
        fullName: profile?.fullName,
        profileImageUrl: profile?.profileImageUrl,
        position,
        company,
        skill,
        mentorSkills: mentor.mentorSkills.map(s => s.skillName)
      };
    });

    res.json(formattedMentors);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search mentors' });
  }
};
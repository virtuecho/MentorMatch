const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const Fuse = require('fuse.js');

exports.recommendMentors = async (req, res) => {
  try {
    const { maxResults = 6 } = req.query;
    const currentUserId = req.user.id;

    const mentors = await prisma.user.findMany({
      where: {
        isMentorApproved: true,
        id: { not: currentUserId },
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
        skill = null;
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

exports.searchMentors = async (req, res) => {
  try {
    const { q: keyword, maxResults = 10 } = req.query;
    const currentUserId = req.user.id;

    if (!keyword || String(keyword).trim().length === 0) {
      return res.status(400).json({ message: 'Query parameter q is required' });
    }

    // Fetch candidates with required base filters (mentor approved, not self, has slots)
    // We keep the include structure you had so formatted response is straightforward
    const candidates = await prisma.user.findMany({
      where: {
        isMentorApproved: true,
        id: { not: currentUserId },
      },
      include: {
        profile: {
          select: {
            fullName: true,
            profileImageUrl: true,
            userId: true,
            location: true,
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
        mentorSkills: { select: { skillName: true } }
      },
      // Fetch a reasonable candidate pool to run fuzzy matching against.
      // Increase this if you expect many near-matches but keep in mind memory.
      take: 200
    });

    if (!candidates || candidates.length === 0) {
      return res.status(404).json({ message: 'No mentors found' });
    }

    // Prepare Fuse.js list and options
    // Searchable keys: profile.fullName, profile.location, mentorSkills[].skillName
    const fuseList = candidates.map(user => {
      const profile = user.profile || {};
      const experience = profile.experience?.[0];
      const education = profile.educations?.[0];

      let skillFallback;

      if (experience) {
        skillFallback = experience.expertise || '';
      } else if (education) {
        skillFallback = education.major || '';
      } else {
        skillFallback = '';
      }

      return {
        user,
        fullName: profile.fullName || '',
        location: profile.location || '',
        skills: skillFallback
      };
    });

    const fuse = new Fuse(fuseList, {
      keys: [
        { name: 'fullName', weight: 0.45 },
        { name: 'location', weight: 0.25 },
        { name: 'skills', weight: 0.30 }
      ],
      includeScore: true,
      threshold: 0.35, // adjust sensitivity; lower = stricter, higher = fuzzier
      ignoreLocation: true,
      minMatchCharLength: 2
    });

    // Run fuzzy search
    const fuseResults = fuse.search(keyword);

    // If Fuse returns nothing, fall back to a case-insensitive partial match to avoid empty results
    const matchedResults = fuseResults.length > 0
      ? fuseResults
      : fuse.search(keyword, { threshold: 0.6 }); // more permissive fallback

    // Map and format top results up to maxResults
    const top = matchedResults.slice(0, Number(maxResults));

    const formattedMentors = top.map(result => {
      const mentor = result.item.user;
      const profile = mentor.profile || {};
      const experience = profile.experience?.[0];
      const education = profile.educations?.[0];

      let position, company, skillFallback;

      if (experience) {
        position = experience.position || null;
        company = experience.company || null;
        skillFallback = experience.expertise || null;
      } else if (education) {
        position = 'Student';
        company = education.university || null;
        skillFallback = null;
      } else {
        position = null;
        company = null;
        skillFallback = null;
      }

      return {
        id: mentor.id,
        fullName: profile.fullName,
        profileImageUrl: profile.profileImageUrl,
        position,
        company,
        skill: skillFallback,
        mentorSkills: (mentor.mentorSkills || []).map(s => s.skillName)
      };
    });

    if (formattedMentors.length === 0) {
      return res.status(404).json({ message: 'No mentors found' });
    }

    res.json(formattedMentors);
  } catch (err) {
    console.error('Search error:', err);
    res.status(500).json({ error: 'Failed to search mentors' });
  }
};

// Get public mentor profile accessible by anyone
exports.getMentorProfile = async (req, res) => {
  try {
    const { mentorId } = req.params;
    
    const mentor = await prisma.user.findUnique({
      where: { 
        id: parseInt(mentorId),
        isMentorApproved: true
      },
      include: {
        profile: {
          include: {
            educations: true,
            experience: true
          }
        },
        availabilitySlots: true
      }
    });

    if (!mentor) {
      return res.status(404).json({ error: 'Mentor not found' });
    }

    return res.status(200).json(mentor);
  } catch (err) {
    console.error('Failed to fetch mentor profile: ', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.changeRole = async (req, res) => {
  try {
    // Fetch current user
    const userId = req.user.id;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) { return res.status(404).json({ error: 'User not found' }); }

    // Toggle role
    const newRole = user.role === 'mentee' ? 'mentor' : 'mentee';
    if (newRole === "mentor" && !user.isMentorApproved) {
      return res.status(403).json({ message: "Mentor approval required." });
    }

    // Update role
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole }
    });

    // Response message
    res.json({
      message: `Role changed to ${newRole}`,
      role: updatedUser.role
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

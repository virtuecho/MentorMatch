exports.checkRole = (requiredRole) => {
  return async (req, res, next) => {
    try {
      const user = await prisma.user.findUnique({ where: { id: req.user.id } });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const currentRole = user.role;
      if (currentRole !== requiredRole) {
        return res.status(403).json({ error: `Access denied: ${requiredRole} role required` });
      }
      next();
    } catch (err) {
      console.error("Failed to check role: ", err);
      res.status(500).json({ error: "Internal server error during role check" });
    }
  };
};


exports.logout = async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};

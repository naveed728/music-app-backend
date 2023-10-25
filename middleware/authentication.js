const { verify } = require("jsonwebtoken");

const tokenVerification = (req, res, next) => {
  console.log("It hit")
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized" });
  }
  try {
    const decoded = verify(token, process.env.SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { tokenVerification };

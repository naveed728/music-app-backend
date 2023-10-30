const { verify } = require("jsonwebtoken");

const tokenVerification = (req, res, next) => {
  console.log("It hit")
  const authHeader = req.header("Authorization");
  console.log(authHeader)
  if (!authHeader) {
    return res.status(400).json({ message: "Unauthorized" });
  }

  const [bearer, token] = authHeader.split(" ");
  console.log(token)
  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ message: "Unauthorized" });
  }
  try {
    console.log("Naveed")
    const decoded = verify(token, process.env.SECRET);
    console.log("khan")
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error(error); // Log the error
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { tokenVerification };

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

export const processLogin = (req, res, db) => {
  var email = req.body.email;
  var password = req.body.password;

  db.get("SELECT * FROM users WHERE email=?", email, function (err, row) {
    if (row == undefined) {
      res.json({ errormsg: "User does not exist" });
    } else if (row.password === password) {
      const token = generateAccessToken({
        email: row.email,
        isAdmin: row.isAdmin,
      });
      res.json({ token: token, isAdmin: row.isAdmin });
    } else {
      res.json({ errormsg: "Authentication failed" });
    }
  });
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;

    next();
  });
};

dotenv.config();

const generateAccessToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET, {
    expiresIn: "18000s",
  });
};

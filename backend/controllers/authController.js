import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const register = async (req, res) => {
  try {
    const { full_name, email, password, phone } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields"
      });
    }

    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) return res.status(500).json(err);

        if (result.length > 0) {
          return res.status(400).json({
            success: false,
            message: "Email already exists"
          });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.query(
          "INSERT INTO users(full_name,email,password,phone) VALUES(?,?,?,?)",
          [full_name, email, hashedPassword, phone],
          (err) => {
            if (err) return res.status(500).json(err);

            res.status(201).json({
              success: true,
              message: "Registration Successful"
            });
          }
        );
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login
export const login = (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=?",
    [email],
    async (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      const user = result[0];
      console.log("Entered Password:", password);
      console.log("Stored Hash:", user.password);

      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password Match:", isMatch);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Invalid Password"
        });
      }

      const token = jwt.sign(
        { id: user.user_id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.json({
        success: true,
        token,
        user: {
          id: user.user_id,
          name: user.full_name,
          email: user.email
        }
      });
    }
  );
};
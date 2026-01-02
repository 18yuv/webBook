import userModel from "../models/user.js";

export default async function meController(req, res) {
  try {
    const userFromDb = await userModel.findById(req.user.id).select('+password');

    res.status(200).json({
      user: {
        id: userFromDb.id,
        name: userFromDb.name,
        email: userFromDb.email,
        hasPassword: !!userFromDb.password, // true if password exists
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
}

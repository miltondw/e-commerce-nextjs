import connectDB from "../../../utils/connectDB";
import auth from "../../../middlewares/auth";
import Users from "../../../models/userModel";

connectDB();

export default async (req, res) => {
  switch (req.method) {
    case "PATCH":
      await uploadInfo(req, res);
  }
};
const uploadInfo = async (req, res) => {
  try {
    const result = await auth(req, res);
    const { name, avatar } = req.body;
    const newUser = await Users.findOneAndUpdate(
      { _id: result.id },
      { name, avatar }
    )
    res.json({
      msg: "Update Success!",
      user: {
          name,
          avatar,
          email:newUser.email,
          role:newUser.role
      },
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

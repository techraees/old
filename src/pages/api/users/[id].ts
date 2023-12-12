// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// pages/api/users/index.js
import connect from "../../../../utils/db";
import { UserDocument, UserModel } from "../../../../models/user";

connect();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (req.method === "GET") {
    try {
      const users = await UserModel.findById(id);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, email, age } = req.body;
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        { name, email, age },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: "Error updating user" });
    }
  } else if (req.method === "DELETE") {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Error deleting user" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

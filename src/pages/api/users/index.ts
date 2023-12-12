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
      const users = await UserModel.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error fetching users" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, email, age } = req.body;
      const newUser: UserDocument = new UserModel({ name, email, age });
      await newUser.save();
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Error creating user" + error });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

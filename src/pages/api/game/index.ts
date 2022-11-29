import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = "SELECT * FROM game ORDER BY id ASC";
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "POST":
      try {
        const { gameOver, message, isBoardDisabled, board } = body;
        console.log({ bodyOfPost: body });

        const query = `
            INSERT INTO game
                ("gameOver", message, "isBoardDisabled", board)
            VALUES
                ($1, $2, $3, $4)
            RETURNING *;
          `;
        const values = [gameOver, message, isBoardDisabled, board];

        const response = await conn.query(query, values);

        console.log({ fields: response.rows });
        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method not supported" });
  }
}

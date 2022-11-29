import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const { gameOver, message, isBoardDisabled, board, currentPlayer } =
          body;
        const text = `
          UPDATE game 
                SET "gameOver" = $1, message = $2, "isBoardDisabled" = $3, board = $4, "currentPlayer" = $5, timestamp = CURRENT_TIMESTAMP 
          WHERE id = $6 RETURNING *`;
        const values = [
          gameOver,
          message,
          isBoardDisabled,
          board,
          currentPlayer,
          id,
        ];
        console.log({ values });
        const result = await conn.query(text, values);
        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    case "DELETE":
      try {
        const text = `
          DELETE FROM game 
                WHERE id = $1 RETURNING *`;
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0)
          return res.status(404).json({ message: "Task Not Found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
};

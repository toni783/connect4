import { NextApiRequest, NextApiResponse } from "next";
import { SELECT_STATEMENT } from ".";
import { conn } from "../../../utils/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    method,
    body,
    query: { id },
  } = req;

  switch (method) {
    case "PUT":
      try {
        const {
          isGameOver,
          alertMessage,
          isGameDisabled,
          gameBoard,
          currentPlayer,
        } = body;
        const text = `
          UPDATE game 
                SET is_game_over = $1, alert_message = $2, is_game_disabled = $3, game_board = $4, current_player = $5, update_time = CURRENT_TIMESTAMP 
          WHERE game_id = $6 RETURNING ${SELECT_STATEMENT}`;
        const values = [
          isGameOver,
          alertMessage,
          isGameDisabled,
          gameBoard,
          currentPlayer,
          id,
        ];
        const result = await conn.query(text, values);
        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.alertMessage });
      }
    case "DELETE":
      try {
        const text = `
          DELETE FROM game 
                WHERE game_id = $1 RETURNING ${SELECT_STATEMENT}`;
        const values = [id];
        const result = await conn.query(text, values);

        if (result.rowCount === 0)
          return res.status(404).json({ message: "Task Not Found" });

        return res.json(result.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.alertMessage });
      }
    default:
      return res.status(400).json({ message: "Method are not supported" });
  }
}

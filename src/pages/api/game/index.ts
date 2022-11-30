import { NextApiRequest, NextApiResponse } from "next";
import { conn } from "../../../utils/database";

export const SELECT_STATEMENT = `
game_id as "id",
player_1 as "player1",
player_2 as "player2",
current_player as "currentPlayer",
is_game_over as "isGameOver",
alert_message as "alertMessage",
is_game_disabled as "isGameDisabled",
created_time as "createdTime",
update_time as "updatedTime" , 
array_to_json(game_board) as "gameBoard"`;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { method, body } = req;

  switch (method) {
    case "GET":
      try {
        const query = `
        SELECT ${SELECT_STATEMENT}
        FROM game
        ORDER BY game_id ASC`;
        const response = await conn.query(query);
        return res.json(response.rows);
      } catch (error: any) {
        return res.status(400).json({ message: error.alertMessage });
      }
    case "POST":
      try {
        const { isGameOver, alertMessage, isGameDisabled, gameBoard } = body;

        const query = `
            INSERT INTO game
                (is_game_over, alert_message, is_game_disabled, game_board)
            VALUES
                ($1, $2, $3, $4)
            RETURNING ${SELECT_STATEMENT};
          `;
        const values = [isGameOver, alertMessage, isGameDisabled, gameBoard];

        const response = await conn.query(query, values);

        return res.json(response.rows[0]);
      } catch (error: any) {
        return res.status(400).json({ message: error.alertMessage });
      }
    default:
      return res.status(400).json({ message: "Method not supported" });
  }
}

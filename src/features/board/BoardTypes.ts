export enum Players {
  PLAYER_1 = 1,
  PLAYER_2 = 2,
  BOT = 3,
}

export interface BoardState {
  id: number;
  player1: Players.PLAYER_1;
  player2: Players.PLAYER_2 | Players.BOT;
  currentPlayer: Players;
  gameBoard: number[][] | null[][];
  isGameOver: boolean;
  alertMessage: {
    messageBody: string;
    messageVariant: "primary" | "success" | "danger" | "warning";
  };
  isGameDisabled: boolean;
  updatedTime: Date;
  createdTime: Date;
}

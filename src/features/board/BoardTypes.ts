export enum Players {
  PLAYER_1 = 1,
  PLAYER_2 = 2,
}

export interface BoardState {
  id: number;
  player1: Players.PLAYER_1;
  player2: Players.PLAYER_2;
  currentPlayer: Players;
  gameBoard: number[][];
  isGameOver: boolean;
  alertMessage: {
    messageBody: string;
    messageVariant: "primary" | "success" | "danger" | "warning";
  };
  isGameDisabled: boolean;
}

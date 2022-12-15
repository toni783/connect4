import React from "react";
import { Connect4 } from "./Board";
import { renderWithProviders } from "utils/test-utils";
import { rest } from "msw";
import { BoardState } from "./BoardTypes";
import { setupServer } from "msw/lib/node";
import { waitForElementToBeRemoved } from "@testing-library/dom";

export const handlers = [
  rest.get(`*/api/game`, (_, res, ctx) =>
    res(ctx.status(200), ctx.json<BoardState[]>([]))
  ),
];
export const server = setupServer(...handlers);

describe("Board.spec - no previous games", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it("should render the Board with no previously saved games", async () => {
    const { container, getByText, queryByText } = renderWithProviders(
      <Connect4 />
    );

    // Board Loaded and on disabled state
    const disabledBoard = container.getElementsByClassName("board-disabled");
    expect(disabledBoard).toHaveLength(1);

    // Board Game cells have been properly rendered
    const gameBoardCells = container.getElementsByClassName("gameCell");
    expect(gameBoardCells).toHaveLength(49);

    // Start new game button has been properly renderd
    const startNewGameButton = getByText("Start New Game (Locally)");
    expect(startNewGameButton).toBeTruthy();

    // Load game button has been rendered and is waiting for games to be fetched
    const loadGameButton = getByText("Loading…");
    expect(loadGameButton).toBeTruthy();

    await waitForElementToBeRemoved(() => queryByText(/Loading…/i));

    // After no saves were found
    const noSavesFoundButton = getByText("No saves found");
    expect(noSavesFoundButton).toBeTruthy();
  });

  // TODO: add more tests
});

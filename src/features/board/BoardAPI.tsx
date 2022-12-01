import { emptySplitApi, GAMES_TAGS } from "../../utils/axios";
import { BoardState } from "./BoardTypes";

export const boardApi = emptySplitApi.injectEndpoints({
  endpoints(build) {
    return {
      getGames: build.query<BoardState[], void>({
        query: () => ({ url: "api/game", method: "get" }),
        providesTags: [GAMES_TAGS],
      }),
      createGame: build.mutation<
        BoardState,
        Pick<
          BoardState,
          "isGameOver" | "alertMessage" | "isGameDisabled" | "gameBoard"
        >
      >({
        query(payload) {
          return {
            url: `api/game`,
            method: "POST",
            data: payload,
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          };
        },
        invalidatesTags: [GAMES_TAGS],
      }),
      deleteGame: build.mutation<{ success: boolean; id: number }, number>({
        query(id) {
          return {
            url: `api/game/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: (result, error, id) => [GAMES_TAGS],
      }),
      updateGame: build.mutation<BoardState, BoardState>({
        query: (payload) => ({
          url: `api/game/${payload.id}`,
          method: "PUT",
          data: payload,
        }),
        invalidatesTags: (result, error, { id }) => [GAMES_TAGS],
      }),
    };
  },
  overrideExisting: false,
});

export const {
  useGetGamesQuery,
  useCreateGameMutation,
  useDeleteGameMutation,
  useUpdateGameMutation,
} = boardApi;

import { emptySplitApi, GAMES_TAGS } from "../../utils/axios";
import { BoardState } from "./boardSlice";

export const boardApi: any = emptySplitApi.injectEndpoints({
  endpoints(build) {
    return {
      getGames: build.query<any, string>({
        query: () => ({ url: "api/game", method: "get" }),
        providesTags: [GAMES_TAGS],
      }),
      // TODO: add result type
      createGame: build.mutation<BoardState[], BoardState>({
        query(payload) {
          console.log({ payload });
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
        invalidatesTags: (result, error, id) => [{ type: GAMES_TAGS, id }],
      }),
      updateGame: build.mutation<BoardState[], BoardState>({
        query: (payload) => ({
          url: `api/game/${payload.id}`,
          method: "PUT",
          data: payload,
        }),
        invalidatesTags: (result, error, { id }) => [{ type: GAMES_TAGS, id }],
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

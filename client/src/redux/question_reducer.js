import { createSlice } from "@reduxjs/toolkit";

export const questionReducer = createSlice({
  name: "questions",
  initialState: {
    queue: [],
    answer: [],
    trace: 0,
  },
  reducers: {
    startExamAction: (state, action) => {
      let { question, answer } = action.payload;
      return {
        ...state,
        queue: question,
        answer,
      };
    },

    moveNextAction: (state) => {
      return {
        ...state,
        trace: state.trace + 1,
      };
    },

    movePrevtAction: (state) => {
      return {
        ...state,
        trace: state.trace - 1,
      };
    },
    resetAllAction: () => {
      return {
        queue: [],
        answer: [],
        trace: 0,
      };
    },
  },
});

export const {
  startExamAction,
  moveNextAction,
  movePrevtAction,
  resetAllAction,
} = questionReducer.actions;
export default questionReducer.reducer;

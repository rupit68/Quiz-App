import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

//redux actions
import * as Action from "../redux/question_reducer";
import { getServerData } from "../helper/helper";

// fetch question hook to fetch api and set value to store

export const useFetchQuestion = () => {
  const dispatch = useDispatch();
  const [getData, setgetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    setgetData((prev) => ({ ...prev, isLoading: true }));

    // async function fetch backend data

    (async () => {
      try {
        const [{ question, answer }] = await getServerData(
          `${process.env.REACT_APP_SERVER_HOSTNAME}/api/questions`,
          (data) => data
        );
        // console.log({ question, answer });

        if (question.length > 0) {
          setgetData((prev) => ({ ...prev, isLoading: false }));
          setgetData((prev) => ({ ...prev, apiData: question }));
          // dispatch action.

          dispatch(Action.startExamAction({ question: question, answer }));
        } else {
          throw new Error("No Question Avalibale");
        }
      } catch (error) {
        setgetData((prev) => ({ ...prev, isLoading: false }));
        setgetData((prev) => ({ ...prev, serverError: error }));
      }
    })();
  }, [dispatch]);

  return [getData, setgetData];
};

// move action dispatch function

export const MoveNextQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.log(error);
  }
};

export const MovePrevQuestion = () => async (dispatch) => {
  try {
    dispatch(Action.movePrevtAction());
  } catch (error) {
    console.log(error);
  }
};

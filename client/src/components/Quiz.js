import React, { useEffect, useState } from "react";
import Questions from "./Questions";
import { MoveNextQuestion, MovePrevQuestion } from "../hooks/FetchQuestion";
import { PushAnswer } from "../hooks/setResult";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
export default function Quiz() {
  const [check, setChecked] = useState(undefined);
  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  function onNext() {
    if (trace < queue.length) {
      // console.log("on next click");

      //update trace value using move next action
      dispatch(MoveNextQuestion());
      // insert new value in array
      if (result.length <= trace) {
        dispatch(PushAnswer(check));
      }
    }

    //reset the value for checked variable
    setChecked(undefined);
  }
  function onPrev() {
    if (trace > 0) {
      console.log("on prev click");
      dispatch(MovePrevQuestion());
    }
  }

  function onChecked(check) {
    // console.log(check);
    setChecked(check);
  }

  // fineshed exam after last question

  if (result.length && result.length >= queue.length) {
    return <Navigate to={"/result"} replace="true"></Navigate>;
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      {/* display question */}
      <Questions onChecked={onChecked} />
      <div className="grid">
        {trace > 0 ? (
          <button className="btn prev" onClick={onPrev}>
            Prev
          </button>
        ) : (
          <div></div>
        )}
        <button className="btn next" onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

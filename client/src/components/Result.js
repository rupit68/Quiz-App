import React, { useEffect } from "react";
import "../styles/Result.css";
import { Link } from "react-router-dom";
import ResultTable from "./ResultTable";
import { useDispatch, useSelector } from "react-redux";
import {
  attempts_Number,
  earnPoints_Number,
  flagResult,
} from "../helper/helper";
// Import all actions
import { resetAllAction } from "../redux/question_reducer";
import { resetResultAction } from "../redux/result_reducer";
import { userPublishResult } from "../hooks/setResult";

export default function Result() {
  const dispatch = useDispatch();

  // Select state properties individually
  const question = useSelector((state) => state.question);
  const resultData = useSelector((state) => state.result);

  // Extract values safely
  const queue = question?.queue ?? [];
  const answer = question?.answer ?? [];
  const result = resultData?.result ?? []; // This should contain the array
  const userId = resultData?.userId ?? null;

  // Debugging: Check if data is being retrieved correctly
  //console.log("Redux Result Data:", result);

  // useEffect(() => {
  //   console.log("Updated Result:", flag);
  // });

  const totalPoints = queue.length * 10;
  const attempts = attempts_Number(result);
  const earnPoints = earnPoints_Number(result, answer, 10);
  const flag = flagResult(totalPoints, earnPoints);

  // store user result
  userPublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achived: flag ? "Passed" : "Failed",
  });

  function onRestart() {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>Username :</span>
          <span className="bold">{userId}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points :</span>
          <span className="bold">{totalPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Total Questions :</span>
          <span className="bold">{queue.length || 0}</span>
        </div>
        <div className="flex">
          <span>Total Attempts :</span>
          <span className="bold">{attempts || 0}</span>
        </div>
        <div className="flex">
          <span>Total Earn Points :</span>
          <span className="bold">{earnPoints || 0}</span>
        </div>
        <div className="flex">
          <span>Quiz Result :</span>
          <span
            style={{ color: `${flag ? "#2aff95" : "#ff2a66"}` }}
            className="bold"
          >
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to={"/"} onClick={onRestart}>
          Restart
        </Link>
      </div>

      <div className="container">
        {/* Display result array */}
        <h3>Results:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>

        {/* result table */}
        <ResultTable />
      </div>
    </div>
  );
}

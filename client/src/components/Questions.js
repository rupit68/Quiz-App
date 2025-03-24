// import React, { useEffect, useState } from "react";

// // custome hooks

// import { useFetchQuestion } from "../hooks/FetchQuestion";
// import { useDispatch, useSelector } from "react-redux";
// import { updateResultAction } from "../redux/result_reducer";
// import { updateResult } from "../hooks/setResult";

// export default function Questions({ onChecked }) {
//   const [checked, setchecked] = useState(undefined);
//   const { trace } = useSelector((state) => state.question);
//   const result = useSelector((state) => state.result.result);
//   const [{ isLoading, apiData, serverError }] = useFetchQuestion();
//   useSelector((state) => console.log(state));
//   const questions = useSelector(
//     (state) => state.question.queue[state.question.trace]
//   );

//   const dispatch = useDispatch();

//   useEffect(() => {
//     //console.log({ trace, checked });

//     dispatch(updateResult({ trace, checked }));
//   }, [checked]);

//   function onSelect(i) {
//     onChecked(i);
//     setchecked(i);
//     dispatch(updateResult({ trace, checked }));
//   }

//   if (isLoading) return <h3 className="text-light">isLoading</h3>;
//   if (serverError)
//     return <h3 className="text-light">{serverError || "unknown Error! "}</h3>;
//   return (
//     <div className="questions">
//       <h2 className="text-light">{questions?.question}</h2>
//       <ul key={questions?.id}>
//         {questions?.options.map((q, i) => (
//           <li key={i}>
//             <input
//               type="radio"
//               value={false}
//               name="options"
//               id={`q${i}-option`}
//               onChange={() => onSelect(i)}
//             />

//             <label className="text-primary" htmlFor={`q${i}-option`}>
//               {q}
//             </label>
//             <div
//               className={`check ${result[trace] == i ? "checked" : ""}`}
//             ></div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useFetchQuestion } from "../hooks/FetchQuestion";
import { useDispatch, useSelector } from "react-redux";
import { updateResult } from "../hooks/setResult";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.question);
  const result = useSelector((state) => state.result.result);
  const [{ isLoading, apiData, serverError }] = useFetchQuestion();
  const dispatch = useDispatch();

  // Ensure we have valid questions before trying to access them
  const questions = useSelector(
    (state) => state.question.queue?.[state.question.trace]
  );

  useEffect(() => {
    if (checked !== undefined) {
      dispatch(updateResult({ trace, checked }));
    }
  }, [checked, dispatch, trace]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
  }

  if (isLoading) return <h3 className="text-light">Loading Questions...</h3>;
  if (serverError) return <h3 className="text-light">Error: {serverError}</h3>;
  if (!questions) return <h3 className="text-light">No Questions Found</h3>;

  return (
    <div className="questions">
      <h2 className="text-light">{questions?.question}</h2>
      <ul key={questions?.id}>
        {questions?.options?.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />
            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] === i ? "checked" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

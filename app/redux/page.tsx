"use client";
import React, { useEffect } from "react";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  setData,
} from "@/store/slice";
function Page() {
  const count = useSelector((state: RootState) => state.counter.value);
  const data = useSelector((state: RootState) => state.counter.data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(incrementByAmount(5));
  }, []);
  return (
    <>
      <h1>fasddd</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <p>{count}</p>
      <button
        onClick={() => {
          dispatch(decrement());
        }}
      >
        Decrement
      </button>
      <div></div>
      <button
        onClick={() => {
          dispatch(incrementByAmount({ a: 5, b: 5 }));
        }}
      >
        Increment by 5
      </button>
      <button
        onClick={() => {
          dispatch(setData({ name: "ridhima" }));
        }}
      >
        setData
      </button>
      {`${data}`}
    </>
  );
}
export default Page;

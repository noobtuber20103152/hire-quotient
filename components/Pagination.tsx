"use client";
import { changePage } from "@/store/slice";
import { RootState } from "@/store/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

function Pagination() {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.counter.data);
  const page = useSelector((state: any) => state.counter.page);
  let finalPage =
    data.length % 10 == 0 ? data.length / 10 : Math.trunc(data.length / 10) + 1;
  const deleteItems = useSelector(
    (state: RootState) => state.counter.deleteItems
  );

  return (
    <>
      <div className=" w-full my-4 py-2">
        <div className="flex justify-between">
          <div>
            <span className="text-sm text-gray-600">
              {deleteItems?.length} of {data.length} rows(s) selected
            </span>
          </div>
          <div className="flex items-center gap-5">
            <span className="text-sm text-black font-bold">
              Page {page} of 5
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  dispatch(changePage({ step: "first" }));
                }}
                className="h-7 w-7 justify-center items-center border rounded-sm flex flex-row"
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => {
                  if (page !== 1) {
                    dispatch(changePage({ step: "prev" }));
                  }
                }}
                className="h-7 w-7 justify-center items-center border rounded-sm flex flex-row"
              >
                &lt;
              </button>
              {Array.from(
                Array(
                  data?.length % 10 == 0
                    ? data?.length / 10
                    : Math.trunc(data?.length / 10) + 1
                )
              ).map((page: any, index: any) => {
                return (
                  <>
                    <button
                      onClick={() => {
                        dispatch(
                          changePage({ step: "random", page: index + 1 })
                        );
                      }}
                      className="h-7 w-7 justify-center items-center border rounded-sm flex flex-row"
                    >
                      {index + 1}
                    </button>
                  </>
                );
              })}
              <button
                onClick={() => {
                  if (page !== finalPage) {
                    dispatch(changePage({ step: "next" }));
                  }
                }}
                className="h-7 w-7 justify-center items-center border rounded-sm flex flex-row"
              >
                &gt;
              </button>
              <button
                onClick={() => {
                  dispatch(changePage({ step: "last" }));
                }}
                className="h-7 w-7 justify-center items-center border rounded-sm flex flex-row"
              >
                &gt;&gt;
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;

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
        <div className="flex md:flex-row flex-col justify-between">
          <div>
            <span className="text-sm text-gray-600">
              {deleteItems?.length} of {data.length} rows(s) selected
            </span>
          </div>
          <div className="flex sm:flex-row flex-col sm:items-center gap-5 md:my-0 my-3">
            <span className="text-sm text-black font-bold">
              Page {page} of {finalPage}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  dispatch(changePage({ step: "first" }));
                }}
                className={` ${
                  page === 1 ? "text-gray-200" : ""
                } h-7 w-7 rounded-lg  justify-center items-center border  flex flex-row first-page `}
              >
                &lt;&lt;
              </button>
              <button
                onClick={() => {
                  if (page !== 1) {
                    dispatch(changePage({ step: "prev" }));
                  }
                }}
                className={` ${
                  page === 1 ? "text-gray-200" : ""
                } h-7 w-7 rounded-lg  justify-center items-center border flex flex-row previous-page`}
              >
                &lt;
              </button>
              {Array.from(
                Array(
                  data?.length % 10 == 0
                    ? data?.length / 10
                    : Math.trunc(data?.length / 10) + 1
                )
              ).map((val: any, index: any) => {
                return (
                  <>
                    <button
                      onClick={() => {
                        dispatch(
                          changePage({ step: "random", page: index + 1 })
                        );
                      }}
                      className={` ${
                        page === index + 1 ? "bg-gray-200" : ""
                      } h-7 w-7 justify-center items-center border rounded-lg flex flex-row`}
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
                className={`${
                  page === finalPage ? "text-gray-200" : ""
                } h-7 w-7 justify-center items-center border rounded-lg  flex flex-row next-page`}
              >
                &gt;
              </button>
              <button
                onClick={() => {
                  dispatch(changePage({ step: "last" }));
                }}
                className={`${
                  page === finalPage ? "text-gray-200" : ""
                } h-7 w-7 justify-center items-center border rounded-lg  flex flex-row last-page`}
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

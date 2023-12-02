import React from "react";

function PaginationSkeleton() {
  return (
    <>
      <div className=" w-full my-4 py-2">
        <div className="flex items-center justify-between animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
          <div className="flex items-center gap-5">
            <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-4"></div>
            <div className="flex gap-2">
              <div className="h-7 w-7 bg-gray-200  mb-4"></div>
              <div className="h-7 w-7 bg-gray-200  mb-4"></div>
              {[1, 2, 3, 4, 5].map((page: any) => {
                return (
                  <>
                    <div className="h-7 w-7 bg-gray-200  mb-4"></div>
                  </>
                );
              })}
              <div className="h-7 w-7 bg-gray-200  mb-4"></div>
              <div className="h-7 w-7 bg-gray-200  mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaginationSkeleton;

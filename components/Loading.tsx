import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Loading() {
  return (
    <>
      {Array.from(Array(10)).map((list: any) => {
        return (
          <>
            <tr className="bg-white border-b animate-pulse dark:bg-gray-800 dark:border-gray-700">
              <th className="px-6 py-4">
                <div className="h-4 w-4 bg-gray-200 rounded-sm"></div>
              </th>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
              </th>
              <td className="px-6 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
              </td>
              <td className="px-6 py-4">
                <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-4"></div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <div className="h-6 w-6  bg-gray-200 border rounded-sm"></div>
                  <div className="h-6 w-6 bg-gray-200 border rounded-sm"></div>
                </div>
              </td>
            </tr>
          </>
        );
      })}
    </>
  );
}

export default Loading;

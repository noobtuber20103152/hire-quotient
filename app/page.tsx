"use client";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { api } from "@/libs/apis";
import Loading from "@/components/Loading";
import ListItem from "@/components/ListItem";
import PaginationSkeleton from "@/components/PaginationSkeleton";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteSelectedItems, setData } from "@/store/slice";
import { RootState } from "@/store/store";
import Pagination from "@/components/Pagination";
export default function Home() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const data = useSelector((state: RootState) => state.counter.data);
  const page = useSelector((state: RootState) => state.counter.page);
  const deleteItems = useSelector(
    (state: RootState) => state.counter.deleteItems
  );
  const del = () => {
    dispatch(deleteSelectedItems(1));
  };
  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await fetch(api);
        const result = await response.json();
        result.sort((a: any, b: any) => a.id - b.id);
        dispatch(setData(result));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);
  return (
    <>
      <div className="relative max-w-5xl mx-auto my-20 overflow-x-auto px-6">
        <div className="mb-4 flex justify-between">
          <input
            className="outline-none px-3 py-1 border rounded-sm "
            type="text"
            placeholder="Search"
          />
          {page}
          <button
            onClick={() => (deleteItems?.length ? del() : {})}
            type="button"
            className={`text-white ${
              !deleteItems?.length ? "bg-red-300 " : "bg-red-600"
            } font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2`}
          >
            <MdDelete />
            <span className="sr-only">Icon description</span>
          </button>
        </div>
        <table className="w-full border rounded-lg table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <input type="checkbox" />
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Role
              </th>
              <th scope="col" className="px-6 py-3">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <>
                <Loading />
              </>
            ) : (
              <>
                {data
                  ?.slice((page - 1) * 10, Math.min(page * 10, data?.length))
                  ?.map((list: any, index: number) => {
                    if (index < 10)
                      return (
                        <>
                          <ListItem listData={list} index={index} />
                        </>
                      );
                  })}
              </>
            )}
          </tbody>
        </table>
        {loading ? (
          <>
            <PaginationSkeleton />
          </>
        ) : (
          <>
            <Pagination />
          </>
        )}
      </div>
    </>
  );
}

"use client";
import { list } from "postcss";
import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { changeItem, deSelect, deleteItem, select } from "@/store/slice";
import { RootState } from "@/store/store";
function ListItem({ listData, setData, index }: any) {
  const dispatch = useDispatch();
  const data = useSelector((state: RootState) => state.counter.data);
  const deleteItems = useSelector((state: any) => state.counter.deleteItems);
  const selectedPage = useSelector((state: any) => state.counter.selectedPage);
  const page = useSelector((state: any) => state.counter.page);
  const { name, email, role } = listData;
  const [edit, setEdit] = useState(false);
  const del = (index: number) => {
    dispatch(deleteItem({ index: index, data: data }));
    setEdit(false);
  };
  const onchange = (e: any) => {
    dispatch(
      changeItem({
        index: index,
        object: { ...listData, [e.target.name]: e.target.value },
      })
    );
  };
  return (
    <>
      <tr
        className={`${
          selectedPage === page || deleteItems.indexOf(index) > -1
            ? "bg-gray-100"
            : ""
        } bg-white border-b `}
      >
        <th className="px-6 py-4">
          <input
            onChange={(e) => {
              if (e.target.checked) {
                console.log("checked");
                dispatch(select({ index: index }));
              } else {
                dispatch(deSelect({ index: index }));
              }
            }}
            checked={selectedPage === page || deleteItems.indexOf(index) > -1}
            type="checkbox"
          />
        </th>
        <th
          scope="row"
          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {!edit ? (
            <>
              <td className="py-2 text-black">{name} </td>
            </>
          ) : (
            <>
              <td>
                <input
                  onChange={onchange}
                  className="border rounded-sm outline-none w-68 px-2 py-1"
                  type="text"
                  name="name"
                  value={name}
                />
              </td>
            </>
          )}
        </th>
        {!edit ? (
          <>
            <td className="px-6 py-4 text-black">{email}</td>
          </>
        ) : (
          <>
            <td>
              {" "}
              <input
                onChange={onchange}
                className="border  text-black rounded-sm outline-none w-68 px-2 py-1"
                type="text"
                name="email"
                value={email}
              />
            </td>
          </>
        )}
        {!edit ? (
          <>
            <td className="px-6 py-4">{role}</td>
          </>
        ) : (
          <>
            <td>
              {" "}
              <input
                onChange={onchange}
                className="border text-black rounded-sm outline-none w-68 px-2 py-1"
                type="text"
                name="role"
                value={role}
              />
            </td>
          </>
        )}
        <td className="px-6 py-4">
          <div className="flex gap-2">
            {!edit ? (
              <>
                <button
                  onClick={() => setEdit(true)}
                  className="py-2 px-2 edit border rounded-sm"
                >
                  <FaRegEdit />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    setEdit(false);
                  }}
                  className="py-2 px-2 save border rounded-sm"
                >
                  <AiOutlineSave className="text-green-500" />
                </button>
              </>
            )}
            <button
              onClick={() => {
                del(index);
              }}
              className="py-2 px-2 delete border rounded-sm"
            >
              <MdDelete className="text-red-600" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}

export default ListItem;

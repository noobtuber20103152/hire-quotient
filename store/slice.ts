import useFetch from "@/hooks/useFetch";
import { api } from "@/libs/apis";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

function deleteItems(curr: any, items: any) {
  items.sort((a: any, b: any) => a - b);
  let i = 0,
    j = 0;
  let arr = [];
  for (i = 0; i < curr.length; i++) {
    if (i == items[j]) {
      j++;
    } else {
      arr.push(curr[i]);
    }
  }
  return arr;
}
export interface CounterState {
  value: any;
  data: any;
  deleteItems: any;
  page: any;
}

const initialState: CounterState = {
  value: 0,
  data: [],
  deleteItems: [],
  page: 1,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state: any) => {
      state.value += 1;
    },
    decrement: (state: any) => {
      state.value -= 1;
    },
    incrementByAmount: (state: any, action: PayloadAction<any>) => {
      state.value += action.payload;
      console.log(action.payload);
    },
    setData: (state: any, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    deleteItem: (state: any, action: PayloadAction<any>) => {
      let data: any = action.payload.data;
      data = data
        .slice(0, action.payload.index)
        .concat(data.slice(action.payload.index + 1));
      state.data = data;
    },
    changeItem: (state: any, action: PayloadAction<any>) => {
      let index = action.payload.index;

      const object = action.payload.object;
      state.data[index] = object;
    },
    select: (state: any, action: PayloadAction<any>) => {
      let index = action.payload.index;
      state.deleteItems = [...state.deleteItems, index];
    },
    deSelect: (state: any, action: PayloadAction<any>) => {
      let index = action.payload.index;
      index = state.deleteItems.indexOf(index);
      state.deleteItems = state.deleteItems
        .slice(0, index)
        .concat(state.deleteItems.slice(index + 1));
    },
    deleteSelectedItems: (state: any, action: PayloadAction<any>) => {
      state.data = deleteItems(state.data, state.deleteItems);
      state.deleteItems = [];
    },
    changePage: (state: any, action: PayloadAction<any>) => {
      // state.page = Math.min();
      let step = action.payload.step;
      let finalPage =
        state.data.length % 10 == 0
          ? state.data.length / 10
          : Math.trunc(state.data.length / 10) + 1;
      if (step == "next") {
        state.page += 1;
      } else if (step == "last") {
        state.page = finalPage;
      } else if (step == "first") {
        state.page = 1;
      } else if (step == "random") {
        state.page = action.payload.page;
      } else if (step === "prev") {
        state.page -= 1;
      }
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  setData,
  deleteItem,
  changeItem,
  select,
  deSelect,
  deleteSelectedItems,
  changePage,
} = counterSlice.actions;
export default counterSlice.reducer;

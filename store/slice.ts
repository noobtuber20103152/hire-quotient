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
  selectedPage: any;
}

const initialState: CounterState = {
  value: 0,
  data: [],
  deleteItems: [],
  page: 1,
  selectedPage: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setData: (state: any, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    deleteItem: (state: any, action: PayloadAction<any>) => {
      let finalPage =
        state.data.length % 10 == 0
          ? state.data.length / 10
          : Math.trunc(state.data.length / 10) + 1;
      let data: any = action.payload.data;
      data = data
        .slice(0, action.payload.index)
        .concat(data.slice(action.payload.index + 1));
      state.data = data;
      if (
        (state.selectedPage === finalPage || state.page === finalPage) &&
        data?.length % 10 == 0
      ) {
        state.page -= 1;
        console.log(state.page, "inside page");
      }
      state.deleteItems = [];
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
      state.selectedPage = 0;
    },
    selectAll: (state: any, actions: PayloadAction<any>) => {
      state.deleteItems = [];
      for (
        let i = (state.page - 1) * 10;
        i < Math.min(state.page * 10, state.data.length);
        i++
      ) {
        state.deleteItems.push(i);
      }
      state.selectedPage = state.page;
    },

    deSelectAll: (state: any, actions: PayloadAction<any>) => {
      state.deleteItems = [];
      console.log(state.deleteItems);
      state.selectedPage = 0;
    },
    deleteSelectedItems: (state: any, action: PayloadAction<any>) => {
      let finalPage =
        state.data.length % 10 == 0
          ? state.data.length / 10
          : Math.trunc(state.data.length / 10) + 1;
      state.data = deleteItems(state.data, state.deleteItems);
      state.deleteItems = [];

      console.log(state.page, finalPage);
      if (state.selectedPage === finalPage || state.page === finalPage) {
        state.page -= 1;
        console.log(state.page, "inside page");
      }
      console.log(state.page, "page status");
      state.selectedPage = 0;
      console.log("delete selected item");
      console.log(state.deleteItems);
    },
    changePage: (state: any, action: PayloadAction<any>) => {
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
    searchItems: (state: any, action: PayloadAction<any>) => {
      let query = action.payload.query;
      state.data = [
        ...state.data.filter((doc: any) => {
          if (
            doc.role.includes(query) ||
            doc.name.includes(query) ||
            doc.email.includes(query)
          )
            return true;
        }),
      ];
    },
  },
});

export const {
  setData,
  deleteItem,
  changeItem,
  select,
  deSelect,
  deleteSelectedItems,
  changePage,
  selectAll,
  deSelectAll,
  searchItems,
} = counterSlice.actions;
export default counterSlice.reducer;

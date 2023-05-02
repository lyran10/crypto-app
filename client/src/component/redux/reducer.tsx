import { createSlice } from "@reduxjs/toolkit";
import { State } from "../utils/interface";
import {
  coinssList,
  getwatchList,
  findUser,
  singleCoin,
  historicalChart,
} from "./actions";

const initialState: State = {
  currency: "USD",
  symbol: "$",
  inputSearch: "",
  coinsList: [],
  paginationList: [],
  filteredList: [],
  translate: {
    showModal: "-translate-y-[800px]",
    showOverlay: "translate-x-[1700px]",
  },
  opacity: {
    modalOpacity: "opacity-0",
    overlayOpacity: "opacity-0",
  },
  login: false,
  userDetails: { _id: "", email: "", token: "" },
  watchlist: [],
  alertMoveUp: "-translate-y-[1000px]",
  alertMsg: "",
  tokenExpiredMsg: "Token has expired. Please login again.",
  tokenExpiredMsgMoveUp: "translate-y-[500px]",
  singlecoin: [],
  chartData: [],
  days: 1,
  logoutMsg: "top-[0px]",
};

export const stateValues = createSlice({
  name: "State",
  initialState,
  reducers: {
    currencyChange: (state, action) => {
      state.currency = action.payload;
    },
    symbolChange: (state, action) => {
      state.symbol = action.payload;
    },
    inputChange: (state, action) => {
      state.inputSearch = action.payload;
      state.filteredList = state.coinsList.filter(
        (coin) =>
          coin.name.toLowerCase().includes(action.payload.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
    translateEffects: (state, action) => {
      const { showModal, overlay } = action.payload;
      state.translate.showModal = showModal;
      state.translate.showOverlay = overlay;
    },
    opacityEffects: (state, action) => {
      const { modalOpacity, overlayOpacity } = action.payload;
      state.opacity.modalOpacity = modalOpacity;
      state.opacity.overlayOpacity = overlayOpacity;
    },
    userLogin: (state, action) => {
      state.login = action.payload;
    },
    details: (state, action) => {
      state.userDetails = action.payload;
    },
    clearwatchlist: (state, action) => {
      state.watchlist = action.payload;
    },
    loginandSignInalert: (state, action) => {
      state.alertMoveUp = action.payload;
    },
    msg: (state, action) => {
      state.alertMsg = action.payload;
    },
    removeData: (state, action) => {
      state.singlecoin = action.payload;
    },
    period: (state, action) => {
      state.days = action.payload;
    },
    logoutmsg: (state, action) => {
      state.logoutMsg = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(coinssList.fulfilled, (state, action) => {
      state.coinsList = action.payload;
      state.paginationList = action.payload;
    });

    builder.addCase(getwatchList.fulfilled, (state, action) => {
      state.watchlist = action.payload;
    });

    builder.addCase(findUser.fulfilled, (state, action) => {
      state.userDetails = action.payload;
      state.login = true;
    });

    builder.addCase(findUser.rejected, (state, action) => {
      state.tokenExpiredMsgMoveUp = "-translate-y-[230px]";
      state.login = false;
    });

    builder.addCase(singleCoin.fulfilled, (state, action) => {
      state.singlecoin = action.payload;
    });

    builder.addCase(historicalChart.fulfilled, (state, action) => {
      state.chartData = action.payload;
    });
  },
});

export const {
  currencyChange,
  inputChange,
  symbolChange,
  translateEffects,
  opacityEffects,
  userLogin,
  details,
  clearwatchlist,
  loginandSignInalert,
  msg,
  removeData,
  period,
  logoutmsg,
} = stateValues.actions;

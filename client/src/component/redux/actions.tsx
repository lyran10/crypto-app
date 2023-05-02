import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { CoinList, SingleCoin, HistoricalChart } from "../utils/coinapi";
import { UserDetails } from "../utils/interface";

type Obj = {
  id: string | null;
  token: string | null;
};

type Data = {
  id: string | undefined;
  currency: string | undefined;
  days: number;
};

export const coinssList = createAsyncThunk(
  "crypto/coinList",
  async (currency: string) => {
    const { data } = await axios.get(CoinList(currency));
    return data;
  }
);

export const getwatchList = createAsyncThunk(
  "crypto/watchList",
  async (userDetails: UserDetails) => {
    const { _id, token } = userDetails;
    const {
      data: {
        list: { watchlist },
      },
    } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/list`,
      { id: _id },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return watchlist;
  }
);

export const findUser = createAsyncThunk(
  "crypto/findUser",
  async ({ id, token }: Obj) => {
    const {
      data: { msg },
    } = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/api/expiry`,
      { id: id },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      }
    );
    return msg[0];
  }
);

export const singleCoin = createAsyncThunk(
  "crypto/singlecoin",
  async (currency: string) => {
    const { data } = await axios.get(SingleCoin(currency));
    return data;
  }
);

export const historicalChart = createAsyncThunk(
  "crypto/historicalChart",
  async ({ currency, days, id }: Data) => {
    const {
      data: { prices },
    } = await axios.get(HistoricalChart(id, days, currency));
    return prices;
  }
);

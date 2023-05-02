export {};
// functions to get the coins data

export const SingleCoin = (id: string) => {
  return `https://api.coingecko.com/api/v3/coins/${id}`;
};

export const HistoricalChart = (
  id: string | undefined,
  days = 365,
  currency: string | undefined
) =>
  `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const trendingCoins = (currency: string) =>{
  return`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;
}

export const CoinList = (currency: string) => {
  return `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;
};

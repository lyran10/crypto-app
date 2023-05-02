import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import {
  useDispatch,
  useSelector,
  TypedUseSelectorHook,
} from "react-redux/es/exports";
import { Loading } from "../utils/loading";
import { chartDays } from "./data";
import { SelectButton } from "./selectedButton";
import { AppDispatch, RootState } from "../redux/store";
import { historicalChart } from "../redux/actions";
import { period } from "../redux/reducer";
Chart.register(CategoryScale);

type Props = {
  id: string | undefined;
};

export const CoinChart = ({ id }: Props) => {
  const selector: TypedUseSelectorHook<RootState> = useSelector;
  const dispatch = useDispatch<AppDispatch>();
  const currency = selector((state) => state.currencyData.currency);
  const chartData = selector((state) => state.currencyData.chartData);
  const [days, setdays] = useState(1);

  useEffect(() => {
    dispatch(historicalChart({ currency, days, id }));
  }, [currency, days]);

  return (
    <section className="flex p-[30px] flex-col gap-3 mt-10 justify-center md:h-[80%] lg:h-[80%] h-[30%] items-center w-[100%] md:w-[60%] lg:w-[60%] text-offWhite">
      {!chartData ? (
        <Loading />
      ) : (
        <Line
          data={{
            labels: chartData.map((coin) => {
              let date = new Date(coin[0]);
              let time =
                date.getHours() > 12
                  ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
                  : `${date.getHours()} : ${date.getMinutes()} AM`;
              return days === 1 ? time : date.toLocaleDateString();
            }),
            datasets: [
              {
                data: chartData.map((coin) => coin[1]),
                label: `Price (Past ${days} ${
                  days === 1 ? "Day" : "Days"
                }) in ${currency}`,
                borderColor: "#EEBC1D",
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            elements: {
              point: {
                radius: 2.5,
              },
            },
          }}
        />
      )}
      <div className="flex gap-2 flex-wrap mb-3">
        {chartDays.map((data, index) => {
          return (
            <SelectButton
              key={index}
              onClick={() => {
                dispatch(period(data.value));
                setdays(data.value);
              }}
              selected={data.value === days}
            >
              <span>{data.label}</span>
            </SelectButton>
          );
        })}
      </div>
    </section>
  );
};

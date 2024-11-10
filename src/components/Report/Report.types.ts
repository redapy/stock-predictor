import { Dispatch, SetStateAction } from "react";

export type ReportProps = {
  tickers: string[];
  setTickers: Dispatch<SetStateAction<string[]>>;
};

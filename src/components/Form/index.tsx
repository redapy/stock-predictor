"use client";
import { fetchStockData } from "@/app/action";
import AddIcon from "@/Icons/addIcon";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import Submit from "../Submit";
import Report from "../Report";
import ReportResult from "../ReportResult";

const initialState: { result: string; erro: null | string } = {
  result: "",
  erro: null,
};

const MyForm = () => {
  const [tickers, setTickers] = useState<string[]>([]);
  const fetchStockDataWithTickers = fetchStockData.bind(null, tickers);

  const [state, formAction] = useFormState(
    fetchStockDataWithTickers,
    initialState
  );

  return (
    <section className="action-panel">
      <form id="ticker-input-form" action={formAction}>
        {state.result ? (
          <ReportResult result={state.result} />
        ) : (
          <>
            <Report tickers={tickers} setTickers={setTickers} />
            <Submit tickersLength={tickers.length} />
          </>
        )}

        <p className="tag-line">Always correct 15% of the time!</p>
      </form>
    </section>
  );
};

export default MyForm;

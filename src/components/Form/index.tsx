"use client";
import { fetchStockData } from "@/app/action";
import AddIcon from "@/Icons/addIcon";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

const initialState: { result: string; erro: null | string } = {
  result: "",
  erro: null,
};

const MyForm = () => {
  const [tickers, setTickers] = useState<string[]>([]);
  const fetchStockDataWithTickers = fetchStockData.bind(null, tickers);
  const [ticker, setTicker] = useState<string>("");
  const [state, formAction] = useFormState(
    fetchStockDataWithTickers,
    initialState
  );
  const { pending } = useFormStatus();

  const handleAddTicker = () => {
    if (ticker && ticker.length > 0) {
      setTickers((prev) => [...prev, ticker]);
      setTicker("");
    }
  };

  console.log("========================");

  console.log("is pending", pending);
  console.log("========================");

  return (
    <section className="action-panel">
      <form id="ticker-input-form" action={formAction}>
        <label htmlFor="ticker-input">
          Add up to 3 stock tickers below to get a super accurate stock
          predictions report👇
        </label>
        <div className="form-input-control">
          <input
            type="text"
            id="ticker-input"
            placeholder="MSFT"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
          <button
            className="add-ticker-btn"
            type="button"
            onClick={handleAddTicker}
          >
            <AddIcon />
          </button>
        </div>

        {tickers.length > 0 ? (
          <ul className="flex flex-col gap-1 py-4">
            {tickers.map((ticker) => (
              <li key={ticker}>{ticker}</li>
            ))}
          </ul>
        ) : (
          <p className="ticker-choice-display">
            Your tickers will appear here...
          </p>
        )}
        <button
          className="generate-report-btn disabled:bg-gray-400"
          disabled={tickers.length === 0}
        >
          Generate Report
        </button>
        <p className="tag-line">Always correct 15% of the time!</p>
      </form>
    </section>
  );
};

export default MyForm;

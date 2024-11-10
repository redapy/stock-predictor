"use client";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormStatus } from "react-dom";
import { ReportProps } from "./Report.types";
import AddIcon from "@/Icons/addIcon";

const Report = ({ tickers, setTickers }: ReportProps) => {
  const { pending } = useFormStatus();
  const [ticker, setTicker] = useState<string>("");

  const handleAddTicker = () => {
    if (ticker && ticker.length > 0) {
      setTickers((prev) => [...prev, ticker]);
      setTicker("");
    }
  };

  return pending ? (
    <section className="loading-panel">
      <Image src="images/loader.svg" alt="loading" width={320} height={320} />
      <div id="api-message">Querying Stocks API...</div>
    </section>
  ) : (
    <>
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
    </>
  );
};

export default Report;

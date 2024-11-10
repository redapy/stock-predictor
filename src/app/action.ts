"use server";

import { POLYGON_API } from "@/utils/const";
import { format, subDays } from "date-fns";
import OpenAI from "openai";

const openAI = new OpenAI();

export async function fetchStockData(tickers: string[]) {
  const today = new Date();
  // YYYY-MM-DD
  const startDate = format(subDays(today, 3), "yyy-MM-dd");
  const endDate = format(subDays(today, 1), "yyy-MM-dd");

  try {
    const stocksData = await Promise.all(
      tickers.map(async (ticker) => {
        const url = `${POLYGON_API}/${ticker}/range/1/day/${startDate}/${endDate}?apiKey=${process.env.POLYGON_API_KEY}`;
        const res = await fetch(url);
        const data = await res.text();
        const status = res.status;

        if (status === 200) {
          return data;
        } else {
          throw new Error(
            `Failed to fetch stock data for ${ticker}: ${status}`
          );
        }
      })
    );

    const aiResponse = await fetchReport(stocksData.join(","));
    return { result: aiResponse };
  } catch (e) {
    return { error: (e as Error).message || "An unexpected error occurred" };
  }
}

export async function fetchReport(data: string) {
  try {
    const completion = await openAI.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a trading guru. Given data on share prices over the past 3 days, write a report of no more than 150 words describing the stocks performance and recommending whether to buy, hold or sell.",
        },
        {
          role: "user",
          content: data,
        },
      ],
    });
    return completion?.choices?.[0]?.message.content;
  } catch (e) {
    return { error: (e as Error).message || "Failed to generate report" };
  }
}

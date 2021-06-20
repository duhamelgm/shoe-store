import { atom } from "jotai";
import { MetricDataPoint } from "../types/metrics.types";

export const ordersHistogramAtom = atom<Array<MetricDataPoint>>(async (get) => {
  try {
    const response = await fetch(
      "http://localhost:3000/api/metrics/orders_histogram"
    );
    return await response.json();
  } catch (err) {
    console.log(err);
  }
});

export const inventorySalesHistogramAtom = atom<Array<MetricDataPoint>>(
  async (get) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/metrics/inventory_sales_histogram"
      );
      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
);

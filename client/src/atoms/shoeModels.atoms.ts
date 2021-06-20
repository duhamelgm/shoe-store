import { atom } from "jotai";

import {
  ShoeModelInterface,
  ShoeModelsMetricsDashboardInterface
} from "../types/shoeModels.types";

export const fetchShoeModelsAtom = atom(async (get): Promise<
  Array<ShoeModelInterface>
> => {
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: `{shoeModels {id, name }}`
      })
    });
    return (await response.json()).data.shoeModels;
  } catch (err) {
    console.log(err);
  }

  return [];
});

export const shoeModelsByStore = atom<Array<ShoeModelInterface>>([]);
export const fetchShoeModelsByStore = atom(
  (get) => get(shoeModelsByStore),
  async (_get, set, storeId: string) => {
    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `{shoeModelsByStore(storeId: ${storeId}) {id, name, inventories { amount }}}`
        })
      });
      set(shoeModelsByStore, (await response.json()).data.shoeModelsByStore);
    } catch (err) {
      console.log(err);
    }
  }
);

export const shoeModelsByStoreMetricsDashboard =
  atom<ShoeModelsMetricsDashboardInterface>({});

export const fetchShoeModelsByStoreMetricsDashboard = atom(
  (get): ShoeModelsMetricsDashboardInterface =>
    get(shoeModelsByStoreMetricsDashboard),
  async (get, set, storeId: string) => {
    // Don't trigger suspense with metrics dashboard
    const getResponse = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/shoe_models/metrics/dashboard_store?store_id=${storeId}`
        );
        const data = await response.json();

        const currentData = get(shoeModelsByStoreMetricsDashboard);
        Object.values(currentData).forEach((val) => {
          let trending = "flat";
          if (val.total_inventory > data[val.shoe_model_id].total_inventory) {
            trending = "down";
          } else if (
            val.total_inventory < data[val.shoe_model_id].total_inventory
          ) {
            trending = "up";
          }

          data[val.shoe_model_id] = {
            ...data[val.shoe_model_id],
            trending
          };
        });

        set(shoeModelsByStoreMetricsDashboard, data);
      } catch (err) {
        console.log(err);
      }
    };
    getResponse();
  }
);

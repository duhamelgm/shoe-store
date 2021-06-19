import { atom } from "jotai";
import {
  StoreInterface,
  StoresMetricsDashboardInterface
} from "../types/store.types";

export const storesAtom = atom([]);
export const fetchStores = atom(async (get): Promise<Array<StoreInterface>> => {
  try {
    const response = await fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: "{stores {id, name}}"
      })
    });
    return (await response.json()).data.stores;
  } catch (err) {
    console.log(err);
  }

  return [];
});

export const storesMetricsDashboard = atom<StoresMetricsDashboardInterface>({});
export const fetchStoresMetricsDashboardAtom = atom(
  (get): StoresMetricsDashboardInterface => get(storesMetricsDashboard),
  async (get, set) => {
    // Don't trigger suspense with metrics dashboard
    const getResponse = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/stores/metrics/dashboard"
        );
        const data = await response.json();

        const currentData = get(storesMetricsDashboard);
        Object.values(currentData).forEach((val) => {
          let trending = "flat";
          if (val.total_inventory > data[val.store_id].total_inventory) {
            trending = "down";
          } else if (val.total_inventory < data[val.store_id].total_inventory) {
            trending = "up";
          }

          data[val.store_id] = {
            ...data[val.store_id],
            trending
          };
        });

        set(storesMetricsDashboard, data);
      } catch (err) {
        console.log(err);
      }
    };
    getResponse();
  }
);

export const storeAtom = atom<StoreInterface | null>(null);
export const fetchStore = atom(
  (get) => get(storeAtom),
  async (_get, set, storeId: string) => {
    try {
      const response = await fetch("http://localhost:3000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: `{store(id: ${storeId}) {id, name}}`
        })
      });
      set(storeAtom, (await response.json()).data.store);
    } catch (err) {
      console.log(err);
    }
  }
);

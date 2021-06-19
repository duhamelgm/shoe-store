import { StoreShoeModelInventoryInterface } from "./storeShoeModelInventory.types";

export type StoreIdType = number;

export interface StoreInterface {
  id: StoreIdType;
  name: string;
  inventory?: StoreShoeModelInventoryInterface;
  created_at: Date;
  updated_at: Date;
}

export interface StoreMetricsDashboardInterface {
  store_id: StoreIdType;
  total_sales: number;
  total_inventory: number;
  trending: string;
}

export interface StoresMetricsDashboardInterface {
  [key: string]: StoreMetricsDashboardInterface;
}

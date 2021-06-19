import { StoreShoeModelInventoryInterface } from "./storeShoeModelInventory.types";

export interface ShoeModelInterface {
  id: number;
  name: string;
  inventories?: Array<StoreShoeModelInventoryInterface>;
  created_at: Date;
  updated_at: Date;
}

export interface ShoeModelMetricsDashboardInterface {
  shoe_model_id: number;
  total_sales: number;
  total_inventory: number;
  trending: string;
}

export interface ShoeModelsMetricsDashboardInterface {
  [key: string]: ShoeModelMetricsDashboardInterface;
}

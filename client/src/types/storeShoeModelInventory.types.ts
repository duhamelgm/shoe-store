import { StoreInterface } from "./store.types";
import { ShoeModelInterface } from "./shoeModels.types";

export interface StoreShoeModelInventoryInterface {
  id: number;
  store_id: number;
  shoe_model_id: number;
  store?: StoreInterface;
  shoe_model?: ShoeModelInterface;
  amount: number;
  created_at: Date;
  updated_at: Date;
}

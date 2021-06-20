export interface EventsInterface {
  id: number;
  store_id: number;
  shoe_model_id: number;
  name: string;
  change: number;
  inventory: number;
  created_at: Date;
  updated_at: Date;
}

export type EventsIdsObject = {
  [key: string]: boolean;
};

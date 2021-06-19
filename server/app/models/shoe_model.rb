class ShoeModel < ApplicationRecord
  has_many :inventories, foreign_key: "shoe_model_id", class_name: "StoreShoeModelInventory"
end

class Store < ApplicationRecord
  has_many :inventories, foreign_key: "store_id", class_name: "StoreShoeModelInventory"
end

class StoreShoeModelInventory < ApplicationRecord
  belongs_to :shoe_model
  belongs_to :store
end

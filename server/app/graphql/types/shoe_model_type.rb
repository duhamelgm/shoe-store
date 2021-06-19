module Types
  class ShoeModelType < Types::BaseObject
    description "A type of shoe model"
    field :id, ID, null: false
    field :name, String, null: false

    field :inventories, [Types::StoreShoeModelInventoryType], null: true
  end
end

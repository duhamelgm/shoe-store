module Types
  class StoreShoeModelInventoryType < Types::BaseObject
    description "The available inventory of a shoe model per store"
    field :id, ID, null: false
    field :store, StoreType, null: false
    field :amount, Integer, null: false

    field :shoe_model, ShoeModelType, null: false
    def shoe_model
      ForeignKeyLoader.for(ShoeModel, :id).load(object.shoe_model_id).then {|arr| arr.first}
    end
  end
end

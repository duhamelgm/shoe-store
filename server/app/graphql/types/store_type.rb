module Types
  class StoreType < Types::BaseObject
    description "A store with different shoe models"
    field :id, ID, null: false
    field :name, String, null: false

    field :inventories, [Types::StoreShoeModelInventoryType], null: true
    def inventories
      ForeignKeyLoader.for(StoreShoeModelInventory, :store_id, merge: -> { order(id: :asc) }).load(object.id)
    end
  end
end

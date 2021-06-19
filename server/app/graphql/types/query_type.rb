module Types
  class QueryType < Types::BaseObject
    # Store Queries
    field :store, StoreType, null: true do
      argument :id, ID, required: true
    end
    def store(id:)
      Store.find(id)
    end

    field :stores, [StoreType], null: true
    def stores
      Store.all
    end

    # Shoe Models
    field :shoe_models_by_store, [ShoeModelType], null: true do
      argument :store_id, ID, required: true
    end
    def shoe_models_by_store(store_id:)
      ShoeModel.includes(:inventories).where("inventories.store_id": store_id).order('name ASC')
    end

  end
end

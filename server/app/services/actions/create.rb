# Create a new action sale event
module Actions
  class Create
    def initialize(store_name:, shoe_model_name:, new_inventory_amount:)
      @store = Store.find_by(name: store_name)
      @shoe_model = ShoeModel.find_by(name: shoe_model_name)
      @new_inventory_amount = new_inventory_amount
      @inventory_change = 0
    end

    def call
      # Find existent inventory for this store and shoe model
      inventory = StoreShoeModelInventory.find_by!(store_id: store.id, shoe_model_id: shoe_model.id)

      # Calculate change in inventory
      inventory_change = new_inventory_amount - inventory.amount

      # Save new inventory
      inventory.amount = new_inventory_amount
      inventory.save!

      # Create action
      Action.create!(
        store_id: store.id,
        shoe_model_id: shoe_model.id,
        name: inventory_change >= 0 ? 'restock' : 'sale', # Treat no change as restock even if it's not
        change: inventory_change,
        inventory: new_inventory_amount
      )
    end

    private

    attr_accessor :store, :shoe_model, :new_inventory_amount, :inventory_change
  end
end
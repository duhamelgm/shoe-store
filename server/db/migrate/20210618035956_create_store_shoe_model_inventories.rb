class CreateStoreShoeModelInventories < ActiveRecord::Migration[6.1]
  def change
    create_table :store_shoe_model_inventories do |t|
      t.integer :store_id
      t.integer :shoe_model_id
      t.integer :amount

      t.timestamps
    end

    add_index :store_shoe_model_inventories, :store_id
    add_index :store_shoe_model_inventories, :shoe_model_id
    add_index :store_shoe_model_inventories, [:store_id, :shoe_model_id], name: :index_st_shoe_model_on_compund_id
  end
end

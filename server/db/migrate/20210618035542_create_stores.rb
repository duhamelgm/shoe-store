class CreateStores < ActiveRecord::Migration[6.1]
  def change
    create_table :stores do |t|
      t.string :name

      t.timestamps
    end

    add_index :stores, :name
  end
end

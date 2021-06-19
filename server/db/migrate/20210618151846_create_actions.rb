class CreateActions < ActiveRecord::Migration[6.1]
  def change
    create_table :actions do |t|
      t.integer :store_id
      t.integer :shoe_model_id
      t.string :name
      t.integer :change
      t.integer :inventory

      t.timestamps
    end
  end
end

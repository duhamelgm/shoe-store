class CreateShoeModels < ActiveRecord::Migration[6.1]
  def change
    create_table :shoe_models do |t|
      t.string :name

      t.timestamps
    end

    add_index :shoe_models, :name
  end
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

STORE_STORES = ['ALDO Centre Eaton', 'ALDO Destiny USA Mall', 'ALDO Pheasant Lane Mall', 'ALDO Holyoke Mall', 'ALDO Maine Mall', 'ALDO Crossgates Mall', 'ALDO Burlington Mall', 'ALDO Solomon Pond Mall', 'ALDO Auburn Mall', 'ALDO Waterloo Premium Outlets']
SHOES_MODELS = ['ADERI', 'MIRIRA', 'CAELAN', 'BUTAUD', 'SCHOOLER', 'SODANO', 'MCTYRE', 'CADAUDIA', 'RASIEN', 'WUMA', 'GRELIDIEN', 'CADEVEN', 'SEVIDE', 'ELOILLAN', 'BEODA', 'VENDOGNUS', 'ABOEN', 'ALALIWEN', 'GREG', 'BOZZA' ]

STORE_STORES.each do |store_name|
  Store.create(name: store_name)
end

SHOES_MODELS.each do |shoe_model_name|
  shoe_model = ShoeModel.create(name: shoe_model_name )

  # Base inventory
  STORE_STORES.each do |store_name|
    store = Store.find_by(name: store_name)
    StoreShoeModelInventory.create(store_id: store.id, shoe_model_id: shoe_model.id, amount: 50)
    Actions::CreateJob.perform_async({ store: store_name, model: shoe_model_name, inventory: 50 })
  end
end


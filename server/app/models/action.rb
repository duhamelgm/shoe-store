class Action < ApplicationRecord
  include Searchable

  ACTIONS = %w[
    sale
    restock
  ].freeze

  belongs_to :store
  belongs_to :shoe_model

  settings index: { number_of_shards: 5 } do
    mappings dynamic: 'false' do
      indexes :id, type: 'long'
      indexes :store_id, type: 'long'
      indexes :shoe_model_id, type: 'long'
      indexes :name, type: 'keyword'
      indexes :change, type: 'numeric'
      indexes :inventory, type: 'numeric'
    end
  end
end

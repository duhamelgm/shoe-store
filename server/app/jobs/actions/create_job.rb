module Actions
  class CreateJob
    include Sidekiq::Worker
    sidekiq_options retry: false, backtrace: true, queue: 'default'

    def perform(params)
      Actions::Create.new(store_name: params['store'], shoe_model_name: params['model'], new_inventory_amount: params['inventory']).call
    end
  end
end
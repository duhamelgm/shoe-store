class ShoeModelsController < ApplicationController
  def dashboard_store
    data = ShoeModels::DashboardStore.new(store_id: store_id).call
    render json: data
  end

  private

  def store_id
    params.require(:store_id)
  end
end
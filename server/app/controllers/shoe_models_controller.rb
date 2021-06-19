class ShoeModelsController < ApplicationController
  def metrics_dashboard_store
    data = ShoeModels::MetricsDashboardStore.new(store_id: store_id).call
    render json: data
  end

  private

  def store_id
    params.require(:store_id)
  end
end
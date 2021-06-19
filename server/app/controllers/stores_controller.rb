class StoresController < ApplicationController
  def metrics_dashboard
    data = Stores::MetricsDashboard.new.call
    render json: data
  end
end
class MetricsController < ApplicationController
  def orders_histogram
    data = Metrics::OrdersHistogram.new.call
    render json: data
  end

  def inventory_sales_histogram
    data = Metrics::InventorySalesHistogram.new.call
    render json: data
  end
end
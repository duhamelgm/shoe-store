require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"

  post "/graphql", to: "graphql#execute"

  get "/api/stores/dashboard", to: "stores#dashboard"
  get "/api/shoe_models/dashboard_store", to: "shoe_models#dashboard_store"
  get "/api/actions", to: "actions#index"
  get "/api/metrics/orders_histogram", to: "metrics#orders_histogram"
  get "/api/metrics/inventory_sales_histogram", to: "metrics#inventory_sales_histogram"
end

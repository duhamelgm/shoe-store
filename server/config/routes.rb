require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"

  post "/graphql", to: "graphql#execute"

  get "/api/stores/metrics/dashboard", to: "stores#metrics_dashboard"
  get "/api/shoe_models/metrics/dashboard_store", to: "shoe_models#metrics_dashboard_store"
  get "/api/actions", to: "actions#index"
end

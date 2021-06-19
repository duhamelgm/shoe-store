require 'sidekiq/web'

Rails.application.routes.draw do
  mount Sidekiq::Web => "/sidekiq"

  post "/graphql", to: "graphql#execute"
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  get "/api/stores/metrics/dashboard", to: "stores#metrics_dashboard"
  get "/api/shoe_models/metrics/dashboard_store", to: "shoe_models#metrics_dashboard_store"
end

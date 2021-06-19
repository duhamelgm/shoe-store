Sidekiq.configure_client do |config|
  config.redis = { :size => 1, :url => ENV['MAIN_REDIS_URL']}
end

Sidekiq.configure_server do |config|
  config.redis = { :size => 52, :url => ENV['MAIN_REDIS_URL']}
end

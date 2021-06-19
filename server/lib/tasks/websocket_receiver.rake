task websocket_receiver: :environment do
  require 'faye/websocket'
  require 'eventmachine'
  require 'json'

  EM.run {
    ws = Faye::WebSocket::Client.new(ENV['WEBSOCKET_URL'])
  
    ws.on :message do |event|
      data = JSON.parse(event.data)
      Actions::CreateJob.perform_async(data)
    end
  }
end



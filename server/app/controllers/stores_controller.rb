class StoresController < ApplicationController
  def dashboard
    data = Stores::Dashboard.new.call
    render json: data
  end
end
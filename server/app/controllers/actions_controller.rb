class ActionsController < ApplicationController
  def index
    data = Actions::Search.new(page: search_params[:page] || 1, per_page: search_params[:per_page] || 10).call
    render json: data
  end

  private

  def search_params
    params.permit(:page, :per_page)
  end
end
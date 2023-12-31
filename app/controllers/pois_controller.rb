class PoisController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index]
  def index
    @pois = Poi.all

    render json: { pois: @pois }
  end

  def new
    @poi = Poi.new(color: "#3388ff", icon: "taxi")
    render partial: "pois/form"
  end

  def create
    @poi = Poi.new(poi_params.merge(user: current_user))
    if @poi.save
      render json: { response: { message: "El punto de Interés fue creado con éxito." }, status: :ok }
    else
      render partial: "pois/form", status: :unprocessable_entity
    end
  end

  private

    def poi_params
      params.require(:poi).permit(:title, :description, :score, :latitude, :longitude, :icon, :color, :category_id)
    end
end
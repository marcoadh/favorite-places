class PoisController < ApplicationController
  skip_before_action :authenticate_user!

  def new
    render partial: "pois/form"
  end

  def create

  end
end
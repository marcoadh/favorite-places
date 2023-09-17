class PanelController < ApplicationController
  skip_before_action :authenticate_user!

  def map
  end

end
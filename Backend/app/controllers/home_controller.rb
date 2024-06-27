# app/controllers/home_controller.rb

class HomeController < ApplicationController
  def index
    render json: { message: 'Welcome to FinTrack API' }
  end
end

# frozen_string_literal: true

class SessionsController < ApplicationController
  # POST /login
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { status: 'Logged in', user: }
    else
      render json: { status: 'Error', message: 'Invalid credentials' }, status: :unauthorized
    end
  end
end

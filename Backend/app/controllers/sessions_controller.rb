# frozen_string_literal: true

class SessionsController < ApplicationController
  # POST /login
  def create
  user = User.find_by(email: params[:email])
  if user
    if user.authenticate(params[:password])
      session[:user_id] = user.id
      render json: { status: 'Logged in', user: user }
    else
      render json: { status: 'Error', message: 'Incorrect password' }, status: :unauthorized
    end
  else
    render json: { status: 'Error', message: 'User not found' }, status: :not_found
  end
end

end

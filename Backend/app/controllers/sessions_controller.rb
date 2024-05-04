# frozen_string_literal: true

class SessionsController < ApplicationController
  # POST /login
  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: {
        status: 'Logged in',
        user: { id: user.id, email: user.email, name: user.name }
      }
    elsif user
      render json: { status: 'Error', message: 'Incorrect password' }, status: :unauthorized
    else
      render json: { status: 'Error', message: 'User not found' }, status: :not_found
    end
  end

  def destroy
    session.delete(:user_id)
    render json: { status: 'Logged out' }
  end
end

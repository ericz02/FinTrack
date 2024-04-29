# frozen_string_literal: true

class TransactionsController < ApplicationController
  before_action :set_user

  # POST /users/:user_id/transactions
  def create
    @transaction = @user.transactions.new(transaction_params)
    if @transaction.save
      render json: @transaction, status: :created
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # GET /users/:user_id/transactions
  def index
    @transactions = @user.transactions
    render json: @transactions
  end

  private

  # Use callbacks to share common setup or constraints between actions
  def set_user
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  # Only allow a trusted parameter "white list" through
  def transaction_params
    params.require(:transaction).permit(:name, :amount, :date, :description, :type, :merchant)
  end
end

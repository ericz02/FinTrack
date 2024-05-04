# frozen_string_literal: true

class TransactionsController < ApplicationController
  before_action :set_user
  before_action :set_transaction, only: [:destroy]

  # POST /users/:user_id/transactions
  def create
    @transaction = @user.transactions.new(transaction_params)
    if @transaction.save
      render json: @transaction, status: :created
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  # GET /users/:user_id/transactions/:id
  def show
    render json: @transaction
  end

  # GET /users/:user_id/transactions
  def index
    @transactions = @user.transactions
    render json: @transactions
  end

  # DELETE /users/:user_id/transactions/:id
  def destroy
    if @transaction.destroy
      render json: { message: 'Transaction successfully deleted.' }, status: :ok
    else
      render json: @transaction.errors, status: :unprocessable_entity
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions
  def set_user
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def set_transaction
    @transaction = @user.transactions.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Transaction not found' }, status: :not_found
  end

  # Only allow a trusted parameter "white list" through
  def transaction_params
    params.require(:transaction).permit(:name, :amount, :date, :description, :transaction_type, :merchant)
  end
end

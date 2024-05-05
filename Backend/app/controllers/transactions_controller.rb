# frozen_string_literal: true

require 'write_xlsx'

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

  def export
    @transactions = @user.transactions
    filename = "Transactions_#{Time.now.strftime('%Y%m%d%H%M%S')}.xlsx"
    workbook = WriteXLSX.new(filename)
    worksheet = workbook.add_worksheet

    headers = %w[Name Amount Date Description Type Merchant]
    worksheet.write_row(0, 0, headers)

    @transactions.each_with_index do |transaction, index|
      worksheet.write_row(index + 1, 0, [
                            transaction.name,
                            transaction.amount,
                            transaction.date.strftime('%Y-%m-%d'),
                            transaction.description,
                            transaction.transaction_type,
                            transaction.merchant
                          ])
    end

    workbook.close # Ensure the workbook is closed properly

    # After closing the workbook, send the file
    send_file filename, filename:, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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

# frozen_string_literal: true

require 'write_xlsx'

class BankAccountsController < ApplicationController
  before_action :set_user
  before_action :set_bank_account, only: %i[show update destroy]

  # GET /users/:user_id/bank_accounts
  def index
    @bank_accounts = @user.bank_accounts
    render json: @bank_accounts
  end

  # GET /users/:user_id/bank_accounts/:id
  def show
    render json: @bank_account
  end

  # POST /users/:user_id/bank_accounts
  def create
    @bank_account = @user.bank_accounts.new(bank_account_params)
    if @bank_account.save
      render json: @bank_account, status: :created
    else
      render json: @bank_account.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:user_id/bank_accounts/:id
  def update
    if @bank_account.update(bank_account_params)
      render json: @bank_account, status: :ok
    else
      render json: @bank_account.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/bank_accounts/:id
  def destroy
    if @bank_account.destroy
      render json: { message: 'Bank account successfully deleted.' }, status: :ok
    else
      render json: @bank_account.errors, status: :unprocessable_entity
    end
  end

  # GET /users/:user_id/bank_accounts/export
  def export
    @bank_accounts = @user.bank_accounts
    filename = "BankAccounts_#{Time.now.strftime('%Y%m%d%H%M%S')}.xlsx"
    workbook = WriteXLSX.new(filename)
    worksheet = workbook.add_worksheet

    headers = %w[AccountType AccountNumber Balance OwnerID InterestRate Currency OpeningDate Status BranchCode
                 OverdraftProtection]
    worksheet.write_row(0, 0, headers)

    @bank_accounts.each_with_index do |account, index|
      worksheet.write_row(index + 1, 0, [
                            account.account_type,
                            account.account_number,
                            account.balance,
                            account.owner_id,
                            account.interest_rate,
                            account.currency,
                            account.opening_date,
                            account.status,
                            account.branch_code,
                            account.overdraft_protection
                          ])
    end

    workbook.close # Ensure the workbook is closed properly

    # After closing the workbook, send the file
    send_file filename, filename:, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def set_bank_account
    @bank_account = @user.bank_accounts.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Bank account not found' }, status: :not_found
  end

  def bank_account_params
    params.require(:bank_account).permit(:account_type, :account_number, :balance, :owner_id, :interest_rate,
                                         :currency, :opening_date, :status, :branch_code, :overdraft_protection)
  end
end

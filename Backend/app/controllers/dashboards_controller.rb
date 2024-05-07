# frozen_string_literal: true

class DashboardsController < ApplicationController
  before_action :set_user

  # GET /users/:user_id/dashboard
  def show
    @dashboard = Dashboard.new(@user)
    render json: {
      net_worth: @dashboard.net_worth,
      total_bank_balance: @dashboard.total_bank_balance,
      total_expenses: @dashboard.total_expenses,
      total_transcations: @dashboard.total_transcations,
      total_debt: @dashboard.total_debt,
      total_savings: @dashboard.total_savings,
      financial_summary: @dashboard.financial_summary
    }
  end

  def export
    @dashboard = Dashboard.new(@user)
    filename = "Dashboard_#{Time.now.strftime('%Y%m%d%H%M%S')}.xlsx"
    workbook = WriteXLSX.new(filename)
    worksheet = workbook.add_worksheet

    headers = %w[NetWorth BankBalance Transactions Expenses Debt Savings]
    worksheet.write_row(0, 0, headers)

    # Write a single row with the required information from the dashboard
    worksheet.write_row(1, 0, [
                          @dashboard.net_worth,
                          @dashboard.total_bank_balance,
                          @dashboard.total_transcations,
                          @dashboard.total_expenses,
                          @dashboard.total_debt,
                          @dashboard.total_savings
                        ])

    workbook.close
    send_file filename, filename:, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  end

  private

  # Set the user from the user_id provided in the route
  def set_user
    @user = User.find(params[:user_id])
    # Add authorization check here if using a system like Pundit or ensure the user is the current user
  end
end

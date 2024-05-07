# frozen_string_literal: true

class ExpensesController < ApplicationController
  before_action :set_user
  before_action :set_expense, only: %i[update destroy]

  # GET /users/:user_id/expenses
  def index
    @expenses = @user.expenses.all
    render json: @expenses
  end

  # POST /users/:user_id/expenses
  def create
    @expense = @user.expenses.new(expense_params)
    if @expense.save
      render json: @expense, status: :created, location: user_expense_url(@user, @expense)
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/:user_id/expenses/:id
  def update
    if @expense.update(expense_params)
      render json: @expense
    else
      render json: @expense.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/expenses/:id
  def destroy
    @expense.destroy
    head :no_content
  end

  # GET /users/:user_id/expenses/export
  def export
    @expenses = @user.expenses
    filename = "Expenses_#{Time.now.strftime('%Y%m%d%H%M%S')}.xlsx"
    workbook = WriteXLSX.new(filename)
    worksheet = workbook.add_worksheet

    headers = ['Category', 'Vendor', 'Date', 'Amount', 'Purpose', 'Reimbursable']
    worksheet.write_row(0, 0, headers)

    @expenses.each_with_index do |expense, index|
      worksheet.write_row(index + 1, 0, [
                            expense.category,
                            expense.vendor,
                            expense.date.strftime('%Y-%m-%d'),
                            expense.amount,
                            expense.purpose,
                            expense.reimbursable ? 'Yes' : 'No'
                          ])
    end

    workbook.close # Ensure the workbook is closed properly

    # After closing the workbook, send the file
    send_file filename, filename: filename, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  end

  private

  # Finds the user from the user_id provided in the URL
  def set_user
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  # Finds the expense based on the expense ID and ensures it belongs to the correct user
  def set_expense
    @expense = @user.expenses.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Expense not found' }, status: :not_found
  end

  # Strong parameters to prevent unwanted attributes being mass assigned
  def expense_params
    params.require(:expense).permit(:category, :vendor, :date, :amount, :purpose, :receipt, :reimbursable)
  end
end

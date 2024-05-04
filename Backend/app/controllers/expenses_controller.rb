# frozen_string_literal: true

class ExpensesController < ApplicationController
  before_action :set_user, only: %i[index create update destroy]
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

# frozen_string_literal: true

class BudgetsController < ApplicationController
  before_action :set_user
  before_action :set_budget, only: %i[show destroy]
  before_action :check_user, only: %i[show destroy]

  # GET /users/:user_id/budgets
  def index
    @budgets = @user.budgets
    render json: @budgets
  end

  # GET /users/:user_id/budgets/:id
  def show
    render json: @budget
  end

  # POST /users/:user_id/budgets
  def create
    @budget = @user.budgets.new(budget_params)
    if @budget.save
      render json: @budget, status: :created, location: user_budget_path(@user, @budget)
    else
      render json: @budget.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/budgets/:id
  def destroy
    @budget.destroy
    render json: { message: 'Budget was successfully destroyed.' }
  end

  private

  # Set the user from the user_id provided
  def set_user
    @user = User.find(params[:user_id])
  end

  # Set the budget using the user
  def set_budget
    @budget = @user.budgets.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def budget_params
    params.require(:budget).permit(:name, :savings_goal, :total_income, :total_expenses, :status)
  end

  # Check if current user is authorized to access the budget
  def check_user
    render json: { error: 'Unauthorized' }, status: :unauthorized unless @budget.user == current_user
  end
end

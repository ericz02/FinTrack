# frozen_string_literal: true

class DebtsController < ApplicationController
  before_action :set_user
  before_action :set_debt, only: %i[show destroy]

  # GET /users/:user_id/debts/:id
  def show
    render json: @debt
  end

  # GET /users/:user_id/debts/
  def index
    @debt = @user.debts
    render json: @debt
  end

  # POST /users/:user_id/debts
  def create
    @debt = @user.debts.new(debt_params)
    if @debt.save
      render json: @debt, status: :created, location: user_debt_url(@user, @debt)
    else
      render json: @debt.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/:user_id/debts/:id
  def destroy
    @debt.destroy
    render json: { message: 'Debt successfully deleted' }, status: :ok
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'User not found' }, status: :not_found
  end

  def set_debt
    @debt = @user.debts.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Debt not found' }, status: :not_found
  end

  def debt_params
    params.require(:debt).permit(:amount, :creditor, :debtor)
  end
end

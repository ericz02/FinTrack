class DashboardsController < ApplicationController
  before_action :set_user
  
  # GET /users/:user_id/dashboard
  def show
    @dashboard = Dashboard.new(@user)
    render json: {
      net_worth: @dashboard.net_worth,
      total_balance: @dashboard.total_balance,
      total_expenses: @dashboard.total_expenses,
      financial_summary: @dashboard.financial_summary
    }
  end

  private

  # Set the user from the user_id provided in the route
  def set_user
    @user = User.find(params[:user_id])
    # Add authorization check here if using a system like Pundit or ensure the user is the current user
   
  end
end

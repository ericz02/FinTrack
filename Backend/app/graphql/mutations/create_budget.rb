# app/graphql/mutations/create_budget.rb
module Mutations
  class CreateBudget < BaseMutation
    # define arguments here
    argument :user_id, ID, required: true
    argument :name, String, required: true
    argument :savings_goal, Float, required: true
    argument :total_income, Float, required: true
    argument :total_expenses, Float, required: true
    argument :status, String, required: true

    # define return type here
    type Types::BudgetType

    def resolve(user_id:, name:, savings_goal:, total_income:, total_expenses:, status:)
      user = User.find(user_id)
      budget = user.budgets.build(
        name: name,
        savings_goal: savings_goal,
        total_income: total_income,
        total_expenses: total_expenses,
        status: status
      )
      if budget.save
        budget
      else
        GraphQL::ExecutionError.new("Failed to create budget: #{budget.errors.full_messages.join(', ')}")
      end
    end
  end
end

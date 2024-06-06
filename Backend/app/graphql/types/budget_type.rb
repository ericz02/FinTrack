# app/graphql/types/budget_type.rb
module Types
  class BudgetType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :savings_goal, Float, null: false  # Add savings_goal
    field :total_income, Float, null: false  # Add total_income
    field :total_expenses, Float, null: false  # Add total_expenses
    field :status, String, null: false  # Add status
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end

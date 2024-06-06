module Types
  class QueryType < Types::BaseObject
    field :users, [Types::UserType], null: false

    def users
      User.all
    end

    field :user, Types::UserType, null: false do
      argument :id, ID, required: true
    end

    def user(id:)
      User.find(id)
    end

    # Add the budgets field
    field :budgets, [Types::BudgetType], null: false

    def budgets
      Budget.all
    end
  end
end

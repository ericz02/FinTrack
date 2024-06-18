module Types
  class QueryType < Types::BaseObject
    # Existing fields
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

    field :budgets, [Types::BudgetType], null: false

    def budgets
      Budget.all
    end

    # New fields for transactions
    field :transactions, [Types::TransactionType], null: false

    def transactions
      Transaction.all
    end

    field :transaction, Types::TransactionType, null: false do
      argument :id, ID, required: true
    end

    def transaction(id:)
      Transaction.find(id)
    end
  end
end

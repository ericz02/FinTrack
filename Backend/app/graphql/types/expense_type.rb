module Types
  class ExpenseType < Types::BaseObject
    field :id, ID, null: false
    field :category, String, null: false
    field :vendor, String, null: false
    field :date, GraphQL::Types::ISO8601DateTime, null: false
    field :amount, Float, null: false
    field :purpose, String, null: false
    field :receipt, String, null: true
    field :reimbursable, Boolean, null: false
    field :user, Types::UserType, null: false

    # Ensure the `user` field resolves to a UserType object
    def user
      object.user
    end

    def expenses
      object.user.expenses
    end
  end
end

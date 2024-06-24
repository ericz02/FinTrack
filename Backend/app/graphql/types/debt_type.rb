module Types
  class DebtType < Types::BaseObject
    field :id, ID, null: false
    field :amount, Float, null: false
    field :creditor, String, null: false
    field :debtor, String, null: false
    field :description, String, null: true
    field :due_date, GraphQL::Types::ISO8601Date, null: true
    field :status, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false

    # Ensure the `user` field resolves to a UserType object
    def user
      object.user
    end

    def debts
      object.user.debts
    end
  end
end

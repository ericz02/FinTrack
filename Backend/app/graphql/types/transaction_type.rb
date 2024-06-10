module Types
  class TransactionType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :amount, Float, null: false
    field :date, GraphQL::Types::ISO8601DateTime, null: false
    field :description, String, null: true
    field :transaction_type, String, null: false
    field :merchant, String, null: true
    field :user, Types::UserType, null: false

    # Ensure the `user` field resolves to a UserType object
    def user
      object.user
    end

    # This method should return the list of transactions for the user
    def transactions
      # Assuming you have a method to fetch transactions for the user
      # Replace this with your actual logic to fetch transactions
      object.user.transactions
    end
  end
end

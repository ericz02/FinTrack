module Mutations
  class CreateTransaction < Mutations::BaseMutation
    argument :name, String, required: true
    argument :amount, Float, required: true
    argument :date, GraphQL::Types::ISO8601DateTime, required: true
    argument :description, String, required: false
    argument :transaction_type, String, required: true
    argument :merchant, String, required: false
    argument :user_id, ID, required: true

    field :transaction, Types::TransactionType, null: false

    def resolve(name:, amount:, date:, description:, transaction_type:, merchant:, user_id:)
      user = User.find(user_id)
      transaction = user.transactions.create!(
        name: name,
        amount: amount,
        date: date,
        description: description,
        transaction_type: transaction_type,
        merchant: merchant
      )
      { transaction: transaction }
    end
  end
end

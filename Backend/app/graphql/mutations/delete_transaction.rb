module Mutations
  class DeleteTransaction < Mutations::BaseMutation
    argument :user_id, ID, required: true
    argument :id, ID, required: true

    field :message, String, null: false
    field :errors, [String], null: true

    def resolve(user_id:, id:)
      user = User.find(user_id)
      transaction = user.transactions.find(id)

      if transaction.destroy
        { message: 'Transaction successfully deleted.', errors: [] }
      else
        { message: nil, errors: transaction.errors.full_messages }
      end
    rescue ActiveRecord::RecordNotFound => e
      { message: nil, errors: [e.message] }
    end
  end
end

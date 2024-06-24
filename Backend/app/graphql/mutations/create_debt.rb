module Mutations
  class CreateDebt < BaseMutation
    argument :user_id, ID, required: true
    argument :amount, Float, required: true
    argument :creditor, String, required: true
    argument :debtor, String, required: true
    argument :description, String, required: false
    argument :due_date, String, required: false
    argument :status, String, required: false

    field :debt, Types::DebtType, null: false
    field :errors, [String], null: false

    def resolve(user_id:, amount:, creditor:, debtor:, description:, due_date:, status:)
      user = User.find(user_id)
      debt = user.debts.build(
        amount: amount,
        creditor: creditor,
        debtor: debtor,
        description: description,
        due_date: due_date,
        status: status
      )

      if debt.save
        {
          debt: debt,
          errors: []
        }
      else
        {
          debt: nil,
          errors: debt.errors.full_messages
        }
      end
    end
  end
end

module Mutations
  class CreateExpense < BaseMutation
    argument :category, String, required: true
    argument :vendor, String, required: true
    argument :date, GraphQL::Types::ISO8601Date, required: true
    argument :amount, Float, required: true
    argument :purpose, String, required: true
    argument :reimbursable, Boolean, required: false
    argument :user_id, ID, required: true
    argument :receipt, String, required: false  # Add this line for the receipt

    field :expense, Types::ExpenseType, null: false

    def resolve(category:, vendor:, date:, amount:, purpose:, reimbursable:, user_id:, receipt: nil)
      user = User.find(user_id)
      expense = user.expenses.create!(
        category: category,
        vendor: vendor,
        date: date,
        amount: amount,
        purpose: purpose,
        reimbursable: reimbursable,
        receipt: receipt  # Include receipt in the creation
      )
      { expense: expense }
    end
  end
end

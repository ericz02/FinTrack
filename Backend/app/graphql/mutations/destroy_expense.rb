module Mutations
  class DestroyExpense < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :user_id, ID, required: true

    field :success, Boolean, null: false
    field :message, String, null: true

    def resolve(id:, user_id:)
      expense = Expense.find_by(id: id, user_id: user_id)
      if expense.destroy
        { success: true, message: 'Expense successfully destroyed.' }
      else
        { success: false, message: 'Failed to destroy expense.' }
      end
    rescue ActiveRecord::RecordNotFound
      { success: false, message: 'Expense not found.' }
    end
  end
end

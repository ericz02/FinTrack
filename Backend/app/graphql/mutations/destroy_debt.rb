module Mutations
  class DestroyDebt < BaseMutation
    argument :id, ID, required: true

    field :success, Boolean, null: false

    def resolve(id:)
      debt = Debt.find(id)
      debt.destroy
      { success: debt.destroyed? }
    rescue ActiveRecord::RecordNotFound => e
      GraphQL::ExecutionError.new("Debt with ID #{id} not found")
    end
  end
end

# app/graphql/mutations/destroy_budget.rb
module Mutations
  class DestroyBudget < BaseMutation
    argument :id, ID, required: true

    type Types::BudgetType

    def resolve(id:)
      budget = Budget.find_by(id: id)
      if budget
        budget.destroy
        budget
      else
        raise GraphQL::ExecutionError.new("Budget with ID #{id} not found")
      end
    end
  end
end

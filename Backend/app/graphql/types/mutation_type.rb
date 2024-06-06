module Types
  class MutationType < Types::BaseObject

    # Mutations for User
    field :create_user, mutation: Mutations::CreateUser
    field :update_user, mutation: Mutations::UpdateUser

    # Mutations for BankAccount
    field :create_bank_account, mutation: Mutations::CreateBankAccount
    field :update_bank_account, mutation: Mutations::UpdateBankAccount
    field :destroy_bank_account, mutation: Mutations::DestroyBankAccount

    # Mutations for Budget
    field :create_budget, mutation: Mutations::CreateBudget
    field :destroy_budget, mutation: Mutations::DestroyBudget
  end
end

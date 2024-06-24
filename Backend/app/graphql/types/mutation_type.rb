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

    # Mutations for Transaction
    field :create_transaction, mutation: Mutations::CreateTransaction
    field :delete_transaction, mutation: Mutations::DeleteTransaction

    # Mutations for Expense
    field :create_expense, mutation: Mutations::CreateExpense
    field :destroy_expense, mutation: Mutations::DestroyExpense

    # Mutations for Debt
    field :create_debt, mutation: Mutations::CreateDebt
    field :destroy_debt, mutation: Mutations::DestroyDebt
  end
end

module Mutations
  class DestroyBankAccount < BaseMutation
    argument :id, ID, required: true

    field :bank_account, Types::BankAccountType, null: true
    field :errors, [String], null: false

    def resolve(id:)
      bank_account = BankAccount.find(id)
      if bank_account.destroy
        { bank_account: bank_account, errors: [] }
      else
        { bank_account: nil, errors: bank_account.errors.full_messages }
      end
    end
  end
end

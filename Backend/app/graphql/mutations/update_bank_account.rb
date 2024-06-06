module Mutations
  class UpdateBankAccount < BaseMutation
    argument :id, ID, required: true
    argument :account_type, String, required: false
    argument :account_number, String, required: false
    argument :balance, Float, required: false
    argument :interest_rate, Float, required: false
    argument :currency, String, required: false
    argument :opening_date, String, required: false
    argument :status, String, required: false
    argument :branch_code, String, required: false
    argument :overdraft_protection, String, required: false

    field :bank_account, Types::BankAccountType, null: true
    field :errors, [String], null: false

    def resolve(id:, **attributes)
      bank_account = BankAccount.find(id)
      if bank_account.update(attributes)
        { bank_account: bank_account, errors: [] }
      else
        { bank_account: nil, errors: bank_account.errors.full_messages }
      end
    end
  end
end

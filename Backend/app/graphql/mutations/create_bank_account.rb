module Mutations
  class CreateBankAccount < BaseMutation
    argument :user_id, ID, required: true
    argument :account_type, String, required: true
    argument :account_number, String, required: true
    argument :balance, Float, required: true
    argument :interest_rate, Float, required: false
    argument :currency, String, required: true
    argument :opening_date, String, required: true
    argument :status, String, required: true
    argument :branch_code, String, required: true
    argument :overdraft_protection, String, required: true

    field :bank_account, Types::BankAccountType, null: true
    field :errors, [String], null: false

    def resolve(user_id:, account_type:, account_number:, balance:, interest_rate:, currency:, opening_date:, status:, branch_code:, overdraft_protection:)
      user = User.find(user_id)
      bank_account = user.bank_accounts.new(
        account_type: account_type,
        account_number: account_number,
        balance: balance,
        interest_rate: interest_rate,
        currency: currency,
        opening_date: opening_date,
        status: status,
        branch_code: branch_code,
        overdraft_protection: overdraft_protection
      )
      if bank_account.save
        { bank_account: bank_account, errors: [] }
      else
        { bank_account: nil, errors: bank_account.errors.full_messages }
      end
    end
  end
end

module Types
  class UserType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :password, String, null: false
    field :bank_accounts, [BankAccountType], null: true
    field :transactions, [TransactionType], null: true

    def bank_accounts
      object.bank_accounts
    end

    def transactions
      object.transactions
    end
  end
end

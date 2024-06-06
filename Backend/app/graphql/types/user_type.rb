module Types
  class UserType < BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :password, String, null: false
    field :bank_accounts, [BankAccountType], null: true

    def bank_accounts
      object.bank_accounts
    end
  end
end

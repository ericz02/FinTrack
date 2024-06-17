module Types
  class BankAccountType < BaseObject
    field :id, ID, null: false
    field :account_type, String, null: false
    field :account_number, String, null: false
    field :balance, Float, null: false
    field :interest_rate, Float, null: true
    field :currency, String, null: true
    field :opening_date, GraphQL::Types::ISO8601DateTime, null: true
    field :status, String, null: true
    field :branch_code, String, null: true
    field :overdraft_protection, Boolean, null: true
    field :user, Types::UserType, null: false  # Assuming UserType exists
    field :bank_account, Types::BankAccountType, null: false  # Assuming BankAccountType exists

    # Define a resolver method for the 'user' field
    def user
      object.user
    end

    # Define a resolver method for the 'bank_account' field
    def bank_account
      object.user.bank_account
    end
  end
end

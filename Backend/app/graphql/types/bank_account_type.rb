module Types
  class BankAccountType < BaseObject
    field :id, ID, null: false
    field :account_type, String, null: false
    field :account_number, String, null: false
    field :balance, Float, null: false
    field :interest_rate, Float, null: false
    field :currency, String, null: false
    field :opening_date, GraphQL::Types::ISO8601DateTime, null: false
    field :status, String, null: false
    field :branch_code, String, null: false
    field :overdraft_protection, Boolean, null: false
  end
end

# frozen_string_literal: true

class CreateBankAccounts < ActiveRecord::Migration[7.1]
  def change
    create_table :bank_accounts do |t|
      t.string :account_type
      t.string :account_number
      t.decimal :balance
      t.decimal :interest_rate
      t.string :currency
      t.date :opening_date
      t.string :status
      t.string :branch_code
      t.boolean :overdraft_protection
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

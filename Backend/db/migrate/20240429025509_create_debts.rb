# frozen_string_literal: true

class CreateDebts < ActiveRecord::Migration[7.1]
  def change
    create_table :debts do |t|
      t.decimal :amount, precision: 10, scale: 2
      t.string :creditor
      t.string :debtor
      t.date :due_date
      t.string :status, default: 'Pending'
      t.decimal :interest_rate, precision: 5, scale: 2
      t.decimal :minimum_payment, precision: 10, scale: 2
      t.string :frequency_of_payments
      t.date :last_payment_date
      t.decimal :total_paid, precision: 10, scale: 2, default: 0.0
      t.text :description
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

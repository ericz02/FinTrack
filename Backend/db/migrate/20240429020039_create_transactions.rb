# frozen_string_literal: true

class CreateTransactions < ActiveRecord::Migration[7.1]
  def change
    create_table :transactions do |t|
      t.string :name
      t.decimal :amount
      t.datetime :date
      t.text :description
      t.string :type
      t.string :merchant
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

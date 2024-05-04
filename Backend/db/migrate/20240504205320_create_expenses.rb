# frozen_string_literal: true

class CreateExpenses < ActiveRecord::Migration[7.1]
  def change
    create_table :expenses do |t|
      t.string :category
      t.string :vendor
      t.date :date
      t.decimal :amount
      t.text :purpose
      t.string :receipt
      t.boolean :reimbursable

      t.timestamps
    end
  end
end

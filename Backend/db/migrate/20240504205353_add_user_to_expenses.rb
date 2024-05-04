# frozen_string_literal: true

class AddUserToExpenses < ActiveRecord::Migration[7.1]
  def change
    add_reference :expenses, :user, null: false, foreign_key: true
  end
end

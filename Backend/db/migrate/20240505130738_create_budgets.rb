# frozen_string_literal: true

class CreateBudgets < ActiveRecord::Migration[7.1]
  def change
    create_table :budgets, &:timestamps
  end
end

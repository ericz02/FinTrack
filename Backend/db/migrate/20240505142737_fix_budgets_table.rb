# frozen_string_literal: true

class FixBudgetsTable < ActiveRecord::Migration[7.1]
  def change
    add_column :budgets, :name, :string unless column_exists?(:budgets, :name)
    add_column :budgets, :savings_goal, :decimal, precision: 10, scale: 2 unless column_exists?(:budgets,
                                                                                                :savings_goal)
    add_column :budgets, :total_income, :decimal, precision: 10, scale: 2 unless column_exists?(:budgets,
                                                                                                :total_income)
    add_column :budgets, :total_expenses, :decimal, precision: 10, scale: 2 unless column_exists?(:budgets,
                                                                                                  :total_expenses)
    add_column :budgets, :status, :string, default: 'upcoming' unless column_exists?(:budgets, :status)
    add_reference :budgets, :user, foreign_key: true unless column_exists?(:budgets, :user_id)
  end
end

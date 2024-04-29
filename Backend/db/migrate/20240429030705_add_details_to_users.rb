# frozen_string_literal: true

class AddDetailsToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :address, :string
    add_column :users, :phone_number, :string
    add_column :users, :date_of_birth, :date
    add_column :users, :gender, :string
    add_column :users, :income_yearly, :decimal, precision: 10, scale: 2
    add_column :users, :income_monthly, :decimal, precision: 10, scale: 2
    add_column :users, :income_weekly, :decimal, precision: 10, scale: 2
  end
end

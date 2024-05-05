# frozen_string_literal: true

class BankAccount < ApplicationRecord
  belongs_to :user
  validates :account_type, :balance, presence: true
end

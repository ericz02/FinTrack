# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true

  has_many :transactions, dependent: :destroy
  has_many :debts, dependent: :destroy
  has_many :expenses, dependent: :destroy
  has_many :bank_accounts, dependent: :destroy
  has_many :budgets, dependent: :destroy
end

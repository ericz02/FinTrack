# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  validates :name, presence: true
  has_many :transactions, dependent: :destroy
  has_many :debts, dependent: :destroy
end

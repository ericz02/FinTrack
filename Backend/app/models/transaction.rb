# frozen_string_literal: true

class Transaction < ApplicationRecord
  belongs_to :user
  validates :name, :amount, :date, presence: true
end

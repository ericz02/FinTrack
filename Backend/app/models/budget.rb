# frozen_string_literal: true

class Budget < ApplicationRecord
  # Associations
  belongs_to :user
  has_many :expenses

  # Validations
  validates :name, presence: true
  validates :savings_goal, numericality: true
  validates :total_income, numericality: true, allow_nil: true
  validates :total_expenses, numericality: true, allow_nil: true
  validates :status, inclusion: { in: %w[active completed upcoming] }
end

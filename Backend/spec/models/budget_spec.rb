require 'rails_helper'

RSpec.describe Budget, type: :model do
  let(:user) { create(:user) }

  it "is valid with valid attributes" do
    budget = build(:budget, user: user)
    expect(budget).to be_valid
  end

  # it "is not valid with a negative savings goal" do
  #   budget = build(:budget, :with_negative_savings_goal, user: user)
  #   expect(budget).to_not be_valid
  # end

  it "is valid with total income" do
    budget = build(:budget, user: user, total_income: 2000)
    expect(budget).to be_valid
  end

  it "is valid without total income" do
    budget = build(:budget, user: user, total_income: nil)
    expect(budget).to be_valid
  end

  # it "is not valid with negative total expenses" do
  #   budget = build(:budget, :with_negative_total_expenses, user: user)
  #   expect(budget).to_not be_valid
  # end

  it "is valid with valid status" do
    budget = build(:budget, user: user, status: "active")
    expect(budget).to be_valid
  end

  it "is not valid with invalid status" do
    budget = build(:budget, user: user, status: "invalid")
    expect(budget).to_not be_valid
  end
end

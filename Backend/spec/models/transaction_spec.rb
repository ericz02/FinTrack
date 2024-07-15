require 'rails_helper'

RSpec.describe Transaction, type: :model do
  let(:user) { create(:user) }

  it "is valid with valid attributes" do
    transaction = build(:transaction, user: user, name: "Salary", amount: 1000.00, date: Date.today)
    expect(transaction).to be_valid
  end

  it "is not valid without a name" do
    transaction = build(:transaction, user: user, name: nil)
    expect(transaction).to_not be_valid
  end

  it "is not valid without an amount" do
    transaction = build(:transaction, user: user, amount: nil)
    expect(transaction).to_not be_valid
  end

  it "is not valid without a date" do
    transaction = build(:transaction, user: user, date: nil)
    expect(transaction).to_not be_valid
  end
end

require 'rails_helper'

RSpec.describe Expense, type: :model do
  it "belongs to a user" do
    association = described_class.reflect_on_association(:user)
    expect(association.macro).to eq :belongs_to
  end

  it "is valid with valid attributes" do
    user = create(:user)
    expense = build(:expense, user: user)
    expect(expense).to be_valid
  end

  it "is not valid without a user" do
    expense = build(:expense, user: nil)
    expect(expense).to_not be_valid
  end
end

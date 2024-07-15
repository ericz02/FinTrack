require 'rails_helper'

RSpec.describe Debt, type: :model do
  it "belongs to a user" do
    association = described_class.reflect_on_association(:user)
    expect(association.macro).to eq :belongs_to
  end

  it "is valid with valid attributes" do
    user = create(:user) 
    debt = build(:debt, user: user)
    expect(debt).to be_valid
  end

  it "is not valid without a user" do
    debt = build(:debt, user: nil)
    expect(debt).to_not be_valid
  end
end

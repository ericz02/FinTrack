# spec/models/bank_account_spec.rb
require 'rails_helper'

RSpec.describe BankAccount, type: :model do
  it "belongs to a user" do
    association = described_class.reflect_on_association(:user)
    expect(association.macro).to eq :belongs_to
  end

  it "is valid with valid attributes" do
    user = User.create(name: "John", email: "john@gmail.com", password: "123")
    bank_account = build(:bank_account, user: user)
    expect(bank_account).to be_valid
  end

  it "is not valid without an account_type" do
    user = User.create(name: "John", email: "john@gmail.com", password: "123")
    bank_account = build(:bank_account, user: user, account_type: nil)
    expect(bank_account).to_not be_valid
  end

  it "is not valid without a balance" do
    user = User.create(name: "John", email: "john@gmail.com", password: "123")
    bank_account = build(:bank_account, user: user, balance: nil)
    expect(bank_account).to_not be_valid
  end

  it "is not valid without a user" do
    bank_account = build(:bank_account, user: nil)
    expect(bank_account).to_not be_valid
  end
end

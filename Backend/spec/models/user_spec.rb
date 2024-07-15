require 'rails_helper'

RSpec.describe User, type: :model do
  it "is valid with valid attributes" do
    user = build(:user, name: "John", email: "john@gmail.com", password: "123")
    expect(user).to be_valid
  end

  it "is not valid without a name" do
    user = build(:user, name: nil)
    expect(user).to_not be_valid
  end

  it "is not valid without an email" do
    user = build(:user, email: nil)
    expect(user).to_not be_valid
  end

  it "is not valid with a duplicate email address" do
    create(:user, email: "john@gmail.com")
    user = build(:user, email: "john@gmail.com")
    expect(user).to_not be_valid
  end

  it "is not valid without a password" do
    user = build(:user, password: nil)
    expect(user).to_not be_valid
  end
end

FactoryBot.define do
  factory :transaction do
    association :user
    sequence(:name) { |n| "Transaction #{n}" }
    amount { 1000.00 }
    date { Date.today }
  end
end

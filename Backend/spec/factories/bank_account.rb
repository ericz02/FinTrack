FactoryBot.define do
  factory :bank_account do
    association :user
    sequence(:account_type) { |n| "Account #{n}" }
    sequence(:balance) { |n| n * 100.0 } 
  end
end

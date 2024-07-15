# spec/factories/budgets.rb
FactoryBot.define do
  factory :budget do
    association :user
    sequence(:name) { |n| "Budget #{n}" }
    savings_goal { 1000 }
    total_income { 5000 }
    total_expenses { 2000 }
    status { "active" }

    trait :with_negative_savings_goal do
      savings_goal { -100 }
    end

    trait :with_negative_total_expenses do
      total_expenses { -500 }
    end
  end
end

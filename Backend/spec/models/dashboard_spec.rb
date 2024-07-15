require 'rails_helper'

RSpec.describe Dashboard do
  let(:user) { create(:user) }
  let(:dashboard) { Dashboard.new(user) }

  describe "#net_worth" do
    it "calculates net worth correctly" do
      create(:bank_account, user: user, balance: 5000.0)
      create(:transaction, user: user, amount: 1000.0)
      create(:expense, user: user, amount: 500.0)
      create(:debt, user: user, amount: 200.0)

      expect(dashboard.net_worth).to eq(5000.0 - 1000.0 - 500.0 - 200.0)
    end
  end

  # describe "#total_transactions" do
  #   it "sums up all user's transactions" do
  #     create(:transaction, user: user, amount: 100.0)
  #     create(:transaction, user: user, amount: 200.0)

  #     expect(dashboard.total_transactions).to eq(100.0 + 200.0)
  #   end
  # end

  describe "#total_bank_balance" do
    it "sums up all user's bank account balances" do
      create(:bank_account, user: user, balance: 500.0)
      create(:bank_account, user: user, balance: 700.0)

      expect(dashboard.total_bank_balance).to eq(500.0 + 700.0)
    end
  end

  describe "#total_expenses" do
    it "sums up all user's expenses" do
      create(:expense, user: user, amount: 50.0)
      create(:expense, user: user, amount: 150.0)

      expect(dashboard.total_expenses).to eq(50.0 + 150.0)
    end
  end

  describe "#total_debt" do
    it "sums up all user's debts" do
      create(:debt, user: user, amount: 100.0)
      create(:debt, user: user, amount: 200.0)

      expect(dashboard.total_debt).to eq(100.0 + 200.0)
    end
  end

  describe "#total_savings" do
    it "sums up all user's savings goals from budgets" do
      create(:budget, user: user, savings_goal: 500.0)
      create(:budget, user: user, savings_goal: 1000.0)

      expect(dashboard.total_savings).to eq(500.0 + 1000.0)
    end
  end

  describe "#financial_summary" do
    it "returns a hash of all financial entities" do
      bank_account = create(:bank_account, user: user)
      expense = create(:expense, user: user)
      budget = create(:budget, user: user)
      debt = create(:debt, user: user)
      transaction = create(:transaction, user: user)

      summary = dashboard.financial_summary
      expect(summary[:bank_accounts]).to eq([bank_account])
      expect(summary[:expenses]).to eq([expense])
      expect(summary[:budgets]).to eq([budget])
      expect(summary[:debts]).to eq([debt])
      expect(summary[:transactions]).to eq([transaction])
    end
  end
end

# frozen_string_literal: true

class Dashboard
  attr_reader :user

  def initialize(user)
    @user = user
  end

  # Calculate net worth by subtracting total expenses from total bank account balance
  def net_worth
    total_bank_balance - total_expenses
  end

  # Sum of all transcations from user's bank accounts
  def total_transcations
    user.transactions.sum(:amount)
  end

  # Sum of all balances from user's bank accounts
  def total_bank_balance
    user.bank_accounts.sum(:balance)
  end

  # Sum of all user's expenses
  def total_expenses
    user.expenses.sum(:amount)
  end

  # Sum of all debt's expenses
  def total_debt
    user.debts.sum(:amount)
  end

  # Sum of all budgets
  def total_savings
    user.budgets.sum(:savings_goal)
  end

  # List of all financial entities
  def financial_summary
    {
      bank_accounts: user.bank_accounts,
      expenses: user.expenses,
      budgets: user.budgets,
      debts: user.debts,
      transactions: user.transactions
    }
  end
end

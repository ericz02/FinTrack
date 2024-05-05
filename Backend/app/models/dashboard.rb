

class Dashboard
  attr_reader :user

  def initialize(user)
    @user = user
  end

  # Calculate net worth by subtracting total expenses from total bank account balance
  def net_worth
    total_balance - total_expenses
  end

  # Sum of all balances from user's bank accounts
  def total_balance
    user.bank_accounts.sum(:balance)
  end

  # Sum of all user's expenses
  def total_expenses
    user.expenses.sum(:amount)
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

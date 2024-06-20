require 'rails_helper'

RSpec.describe 'Mutations::DestroyExpense', type: :request do
  describe 'destroyExpense' do
    it 'destroys an existing expense' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      expense = Expense.create!(
        category: "Food",
        vendor: "Grocery Store",
        date: "2024-06-20",
        amount: 50.00,
        purpose: "Weekly grocery shopping",
        reimbursable: false,
        user: user
      )

      # GraphQL query
      query = <<~GRAPHQL
        mutation DestroyExpense($input: DestroyExpenseInput!) {
          destroyExpense(input: $input) {
            message
          }
        }
      GRAPHQL

      # GraphQL variables
      variables = {
        input: {
          id: expense.id,
          userId: user.id  # Set the userId correctly
        }
      }

      # Send the request
      post '/graphql', params: { query: query, variables: variables }

      # Check the response
      json_response = JSON.parse(response.body)
      puts json_response # Debugging line to see the full response

      # Check for errors in the response
      if json_response['errors']
        puts "GraphQL Errors: #{json_response['errors']}"
      else
        expect(json_response['data']['destroyExpense']['message']).to eq('Expense successfully destroyed.')
      end

      # Verify the expense is destroyed
      expect(Expense.find_by(id: expense.id)).to be_nil
    end
  end
end

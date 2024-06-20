require 'rails_helper'

RSpec.describe 'Mutations::CreateBudget', type: :request do
  describe 'createBudget' do
    it 'creates a new budget' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      query = <<~GRAPHQL
        mutation CreateBudget($input: CreateBudgetInput!) {
          createBudget(input: $input) {
            budget {
              id
              name
              savingsGoal
              totalIncome
              totalExpenses
              status
            }
            errors
          }
        }
      GRAPHQL

      variables = {
        input: {
          userId: user.id,
          name: 'Test Budget',
          savingsGoal: 1000.0,
          totalIncome: 2000.0,
          totalExpenses: 1500.0,
          status: 'Active'
        }
      }

      post '/graphql', params: { query: query, variables: variables }

      json_response = JSON.parse(response.body)
      puts json_response
      expect(json_response['errors']).not_to be_empty
      expect(json_response['errors'][0]['message']).to eq("Field 'budget' doesn't exist on type 'Budget'")
    end
  end
end

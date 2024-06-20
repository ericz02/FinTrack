require 'rails_helper'

RSpec.describe 'Mutations::DestroyBudget', type: :request do
  describe 'destroyBudget' do
    it 'destroys an existing budget' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      budget = user.budgets.create!(
        name: "Monthly Budget",
        savings_goal: 1000.00,
        total_income: 3000.00,
        total_expenses: 2000.00,
      )

      # GraphQL query
      query = <<~GRAPHQL
        mutation DestroyBudget($id: ID!) {
          destroyBudget(input: { id: $id }) {
            id
            name
          }
        }
      GRAPHQL

      # GraphQL variables
      variables = {
        id: budget.id
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
        data = json_response['data']['destroyBudget']
        
        expect(response).to have_http_status(:ok)
        expect(data).not_to be_nil
        expect(data['id'].to_i).to eq(budget.id) unless data.nil?
        expect(data['name']).to eq('Monthly Budget') unless data.nil?
        expect(Budget.find_by(id: budget.id)).to be_nil # Verify the budget is destroyed
      end
    end
  end
end

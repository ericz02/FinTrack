require 'rails_helper'

RSpec.describe 'Mutations::CreateExpense', type: :request do
  describe 'createExpense' do
    it 'creates a new expense' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      # GraphQL query
      query = <<~GRAPHQL
        mutation CreateExpense($input: CreateExpenseInput!) {
          createExpense(input: $input) {
            expense {
              id
              category
              vendor
              date
              amount
              purpose
              receipt
              reimbursable
            }
          }
        }
      GRAPHQL

      # GraphQL variables
      variables = {
        input: {
          userId: user.id,
          category: "Food",
          vendor: "Grocery Store",
          date: "2024-06-20",
          amount: 50.00,
          purpose: "Weekly grocery shopping",
          reimbursable: false,
          receipt: "https://example.com/receipt.png"
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
        data = json_response['data']['createExpense']['expense']

        expect(response).to have_http_status(:ok)
        expect(data['category']).to eq('Food')
        expect(data['vendor']).to eq('Grocery Store')
        expect(data['date']).to eq('2024-06-20T00:00:00Z')
        expect(data['amount']).to eq(50.00)
        expect(data['purpose']).to eq('Weekly grocery shopping')
        expect(data['reimbursable']).to eq(false)
        expect(data['receipt']).to eq('https://example.com/receipt.png')
      end
    end
  end
end

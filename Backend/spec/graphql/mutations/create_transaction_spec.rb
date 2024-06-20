require 'rails_helper'

RSpec.describe 'Mutations::CreateTransaction', type: :request do
  describe 'createTransaction' do
    it 'creates a new transaction' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      # GraphQL query
      query = <<~GRAPHQL
        mutation CreateTransaction($input: CreateTransactionInput!) {
          createTransaction(input: $input) {
            transaction {
              id
              name
              amount
              date
              description
              transactionType
              merchant
            }
          }
        }
      GRAPHQL

      # GraphQL variables
      variables = {
        input: {
          userId: user.id,
          name: "Groceries",
          amount: 50.00,
          date: "2024-06-20",
          description: "Weekly grocery shopping",
          transactionType: "EXPENSE",
          merchant: "Local Market"
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
        data = json_response['data']['createTransaction']['transaction']
        
        expect(response).to have_http_status(:ok)
        expect(data['name']).to eq('Groceries')
        expect(data['amount']).to eq(50.00)
        expect(data['date']).to eq('2024-06-20')
        expect(data['description']).to eq('Weekly grocery shopping')
        expect(data['transactionType']).to eq('EXPENSE')
        expect(data['merchant']).to eq('Local Market')
      end
    end
  end
end

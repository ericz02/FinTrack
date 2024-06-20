require 'rails_helper'

RSpec.describe 'Mutations::DestroyTransaction', type: :request do
  describe 'destroyTransaction' do
    it 'destroys an existing transaction' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      transaction = Transaction.create!(
        name: "Groceries",
        amount: 50.00,
        date: "2024-06-20",
        description: "Weekly grocery shopping",
        transaction_type: "EXPENSE",
        merchant: "Local Market",
        user: user
      )

      # GraphQL query
      query = <<~GRAPHQL
        mutation DeleteTransaction($input: DeleteTransactionInput!) {
          deleteTransaction(input: $input) {
            message
            errors
          }
        }
      GRAPHQL

      # GraphQL variables
      variables = {
        input: {
          userId: user.id, # Make sure user.id is not null
          id: transaction.id
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
        data = json_response['data']['deleteTransaction']
        
        expect(response).to have_http_status(:ok)
        expect(data['message']).to eq('Transaction successfully deleted.')
        expect(data['errors']).to be_empty
      end

      # Verify the transaction is destroyed
      expect(Transaction.find_by(id: transaction.id)).to be_nil
    end
  end
end

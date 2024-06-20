require 'rails_helper'

RSpec.describe 'Mutations::DestroyBankAccount', type: :request do
  describe 'destroyBankAccount' do
    it 'destroys an existing bank account' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      bank_account = user.bank_accounts.create!(
        account_type: 'Savings',
        account_number: '1234567890',
        balance: 1000.0,
        interest_rate: 0.05,
        currency: 'USD',
        opening_date: '2024-06-21',
        status: 'Active',
        branch_code: 'ABC123',
        overdraft_protection: 'Enabled'
      )

      # GraphQL query
      query = <<~GRAPHQL
        mutation DeleteBankAccount($id: ID!) {
          destroyBankAccount(input: { id: $id }) {
            clientMutationId
          }
        }
      GRAPHQL

      # GraphQL variables
      variables = {
        id: bank_account.id
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
        expect(response).to have_http_status(:ok)
        expect(json_response['data']['destroyBankAccount']).to_not be_nil
      end

      # Verify the bank account is destroyed
      expect(BankAccount.find_by(id: bank_account.id)).to be_nil
    end
  end
end

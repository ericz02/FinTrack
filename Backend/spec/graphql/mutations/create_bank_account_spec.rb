require 'rails_helper'

RSpec.describe 'Mutations::CreateBankAccount', type: :request do
  describe 'createBankAccount' do
    it 'creates a new bank account' do
      user = User.create!(
        email: 'john@example.com',
        password: 'password',
        name: 'John Doe'
      )

      query = <<~GQL
        mutation {
          createBankAccount(input: {
            userId: #{user.id},
            accountType: "Savings",
            accountNumber: "1234567890",
            balance: 1000.0,
            interestRate: 0.05,
            currency: "USD",
            openingDate: "2024-06-21",
            status: "Active",
            branchCode: "ABC123",
            overdraftProtection: "Enabled"
          }) {
            bankAccount {
              id
              accountType
              accountNumber
              balance
              interestRate
              currency
              openingDate
              status
              branchCode
              overdraftProtection
            }
            errors
          }
        }
      GQL

      post '/graphql', params: { query: query }

      json_response = JSON.parse(response.body)
      puts json_response # Debugging line to see the full response

      if json_response['errors']
        puts "GraphQL Errors: #{json_response['errors']}"
      else
        data = json_response['data']['createBankAccount']
        expect(response).to have_http_status(:ok)
        expect(data['errors']).to be_empty
        expect(data['bankAccount']['accountType']).to eq('Savings')
      end
    end
  end
end

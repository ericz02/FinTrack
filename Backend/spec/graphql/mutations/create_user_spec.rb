require 'rails_helper'

RSpec.describe 'Mutations::CreateUser', type: :request do
  describe 'createUser' do
    it 'creates a new user' do
      name = 'John Doe'
      email = 'john@gmail.com'
      password = '123'

      # GraphQL query
      query = <<~GRAPHQL
        mutation CreateUser($input: CreateUserInput!) {
          createUser(input: $input) {
            user {
              id
              name
              email
            }
          }
        }
      GRAPHQL

      # GraphQL variables
      variables = {
        input: {
          name: name,
          email: email,
          password: password
        }
      }

      # Send the request
      post '/graphql', params: { query: query, variables: variables }

      # Check the response
      json_response = JSON.parse(response.body)
      data = json_response['data']['createUser']['user']

      expect(response).to have_http_status(:ok)
      expect(data['name']).to eq(name)
      expect(data['email']).to eq(email)
    end
  end
end

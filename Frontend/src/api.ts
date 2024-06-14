import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'http://localhost:3000/graphql';
const client = new GraphQLClient(endpoint);

export const signupUser = async (name, email, password) => {
  const mutation = gql`
    mutation Signup($name: String!, $email: String!, $password: String!) {
      createUser(input: { name: $name, email: $email, password: $password }) {
        user {
          id
          name
          email
        }
        errors
      }
    }
  `;
  const variables = { name, email, password };
  const data = await client.request(mutation, variables);
  return data.createUser;
};

export const createBankAccount = async (input) => {
  const mutation = gql`
    mutation CreateBankAccount($input: CreateBankAccountInput!) {
      createBankAccount(input: $input) {
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
      }
    }
  `;
  const variables = { input };
  const data = await client.request(mutation, variables);
  return data.createBankAccount;
};

export const deleteBankAccount = async (bankAccountId) => {
  const mutation = gql`
    mutation DeleteBankAccount($bankAccountId: ID!) {
      deleteBankAccount(id: $bankAccountId)
    }
  `;
  const variables = { bankAccountId };
  const data = await client.request(mutation, variables);
  return data.deleteBankAccount;
};

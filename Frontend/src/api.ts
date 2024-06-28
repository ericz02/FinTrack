import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://fintrack-nygf.onrender.com/graphql'; 
const client = new GraphQLClient(endpoint);

interface SignupResponse {
  createUser: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    errors: string[];
  };
}

interface CreateBankAccountInput {
  accountType: string;
  accountNumber: string;
  balance: number;
  interestRate: number;
  currency: string;
  openingDate: string;
  status: string;
  branchCode: string;
  overdraftProtection: boolean;
}

interface CreateBankAccountResponse {
  createBankAccount: {
    bankAccount: {
      id: string;
      accountType: string;
      accountNumber: string;
      balance: number;
      interestRate: number;
      currency: string;
      openingDate: string;
      status: string;
      branchCode: string;
      overdraftProtection: boolean;
    };
  };
}

interface DeleteBankAccountResponse {
  deleteBankAccount: boolean;
}

export const signupUser = async (name: string, email: string, password: string): Promise<SignupResponse['createUser']> => {
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
  const data = await client.request<SignupResponse>(mutation, variables);
  return data.createUser;
};

export const createBankAccount = async (input: CreateBankAccountInput): Promise<CreateBankAccountResponse['createBankAccount']> => {
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
  const data = await client.request<CreateBankAccountResponse>(mutation, variables);
  return data.createBankAccount;
};

export const deleteBankAccount = async (bankAccountId: string): Promise<boolean> => {
  const mutation = gql`
    mutation DeleteBankAccount($bankAccountId: ID!) {
      deleteBankAccount(id: $bankAccountId)
    }
  `;
  const variables = { bankAccountId };
  const data = await client.request<DeleteBankAccountResponse>(mutation, variables);
  return data.deleteBankAccount;
};

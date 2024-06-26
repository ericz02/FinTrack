# frozen_string_literal: true

Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get 'up' => 'rails/health#show', as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  resources :users, only: %i[create index show update] do
    resources :transactions, only: %i[show create index destroy] do
      get 'export', on: :collection
    end
    resources :debts, only: %i[show create index destroy]
    resources :expenses, only: %i[create index show updat destroy] do
      get 'export', on: :collection
    end
    resources :bank_accounts, only: %i[create index show update destroy]
    resources :budgets, only: %i[show create index destroy]
    resource :dashboard, only: [:show] do
      get 'export', on: :collection
    end
  end

  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'
end

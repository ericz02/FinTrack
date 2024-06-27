Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
    root "welcome#index", via: [:get, :head, :options]
  else
    root to: 'home#index'
  end

  post "/graphql", to: "graphql#execute"
  
  get 'up' => 'rails/health#show', as: :rails_health_check

  resources :users, only: %i[create index show update] do
    resources :transactions, only: %i[show create index destroy] do
      get 'export', on: :collection
    end
    resources :debts, only: %i[show create index destroy]
    resources :expenses, only: %i[create index show update destroy] do
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

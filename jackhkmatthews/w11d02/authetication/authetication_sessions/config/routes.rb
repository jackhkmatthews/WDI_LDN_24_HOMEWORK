Rails.application.routes.draw do
  # get 'sessions/new'
  #
  # get 'sessions/create'
  #
  # get 'sessions/destroy'

  root "users#index"

  resources :users, only: [:index, :create]
  get "register", to: "users#new"

  resources :sessions, only: [:create]
  get 'login', to: "sessions#new"
  delete 'logout', to: "sessions#destroy"

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

Rails.application.routes.draw do
  root "statics#home"

  resources :employees
  resources :roles
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end

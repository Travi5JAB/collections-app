Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  devise_for :debtcollectors, controllers: { sessions: 'debtcollectors/sessions' , registrations: 'debtcollectors/registrations'}
  devise_scope :debtcollector do
    get 'allcollectors' => 'debtcollectors/registrations#all_collectors'
  end

  resources :accounts


  get '*path', to: 'pages#index', constraints: ->(request) { request.format.html? }
  root to: "pages#index"

end

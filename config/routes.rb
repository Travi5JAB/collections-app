Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :accounts
    patch 'payment/:payment/:id' => 'accounts#submit_payment'

  resources :addresses
    post 'addaddress/:address' => 'addresses#create_address'

  resources :comments
    post 'createcomment/:comment_string/:account_id' => 'comments#create_comment'

  devise_for :debtcollectors, controllers: { sessions: 'debtcollectors/sessions' , registrations: 'debtcollectors/registrations'}
  devise_scope :debtcollector do
    get 'allcollectors' => 'debtcollectors/registrations#all_collectors'
    get 'allcollectorsbyaccount' => 'debtcollectors/registrations#all_collectors_by_account'
    get 'onecollector/:id' => 'debtcollectors/sessions#show'
  end

  resources :debters

  resources :debtholders

  resources :phonenumbers
    post 'addphone/:phone' => 'phonenumbers#create_phone'



  get '*path', to: 'pages#index', constraints: ->(request) { request.format.html? }
  root to: "pages#index"

end

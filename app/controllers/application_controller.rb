class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_debtcollector!

  protected

  def configure_permitted_parameters
    @keys = [:first_name, :last_name, :username]
    devise_parameter_sanitizer.permit(:sign_up, keys: @keys)
    devise_parameter_sanitizer.permit(:account_update, keys: @keys)
  end
end

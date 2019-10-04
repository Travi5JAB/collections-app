# frozen_string_literal: true

class Debtcollectors::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  def create
    params[:debtcollector][:first_name].capitalize!
    params[:debtcollector][:last_name].capitalize!
    username_set
    super do |resource|
    end
  end

  def all_collectors
    render json: Debtcollector.all
  end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end

  def username_set
    p @first = params[:debtcollector][:first_name].split('')[0]
    p @second = params[:debtcollector][:last_name].split('')[0]
    p @number = rand(1..99)
    p @username = "#{@first}#{@second}#{@number}"
    if Debtcollector.where('username = ?', @username).blank?
      params[:debtcollector][:username] = @username
    else
      username_set
    end
  end
end

class AccountsController < ApplicationController
  def index
    render json: Account.all
  end

  def show
    @collector_id = Debtcollector.find(params[:id].to_i).id
    @account = Debter.where("debtcollector_id = ?", @collector_id).as_json(include: { accounts: {include: {debtholder: {} } }, phonenumbers: {}, addresses: {} })
    render json: @account
  end
end

class AccountsController < ApplicationController
  def index
    render json: Debter.all.as_json(include: { accounts: {include: {debtholder: {} } }, phonenumbers: {}, addresses: {} })
  end

  def show
    @collector_id = Debtcollector.find(params[:id].to_i).id
    @accounts = Debter.where("debtcollector_id = ?", @collector_id).as_json(include: { accounts: {include: {debtholder: {} } }, phonenumbers: {}, addresses: {} })
    render json: @accounts
  end

end

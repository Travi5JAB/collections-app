class AccountsController < ApplicationController
  def index
    render json: Account.all
  end

  def show
    @collector_id = Debtcollector.find(params[:id].to_i).id
    @accounts = Debter.where("debtcollector_id = ?", @collector_id).as_json(include: { accounts: {include: {debtholder: {} } }, phonenumbers: {}, addresses: {} })
    render json: @accounts
  end

  def submit_payment
    @account = Account.find(params[:id])
    @new_balance = @account.balance - params[:payment].to_i
    if @new_balance >= 0
      @account.update(:balance => @new_balance)
      Comment.create(:string => "Payment of $#{params[:payment]} balance is now $#{@new_balance}", :account_id => params[:id])
    end
  end
end

class PaymentsController < ApplicationController
  def submit_payment
    @account = Account.find(params[:id])
    @new_balance = @account.balance - params[:payment].to_i
    if @new_balance >= 0
      @account.update(:balance => @new_balance)
      Comment.create(:string => "Payment of $#{params[:payment]} balance is now $#{@new_balance}", :account_id => params[:id])
      Payment.create(:account_id => params[:id], :payment_amount => params[:payment].to_i)
    end
  end

  def show
    @payments = []
    Debter.find_each do |debter|
      if debter.debtcollector_id == params[:id].to_i

        Account.find_each do |account|
          if account.debter_id == debter.id

            Payment.find_each do |payment|
              if payment.account_id == account.id
                @payments << payment.as_json(include: { account: {} } )
              end
            end

          end
        end

      end
    end
    render json: @payments
  end

end

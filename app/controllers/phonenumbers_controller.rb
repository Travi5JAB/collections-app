class PhonenumbersController < ApplicationController
  def create_phone
    @num_change = params[:number].insert(3, '-')
    @num_change2 = @num_change.insert(7,'-')
    @number = Phonenumber.create(
      :number => @num_change2,
      :debter_id => params[:debter_id],
      :phone_type => params[:phoneType]
    )
    if @number.valid?
      Account.find_each do |account|
        if account.debter_id == params[:debter_id]
          Comment.create(
            :string => "New phone number added: #{@num_change2}",
            :account_id => account.id
          )
        end
      end
      render json: @number
    else
        render json: @number.errors, status: :unprocessable_entity
    end
  end

  def phone_params
    params.require(:phonenumber).permit(:number, :debter_id)
  end
end

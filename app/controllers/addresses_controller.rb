class AddressesController < ApplicationController
  def create_address
    @address = Address.create(
      :address => params[:mainAddress],
      :debter_id => params[:debter_id],
      :state => params[:stateInitial],
      :city => params[:city],
      :zipcode => params[:zipcode]
    )
    if @address.valid?
      Account.find_each do |account|
        if account.debter_id == params[:debter_id]
          Comment.create(
            :string => "New address added at #{params[:mainAddress]}",
            :account_id => account.id
          )
        end
      end
        render json: @address

    else
        render json: @address.errors, status: :unprocessable_entity
    end
  end

  def address_params
    params.require(:address).permit(:address, :debter_id, :state, :city, :zipcode)
  end
end

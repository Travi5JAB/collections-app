class AddPhoneTypeToPhonenumber < ActiveRecord::Migration[5.2]
  def change
    add_column :phonenumbers, :phone_type, :string  
  end
end

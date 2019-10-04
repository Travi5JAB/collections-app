class AddInfoToAddresses < ActiveRecord::Migration[5.2]
  def change
    add_column :addresses, :state , :string
    add_column :addresses, :city , :string
    add_column :addresses, :zipcode , :integer
  end
end

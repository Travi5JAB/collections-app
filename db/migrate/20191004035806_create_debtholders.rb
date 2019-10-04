class CreateDebtholders < ActiveRecord::Migration[5.2]
  def change
    create_table :debtholders do |t|
      t.string :address
      t.string :email
      t.string :state
      t.string :phone_number
      

      t.timestamps
    end
  end
end

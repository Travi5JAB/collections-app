class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.references :debter
      t.references :debtholder
      t.string :balance
      t.timestamps
    end
  end
end

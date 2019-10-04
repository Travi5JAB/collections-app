class ChangeBalanceToInt < ActiveRecord::Migration[5.2]
  def change
    remove_column :accounts, :balance
    add_column :accounts, :balance, :bigint
  end
end

class AddAdminToDebtcollector < ActiveRecord::Migration[5.2]
  def change
    add_column :debtcollectors, :admin_access, :boolean, :default => false
  end
end

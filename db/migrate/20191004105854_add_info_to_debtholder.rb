class AddInfoToDebtholder < ActiveRecord::Migration[5.2]
  def change
    add_column :debtholders, :holdername, :string
  end
end

class AddRefToDebter < ActiveRecord::Migration[5.2]
  def change
    add_reference :debters, :debtcollector, index: true
  end
end

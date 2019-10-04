class CreateAddresses < ActiveRecord::Migration[5.2]
  def change
    create_table :addresses do |t|
      t.string :address
      t.references :debter

      t.timestamps
    end
  end
end

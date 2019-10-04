class CreatePhonenumbers < ActiveRecord::Migration[5.2]
  def change
    create_table :phonenumbers do |t|
      t.string :number
      t.references :debter

      t.timestamps
    end
  end
end

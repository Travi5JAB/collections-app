class CreateDebters < ActiveRecord::Migration[5.2]
  def change
    create_table :debters do |t|
      t.string :first_name
      t.string :last_name
      t.string :ssn

      t.timestamps
    end
  end
end

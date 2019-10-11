class CreateComments < ActiveRecord::Migration[5.2]
  def change
    create_table :comments do |t|
      t.string :string
      t.references :account

      t.timestamps
    end
  end
end

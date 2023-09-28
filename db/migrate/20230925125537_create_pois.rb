class CreatePois < ActiveRecord::Migration[5.2]
  def change
    create_table :pois do |t|
      t.string :title, null: false
      t.string :description, null: false
      t.integer :status, limit: 1, null: false, :default => 1
      t.integer :score, limit: 1, null: false, :default => 1
      t.decimal :latitude, precision: 10, scale: 6
      t.decimal :longitude, precision: 10, scale: 6
      t.string :icon, limit: 50
      t.string :color, limit: 10
      t.references :category
      t.references :user

      t.timestamps
    end
  end
end

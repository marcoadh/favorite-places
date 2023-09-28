class CreateCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :categories do |t|
      t.string :name
      t.integer :status, limit: 1, null: false, :default => 1
    end
  end
end

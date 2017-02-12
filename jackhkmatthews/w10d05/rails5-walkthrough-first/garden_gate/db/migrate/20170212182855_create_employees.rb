class CreateEmployees < ActiveRecord::Migration[5.0]
  def change
    create_table :employees do |t|
      t.string :name
      t.float :age
      t.references :role, foreign_key: true

      t.timestamps
    end
  end
end

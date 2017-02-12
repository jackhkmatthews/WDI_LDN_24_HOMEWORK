class CreateRoles < ActiveRecord::Migration[5.0]
  def change
    create_table :roles do |t|
      t.string :name
      t.string :description
      t.float :salary
      t.boolean :vacancies

      t.timestamps
    end
  end
end

class AddCostAndRevenueToCompany < ActiveRecord::Migration[5.0]
  def change
    add_column :companies, :cost, :integer
    add_column :companies, :revenue, :integer
  end
end

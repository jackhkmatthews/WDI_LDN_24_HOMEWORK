class Company < ApplicationRecord
  belongs_to :user
  validates :ticker, presence: true, uniqueness: true

  def profit
    revenue - cost
  end
end

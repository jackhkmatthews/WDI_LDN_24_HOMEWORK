class CompanySerializer < ActiveModel::Serializer
  attributes :id, :ticker, :cost, :revenue, :profit
  has_one :user
end

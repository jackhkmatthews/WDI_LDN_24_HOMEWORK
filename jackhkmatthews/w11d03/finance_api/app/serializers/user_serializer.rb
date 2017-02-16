class UserSerializer < ActiveModel::Serializer
  has_many :companies
  attributes :id, :username, :first_name, :last_name, :full_name

  def full_name
    "#{object.first_name} #{object.last_name}"
  end
end

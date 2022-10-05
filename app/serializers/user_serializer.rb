class UserSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :is_admin, :email, :password_digest

  has_one :wishlist
  has_one :account
  has_many :favorites
end

class WishlistSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_many :favorites
end

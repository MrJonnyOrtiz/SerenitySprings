class OrderSerializer < ActiveModel::Serializer
  attributes :id, :paid
  has_one :account
end

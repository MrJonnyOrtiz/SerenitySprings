class Service < ApplicationRecord
  belongs_to :service_type
  belongs_to :duration

  has_many :favorites
  has_many :wishlists, through: :favorites

  validates :name, presence:true
  validates :description, presence:true
  validates :price, presence:true
end

class Wishlist < ApplicationRecord
  belongs_to :user
  has_many :favorites, dependent: :destroy
  has_many :services, through: :favorites
end

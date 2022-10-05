class Favorite < ApplicationRecord
  belongs_to :wishlist
  belongs_to :service
end

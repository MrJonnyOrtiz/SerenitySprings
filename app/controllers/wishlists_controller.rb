class WishlistsController < ApplicationController
    def index
        render json: Wishlist.all, status: :ok
    end
    
    def create
        wishlist = Wishlist.create!(wishlist_params)
        render json: wishlist, status: :created
    end

    private

    def wishlist_params
        params.permit(:user_id)
    end
end

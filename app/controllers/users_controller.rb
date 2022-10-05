class UsersController < ApplicationController
    before_action :authorize_user, except: [:create]

    # index
    def index
        render json: User.all, status: :ok
    end

    # create
    def create
        user = User.create!(user_params)
        render json: user, status: :created
    end

    # show
    def show
        current_user = User.find_by(id: session[:current_user])
        render json: current_user
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :password, :password_confirmation)
    end
end

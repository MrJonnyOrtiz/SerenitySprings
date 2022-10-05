class AccountsController < ApplicationController

    def index
        render json: Account.all, status: :ok
    end

    def create
        account = Account.create!(account_params)
        render json: account, status: :created
    end

    private

    def account_params
        params.permit(:id, :user_id)
    end
end

class DurationsController < ApplicationController
    before_action :is_admin

    def index
        render json: Duration.all, status: :ok
    end

    def create
        duration = Duration.create!(duration_params)
        render json: duration, status: :created
    end

    # def show
    #     duration = Duration.find(params[:id])
    #     render json: duration, status: :ok
    # end

    def update
        duration = Duration.find(params[:id])
        duration.update!(duration_params)
        render json: duration, status: :created
    end

    def destroy
        duration = Duration.find(params[:id])
        duration.destroy
        render json: duration, status: :ok
    end

    private

    def duration_params
        params.permit(:time_interval)
    end
end

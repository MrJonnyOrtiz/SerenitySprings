class ServicesController < ApplicationController
    before_action :is_admin, only: [:create, :destroy, :update]

    def index
        render json: Service.all, status: :ok
    end

    def create
        service = Service.create!(service_params)
        render json: service, status: :created
    end

    def update
        service = Service.find(params[:id])
        service.update!(service_params)
        render json: service, status: :created
    end
    
    def show
        service = Service.find(params[:id])
        render json: service, status: :ok
    end

    def destroy
        service = Service.find(params[:id])
        service.destroy
        head :no_content
    end

    private

    def service_params
        params.permit(:name, :description, :price, :image_url, :service_type_id, :duration_id)
    end

end

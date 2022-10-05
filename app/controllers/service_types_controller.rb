class ServiceTypesController < ApplicationController
    before_action :is_admin

    def index
        render json: ServiceType.all, status: :ok
    end

    def create
        service_type = ServiceType.create!(service_type_params)
        render json: service_type, status: :created
    end

    def update
        service_type = ServiceType.find(params[:id])
        service_type.update!(service_type_params)
        render json: service_type, status: :created
    end

    # def show
    #     service_type = ServiceType.find(params[:id])
    #     render json: service_type, status: :ok
    # end

    def destroy
        service_type = ServiceType.find(params[:id])
        service_type.destroy
        head :no_content
    end

    private

    def service_type_params
        params.permit(:service_type_name)
    end

end

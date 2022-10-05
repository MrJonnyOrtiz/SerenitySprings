class ServiceSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :image_url, :service_type_id, :service_type_name, :duration_id, :time_interval

  def service_type_name
    ServiceType.find(object.service_type_id).service_type_name
  end
  
  def time_interval
    Duration.find(object.duration_id).time_interval
  end

end

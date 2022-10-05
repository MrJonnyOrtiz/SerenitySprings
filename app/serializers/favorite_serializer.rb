class FavoriteSerializer < ActiveModel::Serializer
  attributes :id, :service_id, :wishlist_id, :name, :description, :price, :image_url, :service_type_id, :service_type_name, :duration_id, :time_interval
  # has_one :wishlist
  # has_one :service

  def name
    Service.find(object.service_id).name
  end

  def description
    Service.find(object.service_id).description
  end

  def price
    Service.find(object.service_id).price
  end

  def image_url
    Service.find(object.service_id).image_url
  end

  def service_type_id
    Service.find(object.service_id).service_type_id
  end

  def service_type_name
    ServiceType.find(Service.find(object.service_id).service_type_id).service_type_name
  end
  
  def duration_id
    Service.find(object.service_id).duration_id
  end
  
  def time_interval
    Duration.find(Service.find(object.service_id).duration_id).time_interval
  end

end

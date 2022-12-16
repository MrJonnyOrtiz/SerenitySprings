class ServiceType < ApplicationRecord
    has_many :services
    
    validates :service_type_name, presence:true, :inclusion => %w(Salon Spa Products), uniqueness:true

end

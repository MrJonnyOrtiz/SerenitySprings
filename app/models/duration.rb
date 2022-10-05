class Duration < ApplicationRecord
    has_many :services

    validates :time_interval, presence:true, numericality: { only_integer: true }, uniqueness:true

    validate :interval_of_15 

    def interval_of_15
        unless time_interval % 15 == 0 || time_interval == 0
            errors.add(:time_interval, "Sorry, please enter 15 minute intervals.")
        end
    end


end

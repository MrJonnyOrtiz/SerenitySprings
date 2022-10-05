class CreateServices < ActiveRecord::Migration[7.0]
  def change
    create_table :services do |t|
      t.string :name
      t.string :description
      t.float :price
      t.string :image_url
      t.belongs_to :service_type, null: false, foreign_key: true
      t.belongs_to :duration, null: false, foreign_key: true

      t.timestamps
    end
  end
end

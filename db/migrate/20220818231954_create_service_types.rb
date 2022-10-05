class CreateServiceTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :service_types do |t|
      t.string :service_name

      t.timestamps
    end
  end
end

class RenameServiceNameColumn < ActiveRecord::Migration[7.0]
  def change
    rename_column(:service_types, :service_name, :service_type_name)
  end
end

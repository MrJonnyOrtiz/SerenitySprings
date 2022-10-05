class RenameIsAdmin < ActiveRecord::Migration[7.0]
  def change
    rename_column(:users, :is_Admin, :is_admin)
  end
end

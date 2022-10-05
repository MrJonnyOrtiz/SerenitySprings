class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.belongs_to :account, null: false, foreign_key: true
      t.boolean :paid, default: false

      t.timestamps
    end
  end
end

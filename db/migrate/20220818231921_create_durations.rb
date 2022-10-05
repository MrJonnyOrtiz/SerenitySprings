class CreateDurations < ActiveRecord::Migration[7.0]
  def change
    create_table :durations do |t|
      t.integer :time_interval

      t.timestamps
    end
  end
end

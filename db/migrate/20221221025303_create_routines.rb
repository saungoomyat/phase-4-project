class CreateRoutines < ActiveRecord::Migration[6.1]
  def change
    create_table :routines do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title
      t.string :instructions
      t.string :body_part

      t.timestamps
    end
  end
end

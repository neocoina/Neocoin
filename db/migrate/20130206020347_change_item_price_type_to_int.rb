class ChangeItemPriceTypeToInt < ActiveRecord::Migration
  def up
    change_column :items, :price, :int
  end

  def down
    change_column :items, :price, :string
  end
end

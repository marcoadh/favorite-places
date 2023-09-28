class Category < ApplicationRecord
  has_many :pois

  validates :name, presence: true

  enum status: { enabled: 1, disabled: 2, deleted: 3}
end
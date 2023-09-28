class Poi < ApplicationRecord
  belongs_to :category, class_name: "Category", foreign_key: "category_id"
  belongs_to :user, class_name: "User", foreign_key: "user_id"

  validates :title, presence: true
  validates :description, presence: true

  enum status: { enabled: 1, disabled: 2, deleted: 3}
end
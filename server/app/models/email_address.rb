class EmailAddress < ApplicationRecord
  EMAIL_LENGTH = { maximum: 254 }.freeze # RFCs

  belongs_to :account

  validates :confirmed, presence: true
  validates :email, format: { with: /\A\S+@\S+\.\S+\z/ }
  validates :email, length: EMAIL_LENGTH
end

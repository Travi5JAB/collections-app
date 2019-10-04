class Debter < ApplicationRecord
  belongs_to :debtcollector
  has_many :accounts
  has_many :phonenumbers
  has_many :addresses
end

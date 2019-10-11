class Account < ApplicationRecord
  belongs_to :debter
  belongs_to :debtholder
  has_many :comments
end

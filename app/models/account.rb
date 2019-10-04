class Account < ApplicationRecord
  belongs_to :debter
  belongs_to :debtholder
end

class User < ApplicationRecord
    has_many :routines
    
    has_secure_password
  
    validates :username, presence: true, uniqueness: true
end

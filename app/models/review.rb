class Review < ApplicationRecord
    belongs_to :user
    belongs_to :movies
  
    validates :content, presence: true, length: { maximum: 100 }  
  
end

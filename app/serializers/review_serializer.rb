class ReviewSerializer < ActiveModel::Serializer
    attributes :id, :content, :user_id, :book_id, :user
  
    belongs_to :user
    belongs_to :movie
end
  
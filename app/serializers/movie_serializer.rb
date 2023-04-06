class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre

  has_many :reviews, serializer: ReviewSerializer
end

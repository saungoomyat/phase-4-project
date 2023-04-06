class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :movies, serializer: MovieSerializer
  has_many :reviews, serializer: ReviewSerializer


end

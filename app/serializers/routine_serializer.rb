class RoutineSerializer < ActiveModel::Serializer
  attributes :id, :body_part, :workout, :sets
  has_one :user
end

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'

puts "🌱 Seeding data..."

User.destroy_all
Movie.destroy_all
Review.destroy_all

# 5.times do
#   user = User.create!(
#       username: Faker::Internet.unique.username,
#       password: Faker::Internet.password(min_length: 5,max_length: 8)
#       )

# end

puts "✅ Done seeding!"
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Company.destroy_all

u1 = User.create!(username: "alex", first_name: "Alex", last_name: "Chin", password: "password", password_confirmation: "password")
u2 = User.create!(username: "mike", first_name: "Mike", last_name: "Hayden", password: "password", password_confirmation: "password")
u3 = User.create!(username: "rane", first_name: "Rane", last_name: "Gowan", password: "password", password_confirmation: "password")

c1 = u1.companies.create!(ticker: "APPL", cost: 33000, revenue: 55000)
c2 = u2.companies.create!(ticker: "AIM", cost: 3000, revenue: 5000)
c3 = u1.companies.create!(ticker: "BARC.L", cost: 333000, revenue: 535000)
c4 = u3.companies.create!(ticker: "BP.L", cost: 33000, revenue: 550)

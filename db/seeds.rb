# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

collector = Debtcollector.new
collector.email = 'test@example.com'
collector.password = 'valid_password'
collector.password_confirmation = 'valid_password'
collector.first_name = 'John'
collector.last_name = 'Dogh'
collector.username = "JD1"
collector.save!


debter = Debter.new
debter.first_name = "Jimmy"
debter.last_name = "Jones"
debter.ssn = "666-666-6666"
debter.debtcollector_id = 1
debter.save!

debter2 = Debter.new
debter2.first_name = "Jack"
debter2.last_name = "Frost"
debter2.ssn = "777-777-7777"
debter2.debtcollector_id = 1
debter2.save!


holder = Debtholder.new
holder.address = "123 Main St"
holder.email = "holer@email.com"
holder.state = "CA"
holder.phone_number = "619-619-6196"
holder.holdername = "Big Credit Union"
holder.save!


account = Account.new
account.debter_id = 1
account.debtholder_id = 1
account.balance = 200
account.save!

account2 = Account.new
account2.debter_id = 1
account2.debtholder_id = 1
account2.balance = 250
account2.save!


phonenumber = Phonenumber.new
phonenumber.number = "619-916-9169"
phonenumber.debter_id = 1
phonenumber.phone_type = "Cell"
phonenumber.save!

phonenumber2 = Phonenumber.new
phonenumber2.number = "619-916-2020"
phonenumber2.debter_id = 1
phonenumber2.phone_type = "Work"
phonenumber2.save!


address = Address.new
address.address = "123 Victory Rd."
address.state = "CA"
address.city = "San Diego"
address.zipcode = 91941
address.debter_id = 1
address.save!

address2 = Address.new
address2.address = "234 Milky Way"
address2.state = "CA"
address2.city = "San Diego"
address2.zipcode = 91941
address2.debter_id = 1
address2.save!


comment = Comment.new
comment.string = "called and spoke to debter"
comment.account_id = 1
comment.save!

comment2 = Comment.new
comment2.string = "debter payed debt"
comment2.account_id = 1
comment2.save!

comment3 = Comment.new
comment3.string = "called and spoke to debter"
comment3.account_id = 2
comment3.save!

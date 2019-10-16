# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_16_053850) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "accounts", force: :cascade do |t|
    t.bigint "debter_id"
    t.bigint "debtholder_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "balance"
    t.index ["debter_id"], name: "index_accounts_on_debter_id"
    t.index ["debtholder_id"], name: "index_accounts_on_debtholder_id"
  end

  create_table "addresses", force: :cascade do |t|
    t.string "address"
    t.bigint "debter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "state"
    t.string "city"
    t.integer "zipcode"
    t.index ["debter_id"], name: "index_addresses_on_debter_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "string"
    t.bigint "account_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["account_id"], name: "index_comments_on_account_id"
  end

  create_table "debtcollectors", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "username"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "admin_access", default: false
    t.index ["email"], name: "index_debtcollectors_on_email", unique: true
    t.index ["reset_password_token"], name: "index_debtcollectors_on_reset_password_token", unique: true
  end

  create_table "debters", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "ssn"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "debtcollector_id"
    t.index ["debtcollector_id"], name: "index_debters_on_debtcollector_id"
  end

  create_table "debtholders", force: :cascade do |t|
    t.string "address"
    t.string "email"
    t.string "state"
    t.string "phone_number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "holdername"
  end

  create_table "phonenumbers", force: :cascade do |t|
    t.string "number"
    t.bigint "debter_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "phone_type"
    t.index ["debter_id"], name: "index_phonenumbers_on_debter_id"
  end

end

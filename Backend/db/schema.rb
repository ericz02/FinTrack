# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_05_04_214936) do
  create_table "debts", force: :cascade do |t|
    t.decimal "amount", precision: 10, scale: 2
    t.string "creditor"
    t.string "debtor"
    t.date "due_date"
    t.string "status", default: "Pending"
    t.decimal "interest_rate", precision: 5, scale: 2
    t.decimal "minimum_payment", precision: 10, scale: 2
    t.string "frequency_of_payments"
    t.date "last_payment_date"
    t.decimal "total_paid", precision: 10, scale: 2, default: "0.0"
    t.text "description"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_debts_on_user_id"
  end

  create_table "expenses", force: :cascade do |t|
    t.string "category"
    t.string "vendor"
    t.date "date"
    t.decimal "amount"
    t.text "purpose"
    t.string "receipt"
    t.boolean "reimbursable"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_expenses_on_user_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.string "name"
    t.decimal "amount"
    t.datetime "date"
    t.text "description"
    t.string "type"
    t.string "merchant"
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_transactions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "address"
    t.string "phone_number"
    t.date "date_of_birth"
    t.string "gender"
    t.decimal "income_yearly", precision: 10, scale: 2
    t.decimal "income_monthly", precision: 10, scale: 2
    t.decimal "income_weekly", precision: 10, scale: 2
  end

  add_foreign_key "debts", "users"
  add_foreign_key "expenses", "users"
  add_foreign_key "transactions", "users"
end

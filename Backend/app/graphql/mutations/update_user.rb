module Mutations
  class UpdateUser < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :email, String, required: false
    argument :password, String, required: false

    field :user, Types::UserType, null: true
    field :errors, [String], null: false

    def resolve(id:, name: nil, email: nil, password: nil)
      user = User.find(id)
      if user.update(name: name, email: email, password: password)
        { user: user, errors: [] }
      else
        { user: nil, errors: user.errors.full_messages }
      end
    rescue ActiveRecord::RecordNotFound => e
      { user: nil, errors: [e.message] }
    end
  end
end

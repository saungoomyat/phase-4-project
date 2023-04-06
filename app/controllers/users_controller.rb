class UsersController < ApplicationController
  skip_before_action :authorize, only: [:create], raise: false

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    if user.valid?
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    if params[:id]
      user = User.find(params[:id])
    else 
      user = User.find_by!(id: session[:user_id])
    end
    render json: user, include: "*", status: 200
  end

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
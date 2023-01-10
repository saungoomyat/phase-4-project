class RoutinesController < ApplicationController
  
    def index
      render json: Routine.all
    end
  
    def create
      routine = @current_user.routines.create!(routine_params)
      render json: routine, status: :created
    end
  
    private
  
    def routine_params
      params.permit(:title, :body_part, :instructions)
    end
  
  end
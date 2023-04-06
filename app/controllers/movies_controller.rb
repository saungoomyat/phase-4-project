class MoviesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  skip_before_action :authorize, only: [:index]


  
  def index
    movies = Movie.all
    render json: movies
  end

  def create
    movie = Movie.create(movie_params)
    if movie.save
      render json: movie, status: :created
    else
      render json: movie.errors, status: :unprocessable_entity
    end
  end

  def show
    movie = Movie.find(params[:id])
    render json: movie
  end

  private

  def movie_params
    params.permit(:title, :genre)
end

def render_not_found_response
    render json: { error: "Movie does not exist" }, status: :not_found
end
end

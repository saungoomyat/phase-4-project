class ReviewsController < ApplicationController

  def index
    if params[:movie_id]
        book = Movie.find(params[:movie_id])
        reviews = Movie.reviews
    else 
        render json: render_not_found_response
    end
    render json: reviews
end

def destroy
  review = Review.find(params[:id])
  if review.user_id == session[:user_id]
    review.destroy
    render json: review, status: 200
  else
    render json: { error: "You are not authorized to delete this review" }, status: :unauthorized
  end
end

def update
  review = Review.find_by(id: params[:id])
  if review.user_id == session[:user_id]
    review.update(review_params)
    render json: review, status: 200
  else
    render json: { error: "You are not authorized to edit this review" }, status: :unauthorized
  end
end




  def create
    movie = Movie.find(params[:movie_id])
    if movie.reviews.where(user_id: session[:user_id]).exists?
      render json: { error: "You can only create one review per book" }, status: :unprocessable_entity
    else
      review = movie.reviews.build(review_params)
      review.user = User.find(session[:user_id])
      if review.save
        render json: review, status: :created
      else
        render json: { errors: review.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end


  private

  def review_params
    params.permit(:review)
  end

  def render_not_found_response
    render json: { error: "Reviews not found" }, status: :not_found
  end
end

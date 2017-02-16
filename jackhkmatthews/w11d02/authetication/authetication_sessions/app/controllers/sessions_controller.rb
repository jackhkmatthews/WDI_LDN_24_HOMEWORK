class SessionsController < ApplicationController
  def new
  end

  def create
    # find user
    user = User.find_by_email(params[:email])
    # if password matches
    if user && user.authenticate(params[:password])
      # create sessions
      session[:user_id] = user.id
      # and redirect
      redirect_to root_path, notice: "Welcome back"
    # else
    else
      # throw error
      flash[:error] = "Something went wrong"
      render new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "logged out!"
  end
end

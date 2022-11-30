class PlacesController < ApplicationController
    def create
        
        place = Place.create!(params[:location])
        render json: place, status: :created
    end

    def destroy
        place.delete :place_id
        head :no_content
    end


end

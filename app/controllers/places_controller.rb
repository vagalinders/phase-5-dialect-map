class PlacesController < ApplicationController
    
    skip_before_action :authorize, only: :index

    def index
        places = Place.all
        render json: places
    end
    
    def create
        params[:places].each do |location|
            place = Place.find_or_create_by(location: location[:location])
            UserLocation.create(
                user_id: session[:user_id],   
                location_type: location[:location_type], 
                place_id: place.id
            )
        end 
render json: {}
    end

    def destroy
        place.delete :place_id
        head :no_content
    end




end

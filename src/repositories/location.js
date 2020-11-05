import store from '../store/index'

class LocationRepository {
    getUserLocations(){
        return store.dispatch("location/getUserLocations");
    }

    saveNewLocation(city,address){
        let data={
            city:city,
            address:address
        }
        return store.dispatch("location/saveNewLocation",data);
    }
}

export default new LocationRepository();
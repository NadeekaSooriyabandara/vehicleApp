import { Vehicle } from './vehicle.model';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class VehicleService {
  vehicleList: AngularFireList<any>;
  selectedVehicle: Vehicle = new Vehicle();
  constructor(private firebase: AngularFireDatabase) { }

getData() {
  this.vehicleList = this.firebase.list('Vehicles');
  return this.vehicleList;
}

insertVehicle(vehicle: Vehicle) {
  this.vehicleList.push({
    ac: vehicle.ac,
    bus: vehicle.bus,
    busacorvan: vehicle.busacorvan,
    busnonacorvan: vehicle.busnonacorvan,
    image: vehicle.image,
    seats: vehicle.seats,
    vehicleNo: vehicle.vehicleNo,
    vehicletype: vehicle.vehicletype
  });
}

updateVehicle(vehicle: Vehicle) {
  this.vehicleList.update(vehicle.$key,
    {
    ac: vehicle.ac,
    bus: vehicle.bus,
    busacorvan: vehicle.busacorvan,
    busnonacorvan: vehicle.busnonacorvan,
    image: vehicle.image,
    seats: vehicle.seats,
    vehicleNo: vehicle.vehicleNo,
    vehicletype: vehicle.vehicletype
    });
}

deleteVehicle($key: string) {
  this.vehicleList.remove($key);
}

}

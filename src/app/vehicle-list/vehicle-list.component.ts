import { element } from 'protractor';
import { Vehicle } from './../shared/vehicle.model';
import { VehicleService } from './../shared/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireAction } from 'angularfire2/database';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
  providers: [VehicleService]
})
export class VehicleListComponent implements OnInit {

  vehicleList: Vehicle[];
  constructor(private vehicleService: VehicleService, private toastr: ToastrService) {}

  ngOnInit() {
    const x = this.vehicleService.getData();
    x.snapshotChanges().subscribe(item => {
      this.vehicleList = [];
      item.forEach(e => {
        const y = e.payload.toJSON();
        y['$key'] = e.key;
        this.vehicleList.push(y as Vehicle);
      });
    });
  }

  onDelete($key: string) {
    if (confirm('Are you sure to delete this record ?') === true) {
      this.vehicleService.deleteVehicle($key);
      this.toastr.warning('Deleted Successfully', 'Vehicle Register');
    }
  }

}

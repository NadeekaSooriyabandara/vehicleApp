import { Vehicle } from './../shared/vehicle.model';
import { ToastrService } from 'ngx-toastr';
import { VehicleService } from './../shared/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
  providers: [VehicleService]
})
export class VehicleComponent implements OnInit {
  vehicletype = 'bus';
  ac = 'AC';
  seats: string;
  vehicleNo: string = null;
  file: File = null;
  @ViewChild('myInput')
  myInputVariable: any;

  constructor(private vehicleService: VehicleService, private toastr: ToastrService,
     private db: AngularFireDatabase) { }

  ngOnInit() {
    this.vehicleService.getData();
    this.resetForm();
  }

  photoSelected(event: any) {
    this.file = event.target.files[0];
  }

  onSubmit(vehicleForm: NgForm) {
    console. log('vehicle type:' + this.vehicletype + ' ' + 'ac:' + this.ac + ' ' + 'seats:'
     + this.seats + ' ' + 'vehicleNo:' + this.vehicleNo );

    this.vehicleService.selectedVehicle.$key = this.vehicleNo.toString().trim();
    this.vehicleService.selectedVehicle.seats = this.seats.toString().trim();
    this.vehicleService.selectedVehicle.vehicleNo = this.vehicleNo.toString().trim();
    this.vehicleService.selectedVehicle.ac = this.ac;
    if (this.vehicletype === 'bus' && this.ac === 'AC') {
      this.vehicleService.selectedVehicle.vehicletype = 'busac';
      this.vehicleService.selectedVehicle.bus = 'yes';
      this.vehicleService.selectedVehicle.busacorvan = 'yes';
      this.vehicleService.selectedVehicle.busnonacorvan = 'no';
      this.vehicleService.selectedVehicle.vehicle = 'bus';
    } else if (this.vehicletype === 'bus' && this.ac === 'NONAC') {
      this.vehicleService.selectedVehicle.vehicletype = 'busnonac';
      this.vehicleService.selectedVehicle.bus = 'no';
      this.vehicleService.selectedVehicle.busacorvan = 'no';
      this.vehicleService.selectedVehicle.busnonacorvan = 'yes';
      this.vehicleService.selectedVehicle.vehicle = 'bus';
    } else if (this.vehicletype === 'van' && this.ac === 'AC') {
      this.vehicleService.selectedVehicle.vehicletype = 'van';
      this.vehicleService.selectedVehicle.bus = 'no';
      this.vehicleService.selectedVehicle.busacorvan = 'yes';
      this.vehicleService.selectedVehicle.busnonacorvan = 'yes';
      this.vehicleService.selectedVehicle.vehicle = 'van';
    } else {
      this.vehicleService.selectedVehicle.vehicletype = 'van';
      this.vehicleService.selectedVehicle.bus = 'no';
      this.vehicleService.selectedVehicle.busacorvan = 'yes';
      this.vehicleService.selectedVehicle.busnonacorvan = 'yes';
      this.vehicleService.selectedVehicle.vehicle = 'van';
    }

    const metaData = {'contentType': this.file.type};
    const storageRef = firebase.storage().ref('/Vehicles/' + this.vehicleNo);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(this.file, metaData);
    console.log('Uploading: ', this.file.name);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log('Upload is Complete!');
      this.vehicleService.selectedVehicle.image = uploadSnapshot.downloadURL;

      this.vehicleService.insertVehicle(this.vehicleService.selectedVehicle);
      this.toastr.success('Submitted Successfully', 'Employee Register');
      this.resetForm(vehicleForm);
    });

  }

  isImageNull() {
    if (this.file === null || this.myInputVariable.nativeElement.value === '') {
      return true;
    } else {
      return false;
    }
  }

  resetForm(vehicleForm?: NgForm) {
    if (vehicleForm != null) {
      vehicleForm.reset();
    }
    this.vehicletype = 'bus';
    this.ac = 'AC';
    this.seats = null;
    this.vehicleNo = null;
    this.myInputVariable.nativeElement.value = '';
  }

}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdentifyService} from 'app/identify/identify.service';

@Component({
  selector: 'user-editinfo',
  templateUrl: './editinfo.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserEditInfoComponent implements OnInit {

  identities: string[];
  genders: string[];


  editInfoForm: FormGroup;

  constructor(private fb: FormBuilder, private identifyService: IdentifyService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.getGenders();
    this.getIdentities();
  }

  getIdentities() {
    this.identifyService.getIdentities().then(identities => this.identities = identities);
  }

  getGenders() {
    this.identifyService.getGenders().then(genders => this.genders = genders);
  }

  createForm() {
    this.editInfoForm = new FormGroup({
      name: new FormControl('Nancy', Validators.required),
      gender: new FormControl(Validators.required),
      identify: new FormControl(Validators.required),
      tel: new FormControl('Nancy', Validators.required),
      email: new FormControl('Nancy', Validators.required),
    });
  }


  //    get basicInfo(): FormGroup {
  //    return this.basicInfoForm as FormGroup;
  // }
}

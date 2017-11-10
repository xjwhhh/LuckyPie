import {Component, OnInit} from '@angular/core';
import {FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';
import {Router} from '@angular/router';

@Component({
  selector: 'user-basicinfo',
  templateUrl: './basicinfo.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserBasicInfoComponent implements OnInit {

  user: User = new User();
  userId: number;

  basicInfoForm: FormGroup;

  constructor(private fb: FormBuilder, private identifyService: IdentifyService) {
  }

  createForm() {
    this.basicInfoForm = new FormGroup({
      name: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
      gender: new FormControl(Validators.required),
      identify: new FormControl(Validators.required),
      tel: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
      email: new FormControl({value: 'Nancy', disabled: true}, Validators.required),
    });
  }

  ngOnInit(): void {
    this.createForm();
  }

  //    get basicInfo(): FormGroup {
  //    return this.basicInfoForm as FormGroup;
  // }

  getUserBasicInfo() {
    this.identifyService.getUserBasicInfo(this.userId).then(user => console.log(user));

  }

  w(): void {
    console.log("234");
    window.open("http://localhost:4200/identify/editinfo");
  }
}

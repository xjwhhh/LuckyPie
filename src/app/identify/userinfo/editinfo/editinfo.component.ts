import {Component, OnInit} from '@angular/core';
import {FormControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IdentifyService} from 'app/identify/identify.service';
import {User} from 'app/entity/entity';
import {Router, ActivatedRoute, ParamMap, Params} from '@angular/router';

@Component({
  selector: 'user-editinfo',
  templateUrl: './editinfo.component.html',
  // styleUrls: ['./identify.component.css'],
})
export class UserEditInfoComponent implements OnInit {

  identities: string[];
  genders: string[];

  userId: number;

  userBasicInfo: User;

  editInfoForm: FormGroup;

  constructor(private router: Router,
              private fb: FormBuilder,
              private identifyService: IdentifyService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      console.log(params);
    });
    this.userId = this.identifyService.getUserId();
    this.identifyService.getUserBasicInfo(this.userId).then(user => this.userBasicInfo = user);
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
      name: new FormControl('', Validators.required),
      introduction: new FormControl('', Validators.required),
      gender: new FormControl(Validators.required),
      identity: new FormControl(Validators.required),
      tel: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
    });
  }

  updateUserBasicInfo(name: string, introduction: string, gender: string, identity: string, tel: string, email: string) {
    if (name == "") {
      alert("未输入名字");
    } else if (!this.telphoneCheck(tel)) {
      alert("手机号码格式错误");
    } else if (!this.emailCheck(email)) {
      alert("邮箱格式错误");
    } else {
      this.identifyService.updateUserBasicInfo(this.userId, name, introduction, gender, identity, tel, email).then(user => this.gotoBasicInfo(user));
    }

  }

  telphoneCheck(tel: string) {
    if (tel == "") {
      return true;
    }
    let regu = /^[1][0-9][0-9]{9}$/;
    let re = new RegExp(regu);
    if (!re.test(tel)) {
      return false;
    }
    return true;
  }

  emailCheck(email: string) {
    if (email == "") {
      return true;
    }
    if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)) {
      return false;
    }
    return true;
  }

  gotoBasicInfo(user: User) {
    if (user.id != null) {
      alert("更新成功");
      this.router.navigate(['/identify/info/' + user.id + '/basicinfo']);
    } else {
      alert("更新失败");
    }
  }
}

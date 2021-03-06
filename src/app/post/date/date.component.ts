import {
  Component,
  OnInit,
  OnChanges,
  TemplateRef
} from '@angular/core';

import {
  FileUploader
} from 'ng2-file-upload';
import {FormControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Photo, Dating, Tags, User} from 'app/entity/entity';
import {PostService} from 'app/post/post.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';


@Component({
  selector: 'post-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class PostDateComponent implements OnInit {
  activityForm: FormGroup;

  addresses: string[];
  costTypes: string[];
  Tags: string[];
  selectedTags: string[] = [];

  public uploader: FileUploader = new FileUploader({url: '图片上传地址'});

  imageUrls: string[] = [];

  dating: Dating;

  userId: number;

  tagStyles = [];

  descLength: number = 0;

  description: string = "";

  modalRef: BsModalRef;

  followIdArray: number[] = [];
  followerIdArray: number[] = [];

  followArray: User[] = [];


  constructor(private fb: FormBuilder,
              private postService: PostService,
              private router: Router,
              private modalService: BsModalService) {
  }


  ngOnInit(): void {
    this.Tags = Tags;
    this.getAddresses();
    this.getCostTypes();
    this.createForm();
    this.settags();
    this.userId = this.postService.getUserId();
    for (let i = 0; i < this.Tags.length; i++) {
      this.tagStyles.push({
        'background-color': 'black'
      });
    }
    this.postService.getUserFollows(this.userId).then(userIdArray => this.followIdArray = userIdArray);
    this.postService.getUserFollowers(this.userId).then(userIdArray => this.followerIdArray = userIdArray);
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges() {

  }

  getAddresses(): void {
    this.postService.getAddresses().then(addresses => this.addresses = addresses);
  }

  getCostTypes(): void {
    this.postService.getCostTypes().then(costTypes => this.costTypes = costTypes);
  }

  getTags(): void {
    this.postService.getTags().then(Tags => this.Tags = Tags);
  }

  createForm() {
    this.activityForm = this.fb.group({
      name: '',
      power: '',
      sidekick: '',
      photoRegion: '',
      photoTime: '',
      costType: '',
      desc: '',
      photos: this.fb.array([]),
      tags: this.fb.array([]),
    });
  }


  settags(): void {
    for (let i = 0; i < this.Tags.length; i++) {
      let tag = new FormControl();
      tag.setValue(this.Tags[i]);
      this.tags.push(tag);
    }
  }


  get photos(): FormArray {
    return this.activityForm.get('photos') as FormArray;
  };

  get tags(): FormArray {
    return this.activityForm.get('tags') as FormArray;
  };

  selectedFileOnChanged() {
    let isExist = false;
    let index = 0;


    // console.log(this.uploader.queue.length);
    // console.log(this.imageUrls.length);
    //todo 九张图的限制
    // if (this.imageUrls.length>9) {
    //   alert("不得上传超过九张图");
    //   // this.uploader.queue.splice(this.uploader.queue.length-1,1);
    //   console.log(this.imageUrls.length);
    //   console.log("out")
    // } else {
    //选择图片
    let $this = this; //区别于new FileReader()中的this
    let selectedArr = this.imageUrls; //存储选择的图片
    this.uploader.queue.forEach((q, i) => {
      // console.log(i);
      let reader = new FileReader();
      reader.readAsDataURL(q.some); //生成base64图片地址，实现本地预览。
      reader.onload = function () {
        if (selectedArr.length > 0) {
          let isSame = false; //标识是否选择过同一张图片
          selectedArr.forEach((url, j) => {
            if (url == this.result) {
              isSame = true;
            }
          });
          if (!isSame) {
            //避免选择相同的图片
            // selectedArr.push(this.result);
            $this.imageUrls.push(this.result);
            $this.photos.push($this.fb.group(new Photo(this.result)));
            // console.log($this.imageUrls.length);
          }
          // Todo 删除失败 Cannot read property 'remove' of undefined
          else {
            // console.log( $this.uploader.queue[i]);
            // $this.uploader.queue[i].remove(); //如果已经选择，就需要在队列中移除该图片

            $this.uploader.queue.splice(i, 1);
            // index = i;
            // isExist = true;
            // console.log("dup");
            // $this.uploader.queue.splice(index, 1);
            // console.log($this.uploader.queue.length);
            // break;

          }
        } else {
          // selectedArr.push(this.result);
          $this.imageUrls.push(this.result);
          $this.photos.push($this.fb.group(new Photo(this.result)));
          // console.log($this.imageUrls.length);
        }
      }
    });

    // }
    // console.log("end");
    //   console.log(isExist);
    //  if (isExist) {
    //    this.uploader.queue.splice(index, 1);
    //    console.log("delete");
    //  }
  }

  onClickTag(tagValue: string, i: number) {
    let isExist = false;
    let index = -1;
    this.selectedTags.forEach((tag, j) => {
      if (tagValue == tag) {
        isExist = true;
        index = j;
      }
    });
    if (isExist) {
      this.selectedTags.splice(index, 1);
      this.tagStyles[i] = {
        'background-color': 'black'
      };

    } else {
      this.selectedTags.push(tagValue);
      this.tagStyles[i] = {
        'background-color': 'green'
      };
    }
    // console.log(this.selectedTags);
  }

  deleteImage(imageUrl: string) {
    this.imageUrls.forEach((url, i) => {
      if (url == imageUrl) {
        this.imageUrls.splice(i, 1);
        //todo uploader.queue裡的無法刪除，再次添加時會在加進來
        // console.log(this.imageUrls.length);
        this.uploader.queue.splice(i, 1);
        // console.log(this.uploader.queue.length);

        this.photos.removeAt(i);
      }
      // console.log(i);
    });
  }

  upload(photoAddress: string, photoTime: string, cost: string, desc: string) {
    console.log(photoTime);
    if (photoAddress == "") {
      alert("未填写拍摄地点");
    } else if (photoTime == "") {
      alert("未填写拍摄时间");
    } else if (cost == "") {
      alert("未填写费用要求");
    } else if (desc == "") {
      alert("未填写约拍描述");
    } else if (this.imageUrls.length > 9) {
      alert("超过九张图片");
    } else if (this.imageUrls.length == 0) {
      alert("未选择图片");
    } else {
      this.dating = new Dating();
      this.dating.userId = this.userId;
      this.dating.photoAddress = photoAddress;
      this.dating.photoTime = photoTime;
      this.dating.cost = cost;
      this.dating.desc = desc;
      this.dating.imageUrls = this.imageUrls;
      let now = new Date();
      let postTime = this.postService.dateFormat("yyyy-MM-dd hh:mm:ss", now);
      this.dating.postTime = postTime;
      this.dating.postAddress = '中国';
      this.dating.tags = this.selectedTags;
      this.postService.uploadDating(JSON.stringify(this.dating)).then(dating => this.check(dating));
    }
  }


  check(dating: Dating) {
    if (dating.id != null) {
      alert("发布约拍信息成功");
      this.router.navigate(['/follow', dating.userId]);
    } else {
      alert("发布约拍信息失败");
    }
  }

  isAt(desc: string, template: TemplateRef<any>) {
    if (desc.length > this.descLength) {
      if (desc.charAt(desc.length - 1) == "@") {
        this.openModal(template);
      }
    }
    this.descLength = desc.length;


  }

  openModal(template: TemplateRef<any>) {
    this.followArray.splice(0, this.followArray.length);
    for (let i = 0; i < this.followIdArray.length; i++) {
      this.postService.getUserBasicInfo(this.followIdArray[i]).then(user => this.followArray.push(user));
    }
    for (let i = 0; i < this.followerIdArray.length; i++) {
      this.postService.getUserBasicInfo(this.followerIdArray[i]).then(user => this.followArray.push(user));
    }
    this.modalRef = this.modalService.show(template);
  }

  selectAtUser(userId: number, userName: string, desc: string) {
    this.modalRef.hide();
    this.description = this.description + userName;
  }
}

import {
  Component,
  OnInit,
  TemplateRef
} from '@angular/core';
import {
  FileUploader
} from 'ng2-file-upload';

import {FormControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Photo, Album, Tags, User} from 'app/entity/entity';
import {PostService} from 'app/post/post.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';
import {BsModalService, BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'post-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css'],
})
export class PostAlbumComponent implements OnInit {
  albumForm: FormGroup;
  Tags: string[];
  selectedTags: string[] = [];

  public uploader: FileUploader = new FileUploader({url: '图片上传地址'});

  imageUrls: string[] = [];

  tagStyles = [];

  album: Album;

  userId: number;

  tagStyle = {
    'background-color': 'white'
  };


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
    this.createForm();
    this.userId = this.postService.getUserId();

    for (let i = 0; i < this.Tags.length; i++) {
      // this.ifSelected.push(false);
      this.tagStyles.push({
        'background-color': 'black'
      });
    }

    this.postService.getUserFollows(this.userId).then(userIdArray => this.followIdArray = userIdArray);
    this.postService.getUserFollowers(this.userId).then(userIdArray => this.followerIdArray = userIdArray);
  }


  ngAfterViewInit(): void {

  }


  createForm() {
    this.albumForm = this.fb.group({
      name: '',
      desc: '',
      address: '',
      date: '',
      equipment: '',
      photos: this.fb.array([]),
      tags: this.fb.array([]),
    });
  }

  get photos(): FormArray {
    return this.albumForm.get('photos') as FormArray;
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
  }

  deleteImage(imageUrl: string) {
    this.imageUrls.forEach((url, i) => {
      if (url == imageUrl) {
        this.imageUrls.splice(i, 1);
        //todo uploader.queue裡的無法刪除，再次添加時會在加進來
        // console.log(this.imageUrls.length);
        this.uploader.queue.splice(i, 1);
        this.photos.removeAt(i);
      }
    });
  }


  upload(name: string, desc: string) {
    if (name == "") {
      alert("未填写相册名字");
    } else if (desc == "") {
      alert("未填写相册描述");
    } else if (this.imageUrls.length == 0) {
      alert("未选择图片");
    } else {
      this.album = new Album();
      this.album.userId = this.userId;
      this.album.name = name;
      this.album.desc = desc;
      this.album.imageUrls = this.imageUrls;
      let now = new Date();
      let createTime = this.postService.dateFormat("yyyy-MM-dd hh:mm:ss", now);
      let updateTime = this.postService.dateFormat("yyyy-MM-dd hh:mm:ss", now);
      this.album.createTime = createTime;
      this.album.updateTime = updateTime;
      this.album.tags = this.selectedTags;
      this.postService.uploadAlbum(JSON.stringify(this.album)).then(album => this.check(album));
    }
  }

  check(album: Album) {
    if (album.id != null) {
      alert("发布相册成功");
      this.router.navigate(['/follow', album.userId]);
    } else {
      alert("发布相册失败");
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

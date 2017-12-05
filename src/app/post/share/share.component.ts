import {
  Component,
  OnInit
} from '@angular/core';

import {
  FileUploader
} from 'ng2-file-upload';

import {FormControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Photo, Share, Tags} from 'app/entity/entity';
import {PostService} from 'app/post/post.service';
import {ActivatedRoute, ParamMap, Params, Router} from '@angular/router';


@Component({
  selector: 'post-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css'],
})
export class PostShareComponent implements OnInit {
  photoForm: FormGroup;
  Tags: string[];
  // Tags: string[] = ["情侣", "商务", "民国", "汉服", "孕照", "儿童", "暗黑", "情绪", "私房", "夜景", "校园", "妆容", "古风", "淘宝", "时尚", "和服", "旗袍", "韩系", "欧美", "森系", "少女", "清新", "婚礼", "cos", "胶片", "黑白", "纪实", "日系"];
  selectedTags: string[] = [];

  public uploader: FileUploader = new FileUploader({url: '图片上传地址'});

  imageUrls: string[] = [];

  share: Share;

  userId: number;

  tagStyles = [];

  constructor(private fb: FormBuilder, private postService: PostService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.Tags = Tags;
    this.createForm();
    this.userId = this.postService.getUserId();
    for (let i = 0; i < this.Tags.length; i++) {
      // this.ifSelected.push(false);
      this.tagStyles.push({
        'background-color': 'white'
      });
    }
  }

  ngAfterViewInit(): void {

  }

  createForm() {
    this.photoForm = this.fb.group({
      desc: '',
      photos: this.fb.array([]),
      tags: this.fb.array([]),
    });
  }

  get photos(): FormArray {
    return this.photoForm.get('photos') as FormArray;
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
        'background-color': 'white'
      };
    } else {
      this.selectedTags.push(tagValue);
      this.tagStyles[i] = {
        'background-color': 'red'
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
        // console.log(this.uploader.queue.length);

        this.photos.removeAt(i);
      }
      // console.log(i);
    });
  }

  upload(desc: string) {
    if (desc == "") {
      alert("未填写分享內容");
    } else {
      this.share = new Share();
      this.share.userId = this.userId;
      this.share.desc = desc;
      this.share.imageUrls = this.imageUrls;
      let now = new Date();
      let postTime = this.postService.dateFormat("yyyy-MM-dd hh:mm:ss", now);
      this.share.postTime = postTime;
      this.share.postAddress = '中国';
      this.share.tags = this.selectedTags;
      this.share.forwardShareId = '-1';
      this.postService.uploadShare(JSON.stringify(this.share)).then(share => this.check(share));
    }
  }

  check(share: Share) {
    console.log(share);
    if (share.id != null) {
      alert("发布分享成功");
      this.router.navigate(['/follow', share.userId]);
    } else {
      alert("发布分享失败");
    }
  }


}

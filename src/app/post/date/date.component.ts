import {
  Component,
  OnInit,
  OnChanges
} from '@angular/core';

import {
  FileUploader
} from 'ng2-file-upload';
import {FormControl, FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {Photo} from 'app/entity/entity';
import {PostService} from 'app/post/post.service';


@Component({
  selector: 'post-activity',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css'],
})
export class PostActivityComponent implements OnInit {
  activityForm: FormGroup;

  addresses: String[];
  costTypes: String[];
  Tags: String[] = ["情侣", "商务", "民国", "汉服", "孕照", "儿童摄影", "暗黑", "情绪", "私房", "夜景", "校园", "妆容", "古风", "淘宝", "时尚", "和服", "旗袍", "韩系", "欧美", "森系", "少女", "宝丽来", "清新", "婚礼", "cosplay", "胶片", "黑白", "纪实", "日系"];
  selectedTags: String[] = [];

  public uploader: FileUploader = new FileUploader({url: '图片上传地址'});

  imageurls: string[] = [];


  constructor(private fb: FormBuilder, private postService: PostService) {
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
      costType: '',
      desc: '',
      photos: this.fb.array([]),
      tags: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.getAddresses();
    this.getCostTypes();
    this.createForm();
    this.settags();
  }

  ngAfterViewInit(): void {
  }

  ngOnChanges() {

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
    //选择图片
    let $this = this; //区别于new FileReader()中的this
    let selectedArr = this.imageurls; //存储选择的图片
    this.uploader.queue.forEach((q, i) => {
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
            selectedArr.push(this.result);
            $this.imageurls.push(this.result);
            $this.photos.push($this.fb.group(new Photo(this.result)));
          }
          // Todo 删除失败 Cannot read property 'remove' of undefined
          else {
            // console.log( $this.uploader.queue[i]);
            // $this.uploader.queue[i].remove(); //如果已经选择，就需要在队列中移除该图片
            // console.log($this.uploader.queue);
          }
        } else {
          selectedArr.push(this.result);
          $this.imageurls.push(this.result);
          $this.photos.push($this.fb.group(new Photo(this.result)));
        }
      }
    });
  }

  onClickTag(tagValue: String) {
    let isExist = false;
    let index = -1;
    this.selectedTags.forEach((tag, i) => {
      if (tagValue == tag) {
        isExist = true;
        index = i;
      }
    });
    if (isExist) {
      this.selectedTags.splice(index, 1);
    }
    else {
      this.selectedTags.push(tagValue);
    }
  }
}

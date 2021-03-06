//用户
export class User {
  id: number;
  account: string;
  password: string;
  name: string;
  head: string;
  authority: number;
  introduction: string;
  identity: string;
  gender: string;
  telephone: string;
  email: string;
  follows: User[]; //关注要分组，如何处理
  followers: User[];
  likes: Share[]; //喜欢相册？
  dates: Date[];
  shares: Share[];
  albums: Album[];
}


//分享
export class Share {
  id: number;
  userId: number;
  desc: string;
  imageUrls: any[];
  tags: string[];
  // numOfLikes: number;
  // numOfForwards: number;
  // numOfComments: number;
  // comments:Comment[];
  postTime: string;
  postAddress: string;
  forwardShareId: string;
  thumb: number;
}

//约拍
export class Dating {
  id: number;
  userId: number;
  desc: string;
  imageUrls: any[];
  // numOfLikes: number;
  // numOfForwards: number;
  // numOfComments: number;
  // comments:Comment[];
  cost: string;
  tags: string[];
  photoTime: string;
  photoAddress: string;
  postTime: string;
  postAddress: string;
}

//照片
export class Photo {
  id: number;
  userId: number;
  album_id: number;
  description: string;
  url = 'assets/image/saber.jpg';
  upload_time: string;
  tags: string[];

  // 标签，地点，主题等等
  constructor(u: string) {
    this.url = u;
  }
}


//相册
export class Album {
  id: number;
  userId: number;
  name: string;
  desc: string;
  time: string;
  imageUrls: any[];
  tags: string[];
  createTime: string;
  updateTime: string;
  // numOfLikes: number;
  // numOfForwards: number;
  // numOfComments: number;
  // comments:Comment[];
}


//评论
export class Comment {
  id: number;
  userId: number;
  userName: string;
  replyPostId: number;
  replyCommentId: number;
  content: string;
  times: string;

}

export class Notice {
  id: number;
  startUserId: number;
  userId: number;
  type: string;
  postId: number;
  content: string;
}

export class Chatting {
  id: number;
  fromUserId: number;
  toUserId: number;
  content: string;
  postTime: string;
}

export class ResultMessage {
  result: string;
}

export const Addresses: string[] = ["全部", "北京", "天津", "上海", "重庆", "河北", "山西", "辽宁", "吉林", "黑龙江", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "海南", "四川", "贵州", "云南", "陕西", "甘肃", "青海", "台湾", "内蒙古", "广西", "西藏", "宁夏", "新疆", "香港", "澳门"];

export const CostTypes: string[] = ["全部", "互免", "收费", "付费", "协商"];

export const Identities: string[] = ["无", "模特", "摄影师"];

export const Genders: string[] = ["无", "男", "女"];

export const Tags: string[] = ["情侣", "商务", "民国", "汉服", "孕照", "儿童", "暗黑", "情绪", "私房", "夜景", "校园", "妆容", "古风", "淘宝", "时尚", "和服", "旗袍", "韩系", "欧美", "森系", "少女", "清新", "婚礼", "胶片", "黑白", "纪实", "日系"];

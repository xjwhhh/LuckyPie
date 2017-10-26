export class Photo {
  id: number;
  user_id: number;
  description: string;
  time: string;
  url = 'assets/image/saber.jpg';

  // 标签，地点，主题等等

  constructor(u: string) {
    this.url = u;
  }
}

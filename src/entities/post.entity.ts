export class Post {
  id?: number;
  title: string;
  description: string;
  content: string;
  author: string;
  subject: string;
  modifiedDate: Date;
  createdDate: Date;

  constructor(post: Post) {
    this.id = post.id;
    this.title = post.title;
    this.description = post.description;
    this.content = post.content;
    this.author = post.author;
    this.subject = post.subject;
    this.modifiedDate = post.modifiedDate;
    this.createdDate = post.createdDate;
  }
}

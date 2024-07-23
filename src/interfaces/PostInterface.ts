import { RowDataPacket } from 'mysql2';

export interface Post extends RowDataPacket {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  subject: string;
  modifiedDate: Date;
  createdDate: Date;
}

export class Student {
  id?: number;
  username: string;
  email: string;
  cpf: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(student: Student) {
    this.id = student.id;
    this.username = student.username;
    this.email = student.email;
    this.cpf = student.cpf;
    this.createdAt = student.createdAt;
    this.updatedAt = student.updatedAt;
  }
}

"use strict";
// tạo contructor
class User {
  constructor(
    firstname,
    lastname,
    usename,
    password,
    pagesize = 10,
    category = "Business"
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = usename;
    this.password = password;
    this.pagesize = pagesize;
    this.category = category;
  }
}
// tạo class Todo Task
class Task {
  constructor(task, owner, isdone) {
    this.task = task;
    this.owner = owner;
    this.isdone = isdone;
  }
}

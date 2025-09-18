import React from "react";

// Base Person class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  displayInfo() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

// Student subclass
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  displayInfo() {
    return `${super.displayInfo()}, Grade: ${this.grade}`;
  }
}

// Teacher subclass
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  displayInfo() {
    return `${super.displayInfo()}, Subject: ${this.subject}`;
  }
}

function App() {
  // Create instances
  const student = new Student("Alice", 20, "A");
  const teacher = new Teacher("Mr. Smith", 40, "Mathematics");

  return (
    <div>
      <h2>Person Class Hierarchy Demo</h2>
      <p><strong>Student:</strong> {student.displayInfo()}</p>
      <p><strong>Teacher:</strong> {teacher.displayInfo()}</p>
    </div>
  );
}

export default App;
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

// React component to demonstrate usage
const StudentTeacherDemo = () => {
    const student = new Student("Alice", 16, "10th Grade");
    const teacher = new Teacher("Mr. Smith", 40, "Mathematics");

    return (
        <div>
            <h2>Person Class Hierarchy Demo</h2>
            <h3>Student Details</h3>
            <p>{student.displayInfo()}</p>
            <h3>Teacher Details</h3>
            <p>{teacher.displayInfo()}</p>
        </div>
    );
};

export default StudentTeacherDemo;
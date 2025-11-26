// key:value pairs
let student = {};
student = {
    name: "Marvin",
    birthYear: 2008,
    course: "Programming in JavaScript"
};

student.favoriteFood = "chicken pasta";
console.log('student --> ', student);

// new statement
let teacher = new Object({ssn:'451391235', favoriteFood: "chicken"});
teacher.name = "Walter";
// teacher.subjects = [
//     {
//         name: "SE Full Time",
//         schedule: 'Monday - Friday',
//         hours: '8:00 to 17:00 EST',
//         isActive: true,
//         isFullTime: true

//     },
//     {
//         name: "DA Part Time",
//         schedule: 'Monday - Friday',
//         hours: '13:00 to 17:00 EST',
//         isActive: false,
//         isFullTime: false

//     },
//     {
//         name: "DA Part Time",
//         schedule: 'Monday - Friday',
//         hours: '13:00 to 17:00 EST',
//         isActive: true,
//         isFullTime: false

//     }
// ];
// to add properties we use "<object>.<property>" dot notation
teacher.subjects = ['SE FT', 'BA PT'];
teacher.gender = "Male";

// bracket notation---> objectName["PropertyName"]
teacher["birthYear"] = 1987;
console.log('teacher --> ', teacher);

teacher.calculateSalary = function(totalSubjects) {
    const salaryPerSubject = 1000;
    return totalSubjects * salaryPerSubject;
}

// console.log(teacher.calculateSalary(teacher.subjects.length));



function calculateStudentAge(student) {
    let {birthYear} = student;
    return new Date().getFullYear() - birthYear;
}

console.log(`${student.name} is ${calculateStudentAge(student)} years old`);

// Computer Properties
let driverProperties = ["bloodType", "weigth", "driverLicenseType", "yearBirth"];
let driverPropertiesValues = ["A+", "195 lb", "A", 1975];

let driver = new Object();

for(let index = 0; index < driverProperties.length; index++) {
    driver[driverProperties[index]] = driverPropertiesValues[index];
}
console.log(driver);


// DELETE OPERATOR
// console.log(teacher);
// delete teacher.ssn;
// console.log(teacher);

// let teacher = new Object({ssn:'451391235', favoriteFood: "chicken"});
// teacher.name = "Walter";
// teacher.subjects = ['SE FT', 'BA PT'];
// teacher.gender = "Male";

// IN operator
console.log("subjects" in teacher);
console.log("subject" in teacher);


//hasOwnProperty(propertyName)
if(teacher.hasOwnProperty("ssn")) {
    console.log(`the ssn is ${teacher.ssn}`);
}

// Object.hasOwn(object, "propertyName")
// console.log( Object.hasOwn(teacher, "middleName"));
// console.log( Object.hasOwn(teacher, "gender"));

// console.log(teacher.hasOwnProperty("calculateSalary"));


// ITERATE OVER THE OBJECT PROPERTIES
// FOR (let iterator in ObjectName)

for(let property in teacher) {
    console.log(`${property} : ${teacher[property]}`);
}

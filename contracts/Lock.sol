// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract StudentContract {
    address admin;
    StudentData[] public students;
    TeacherData[] public teachers;
    Course[] public courses;
    mapping(uint256 => uint256) public studentPayments;
    struct StudentData {
        string name;
        string studentaddress;
        uint256 age;
        uint256 number;
        uint256 id;
        uint256[] courses;
        uint256[] grades;
        uint256[] attendance;
        bool feeStatus;
    }
    struct TeacherData {
        string name;
        string teacheraddress;
        uint256 age;
        uint256 number;
        uint256 id;
        uint256[] courses;
        uint256[] grades;
        uint256[] attendance;
        bool feeStatus;
    }
    struct Course {
        uint256 id;
        string name;
        uint256 fee;
    }
    uint256 public studentId;
    uint256 public teacherId;
    uint256 public courseId;
    event AddedTeacher(
        uint256 id,
        string name,
        string teacheraddress,
        uint256 age,
        uint256 number
    );
    event AddedStudent(
        uint256 id,
        string name,
        string studentaddress,
        uint256 age,
        uint256 number
    );
    event Success(string message);
    event Error(string message);

    constructor() public {
        admin = msg.sender;
    }

    function addCourse(string memory courseName, uint256 courseFee) public {
        // require(msg.sender == admin);
        uint256 existingId;
        for (uint256 i = 0; i < courses.length; i++) {
            if (
                keccak256(abi.encodePacked(courses[i].name)) ==
                keccak256(abi.encodePacked(courseName))
            ) {
                existingId = courses[i].id;
                require(
                    courses[i].fee != courseFee,
                    "you already have this course and if you want to update it's fees then change it's fees."
                );
                break;
            }
        }
        if (existingId != 0) {
            for (uint256 i = 0; i < courses.length; i++) {
                if (courses[i].id == existingId) {
                    courses[i].fee = courseFee;
                    return;
                }
            }
        } else {
            courseId++;
            Course memory course = Course({
                id: courseId,
                name: courseName,
                fee: courseFee
            });
            courses.push(course);
            emit Success("Course add successfully!");
        }
    }

    function addStudent(
        string memory studentName,
        string memory _studentAddress,
        uint256 studentAge,
        uint256 studentNumber
    ) public {
        bytes32 studentHash = keccak256(
            abi.encodePacked(
                studentName,
                _studentAddress,
                studentAge,
                studentNumber
            )
        );
        uint256 index = students.length;

        // Check if a student with the same name, address, age, and number already exists
        for (uint256 i = 0; i < index; i++) {
            if (
                keccak256(
                    abi.encodePacked(
                        students[i].name,
                        students[i].studentaddress,
                        students[i].age,
                        students[i].number
                    )
                ) == studentHash
            ) {
                emit Error(
                    "A student with the same name, address, age, and number already exists."
                );
                require(false);
            }
        }

        // Add the student to the students array
        studentId++;
        students.push(
            StudentData({
                id: studentId,
                name: studentName,
                studentaddress: _studentAddress,
                age: studentAge,
                number: studentNumber,
                courses: new uint256[](0),
                grades: new uint256[](0),
                attendance: new uint256[](0),
                feeStatus: false
            })
        );
        emit AddedStudent(
            studentId,
            studentName,
            _studentAddress,
            studentAge,
            studentNumber
        );
        emit Success("Student add successfully!");
    }

    function addTeacher(
        string memory teacherName,
        string memory _teacherAddress,
        uint256 teacherAge,
        uint256 teacherNumber
    ) public {
        bytes32 teacherHash = keccak256(
            abi.encodePacked(
                teacherName,
                _teacherAddress,
                teacherAge,
                teacherNumber
            )
        );
        uint256 index = teachers.length;

        // Check if a teacher with the same name, address, age, and number already exists
        for (uint256 i = 0; i < index; i++) {
            if (
                keccak256(
                    abi.encodePacked(
                        teachers[i].name,
                        teachers[i].teacheraddress,
                        teachers[i].age,
                        teachers[i].number
                    )
                ) == teacherHash
            ) {
                emit Error(
                    "A teacher with the same name, address, age, and number already exists."
                );
                require(
                    false,
                    "A teacher with the same name, address, age, and number already exists."
                );
            }
        }

        // Add the teacher to the teachers array
        teacherId++;
        teachers.push(
            TeacherData({
                id: teacherId,
                name: teacherName,
                teacheraddress: _teacherAddress,
                age: teacherAge,
                number: teacherNumber,
                courses: new uint256[](0),
                grades: new uint256[](0),
                attendance: new uint256[](0),
                feeStatus: false
            })
        );
        emit AddedTeacher(
            teacherId,
            teacherName,
            _teacherAddress,
            teacherAge,
            teacherNumber
        );
        emit Success("Teacher add successfully!");
    }

    function markTeacherAttendance(uint256 _teacherId, uint256 _attendance)
        public
    {
        bool teacherFound = false;
        for (uint256 i = 0; i < teachers.length; i++) {
            if (teachers[i].id == _teacherId) {
                // Check if the attendance has already been marked for the teacher
                require(
                    teachers[i].attendance.length == 0 ||
                        teachers[i].attendance[0] == 0
                );
                teachers[i].attendance.push(_attendance);
                teacherFound = true;
                break;
            }
        }
        // If teacher with the given ID is not found
        require(teacherFound, "Teacher with the given ID not found");
    }

    function assignCourseToStudent(uint256 _studentId, uint256 _courseId)
        public
    {
        uint256 studentIndex;
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                studentIndex = i;
                break;
            }
        }

        // Check if the course has already been assigned to the student
        for (uint256 j = 0; j < students[studentIndex].courses.length; j++) {
            if (students[studentIndex].courses[j] == _courseId) {
                require(false, "Course already assigned to this student");
            }
        }

        // Assign the course to the student
        students[studentIndex].courses.push(_courseId);
        students[studentIndex].grades.push(0);
        students[studentIndex].attendance.push(0);
        emit Success("Course assigned successfully");
    }

    function assignCourseToTeacher(uint256 _teacherId, uint256 _courseId)
        public
    {
        uint256 teacherIndex;
        for (uint256 i = 0; i < teachers.length; i++) {
            if (teachers[i].id == _teacherId) {
                teacherIndex = i;
                break;
            }
        }

        // Check if the course has already been assigned to the student
        for (uint256 j = 0; j < teachers[teacherIndex].courses.length; j++) {
            if (teachers[teacherIndex].courses[j] == _courseId) {
                require(false, "Course already assigned to this Teacher");
            }
        }

        // Assign the course to the student
        teachers[teacherIndex].courses.push(_courseId);
        teachers[teacherIndex].attendance.push(0);
        emit Success("Course assigned successfully");
    }

    function addGrades(
        uint256 _studentId,
        uint256 grade,
        uint256 courseIndex
    ) public {
        require(msg.sender == admin);
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                require(courseIndex < students[i].courses.length);
                students[i].grades[courseIndex] = grade;
            }
        }
    }

    function markStudentAttendance(uint256 _studentId, uint256 _attendance)
        public
    {
        bool studentFound = false;
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                // Check if the attendance has already been marked for the student
                require(
                    students[i].attendance.length == 0 ||
                        students[i].attendance[0] == 0
                );
                students[i].attendance.push(_attendance);
                studentFound = true;
                break;
            }
        }
        // If student with the given ID is not found
        require(studentFound, "Student with the given ID not found");
    }

    function getAllStudents() public view returns (StudentData[] memory) {
        return students;
    }

    function getAllTeachers() public view returns (TeacherData[] memory) {
        return teachers;
    }

    function getTeacher(uint256 _teacherId)
        public
        view
        returns (TeacherData memory)
    {
        for (uint256 i = 0; i < teachers.length; i++) {
            if (teachers[i].id == _teacherId) {
                TeacherData memory teacherData = TeacherData({
                    id: teachers[i].id,
                    name: teachers[i].name,
                    teacheraddress: teachers[i].teacheraddress,
                    age: teachers[i].age,
                    number: teachers[i].number,
                    courses: teachers[i].courses,
                    grades: teachers[i].grades,
                    attendance: teachers[i].attendance,
                    feeStatus: teachers[i].feeStatus
                });
                return (teacherData);
            }
        }
    }

    function getStudent(uint256 _studentId)
        public
        view
        returns (StudentData memory)
    {
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                StudentData memory studentData = StudentData({
                    id: students[i].id,
                    name: students[i].name,
                    studentaddress: students[i].studentaddress,
                    age: students[i].age,
                    number: students[i].number,
                    courses: students[i].courses,
                    grades: students[i].grades,
                    attendance: students[i].attendance,
                    feeStatus: students[i].feeStatus
                });
                return (studentData);
            }
        }
    }

    function getStudentAssignedCourses(uint256 _studentId)
        public
        view
        returns (uint256[] memory)
    {
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                return (students[i].courses);
            }
        }
    }

    function getTeacherAssignedCourses(uint256 _teacherId)
        public
        view
        returns (uint256[] memory)
    {
        for (uint256 i = 0; i < teachers.length; i++) {
            if (teachers[i].id == _teacherId) {
                return (teachers[i].courses);
            }
        }
    }

    function getAssignedCoursesWithGrades(uint256 _studentId)
        public
        view
        returns (uint256[] memory, uint256[] memory)
    {
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                return (students[i].courses, students[i].grades);
            }
        }
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function checkTotalFee(uint256 _studentId) public view returns (uint256) {
        uint256 totalFee = 0;
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                for (uint256 j = 0; j < students[i].courses.length; j++) {
                    totalFee += courses[i].fee;
                }
            }
        }
        return totalFee;
    }

    function payCoursesFees(uint256 _studentId) public payable {
        uint256 totalFee = 0;
        uint256 studentIndex;
        for (uint256 i = 0; i < students.length; i++) {
            if (students[i].id == _studentId) {
                studentIndex = i;
                break;
            }
        }

        // Calculate the total fee
        for (uint256 j = 0; j < students[studentIndex].courses.length; j++) {
            uint256 localCourseId = students[studentIndex].courses[j];
            for (uint256 k = 0; k < courses.length; k++) {
                if (courses[k].id == localCourseId) {
                    totalFee += courses[k].fee;
                    break;
                }
            }
        }
        require(msg.value == totalFee, "Incorrect fee amount");

        // Update fee status
        if (msg.value >= totalFee) {
            students[studentIndex].feeStatus = true;
            emit Success("Payment done successfully!");
        } else {
            students[studentIndex].feeStatus = false;
        }
    }

    function viewCourses() public view returns (Course[] memory) {
        return (courses);
    }

    function getStudentsByCourseId(uint256 courseId)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](students.length);
        uint256 count = 0;

        for (uint256 i = 0; i < students.length; i++) {
            for (uint256 j = 0; j < students[i].courses.length; j++) {
                if (students[i].courses[j] == courseId) {
                    result[count] = students[i].id;
                    count++;
                    break;
                }
            }
        }

        // Resize the result array to the number of students found
        assembly {
            mstore(result, count)
        }

        return result;
    }

    function getTeachersByCourseId(uint256 courseId)
        public
        view
        returns (uint256[] memory)
    {
        uint256[] memory result = new uint256[](teachers.length);
        uint256 count = 0;

        for (uint256 i = 0; i < teachers.length; i++) {
            for (uint256 j = 0; j < teachers[i].courses.length; j++) {
                if (teachers[i].courses[j] == courseId) {
                    result[count] = teachers[i].id;
                    count++;
                    break;
                }
            }
        }

        // Resize the result array to the number of teachers found
        assembly {
            mstore(result, count)
        }

        return result;
    }
}

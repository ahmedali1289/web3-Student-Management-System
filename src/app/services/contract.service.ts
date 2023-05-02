import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ethers } from 'ethers';
import { HelperService } from './helper.service';
import { LoaderService } from './loader.service';
import { UniversalService } from './universal.service';
import { ApiService } from '../services/api.service'
import { Subscription } from 'rxjs';
const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const ABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "studentaddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "AddedStudent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "teacheraddress",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			}
		],
		"name": "AddedTeacher",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "Error",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "message",
				"type": "string"
			}
		],
		"name": "Success",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "courseName",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "courseFee",
				"type": "uint256"
			}
		],
		"name": "addCourse",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "grade",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "courseIndex",
				"type": "uint256"
			}
		],
		"name": "addGrades",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "studentName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_studentAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "studentAge",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "studentNumber",
				"type": "uint256"
			}
		],
		"name": "addStudent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "teacherName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_teacherAddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "teacherAge",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "teacherNumber",
				"type": "uint256"
			}
		],
		"name": "addTeacher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "assignCourseToStudent",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_teacherId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_courseId",
				"type": "uint256"
			}
		],
		"name": "assignCourseToTeacher",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			}
		],
		"name": "checkTotalFee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "courseId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "courses",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllStudents",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentaddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "courses",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "grades",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "attendance",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "feeStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StudentContract.StudentData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllTeachers",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "teacheraddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "courses",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "grades",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "attendance",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "feeStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StudentContract.TeacherData[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			}
		],
		"name": "getAssignedCoursesWithGrades",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			}
		],
		"name": "getStudent",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "studentaddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "courses",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "grades",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "attendance",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "feeStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StudentContract.StudentData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			}
		],
		"name": "getStudentAssignedCourses",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			}
		],
		"name": "getStudentsByCourseId",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_teacherId",
				"type": "uint256"
			}
		],
		"name": "getTeacher",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "teacheraddress",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "age",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "number",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "uint256[]",
						"name": "courses",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "grades",
						"type": "uint256[]"
					},
					{
						"internalType": "uint256[]",
						"name": "attendance",
						"type": "uint256[]"
					},
					{
						"internalType": "bool",
						"name": "feeStatus",
						"type": "bool"
					}
				],
				"internalType": "struct StudentContract.TeacherData",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_teacherId",
				"type": "uint256"
			}
		],
		"name": "getTeacherAssignedCourses",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "courseId",
				"type": "uint256"
			}
		],
		"name": "getTeachersByCourseId",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_attendance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "courseIndex",
				"type": "uint256"
			}
		],
		"name": "markAttendance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_studentId",
				"type": "uint256"
			}
		],
		"name": "payCoursesFees",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "studentId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "studentPayments",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "students",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "studentaddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "feeStatus",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "teacherId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "teachers",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "teacheraddress",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "age",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "number",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "feeStatus",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewCourses",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "fee",
						"type": "uint256"
					}
				],
				"internalType": "struct StudentContract.Course[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
declare let window: any;
@Injectable({
	providedIn: 'root'
})
export class ContractService {
	private subscription!: Subscription;
	constructor(private router: Router, private helper: HelperService, private modalService: NgbModal, private http: ApiService) { }

	ngOnDestroy() {
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	async connectWallet() {
		if (window.ethereum) {
			try {
				const accounts = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				if (accounts) {
					console.log(accounts);
					// this.addStudent()
					// this.getStudents()
				} else {
					console.log("connect metamask Account");
				}
			} catch (error) {
				console.log(error);
			}
		}
	};
	async getCourses() {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const courses = await result['viewCourses']()
			console.log(courses);

			return courses;
		} catch (error: any) {
			console.log("Error calling contract function:", error);
			console.log(this.helper.extractErrorMessage(error?.message))

		}
	}
	async getStudentAssignedCourses(_studentId: number) {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const courses = await result['getStudentAssignedCourses'](_studentId)
			console.log(courses);
			return courses;
		} catch (error: any) {
			console.log("Error calling contract function:", error);
			console.log(this.helper.extractErrorMessage(error?.message))

		}
	}
	async getTeacherAssignedCourses(_studentId: number) {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const courses = await result['getTeacherAssignedCourses'](_studentId)
			console.log(courses);
			return courses;
		} catch (error: any) {
			console.log("Error calling contract function:", error);
			console.log(this.helper.extractErrorMessage(error?.message))

		}
	}
  async getStudentsByCourseId(_courseId: number) {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const courses = await result['getStudentsByCourseId'](_courseId)
			console.log(courses);
			return courses;
		} catch (error: any) {
			console.log("Error calling contract function:", error);
			console.log(this.helper.extractErrorMessage(error?.message))

		}
	}
	async addCourse(data: any) {
		LoaderService.loader.next(true)
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const courses = await result['addCourse'](data?.courseName, data?.courseFee)
			await courses.wait();
			console.log(courses);
			this.router.navigateByUrl('dashboard/courses')
			await UniversalService.header.next("Courses")
			await UniversalService.AddCourse.next(true)
			await LoaderService.loader.next(false)
			await this.helper.showSuccess("Course added successfully")
		} catch (error: any) {
			LoaderService.loader.next(false)
			if (this.helper.extractErrorMessage(error?.message)) {
				this.helper.showError(this.helper.extractErrorMessage(error?.message))
			}
		}
	}
	async getStudents() {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const studetns = await result['getAllStudents']()
			return studetns;
		} catch (error: any) {
			console.log("Error calling contract function:", error);
			console.log(this.helper.extractErrorMessage(error?.message))

		}
	}
	async getTeachers() {
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const teachers = await result['getAllTeachers']()
			return teachers;
		} catch (error: any) {
			console.log("Error calling contract function:", error);
			console.log(this.helper.extractErrorMessage(error?.message))

		}
	}
	async addStudent(name: string, email:string, address: string, age: number, number: number) {
		LoaderService.loader.next(true);
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const students = await result['addStudent'](name, address, age, number);
			const student = await students.wait();
			const { id, message } = student.events?.reduce(
				(acc: any, event: any) => ({
					id: event.args?.id?.toNumber() ?? acc.id,
					message: event.args?.message ?? acc.message
				}),
				{}
			);
			const firstName = name?.split(' ')?.[0]?.toLowerCase() ?? name?.toLowerCase();
			await this.http
				.postMethod(
					`http://localhost:3000/api/auth/signup?name=${firstName}&email=${email}&role=student&id=${id}`,
					{},
					true
				)
				.subscribe((res) => {
					console.log(res);
				}, (err) => {
					console.log(err);
				});
			await UniversalService.header.next('Students');
			await UniversalService.AddStudent.next(true);
			await this.helper.showSuccess(message);
		} catch (error: any) {
			if (this.helper.extractErrorMessage(error?.message)) {
				this.helper.showError(this.helper.extractErrorMessage(error?.message));
			}
		} finally {
			await LoaderService.loader.next(false);
			this.router.navigateByUrl('dashboard/students');
		}
	}
	async addTeacher(name: string, address: string, age: number, number: number) {
		LoaderService.loader.next(true)
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const teachers = await result['addTeacher'](name, address, age, number)
			const teacher = await teachers.wait();
			const id = teacher?.events?.[0]?.args?.id?.toNumber()
			const message = teacher?.events?.[1]?.args?.message
			console.log(teacher)
			this.router.navigateByUrl('dashboard/teachers')
			this.subscription = await this.http.postMethod(`http://localhost:3000/api/auth/signup?email=${name.split(' ')[0]?.toLowerCase()}@sms.com&role=teacher&id=${id}`, {}, true).subscribe(res => {
				console.log(res);
			}, err => {
				console.log(err);
			})
			await UniversalService.header.next("Teachers")
			await UniversalService.AddTeachers.next(true)
			await LoaderService.loader.next(false)
			await this.helper.showSuccess(message)
		} catch (error: any) {
			LoaderService.loader.next(false)
			if (this.helper.extractErrorMessage(error?.message)) {
				this.helper.showError(this.helper.extractErrorMessage(error?.message))
			}
		}
	}
	async assignCourseStudent(id: number, courseId: number) {
		LoaderService.loader.next(true)
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const students = await result['assignCourseToStudent'](id, courseId)
			students.wait();
			await this.modalService.dismissAll()
			await LoaderService.loader.next(false)
			await this.helper.showSuccess("Course assigned successfully")
		} catch (error: any) {
			LoaderService.loader.next(false)
			if (this.helper.extractErrorMessage(error?.message)) {
				this.helper.showError(this.helper.extractErrorMessage(error?.message))
			}
		}
	}
	async assignCourseTeacher(id: number, courseId: number) {
		LoaderService.loader.next(true)
		try {
			const provider = new ethers.providers.Web3Provider(window.ethereum);
			const signer = provider.getSigner();
			const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
			const result = await contract;
			const teachers = await result['assignCourseToTeacher'](id, courseId)
			teachers.wait();
			await this.modalService.dismissAll()
			await LoaderService.loader.next(false)
			await this.helper.showSuccess("Course assigned successfully")
		} catch (error: any) {
			LoaderService.loader.next(false)
			if (this.helper.extractErrorMessage(error?.message)) {
				this.helper.showError(this.helper.extractErrorMessage(error?.message))
			}
		}
	}
}

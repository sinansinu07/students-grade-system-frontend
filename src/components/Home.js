import axios from "axios"
import { useEffect, useState } from "react"
import {Button} from "reactstrap"
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import SubjectForm from "./SubjectFrom";
import StudentForm from "./StudentForm";

export default function Home() {

    const [ subjects, setSubjects ] = useState([])
    const [ students, setStudents ] = useState([])
    const [ search, setSearch ] = useState("")
    const [ sortBy, setSortBy ] = useState("")
    const [ order, setOrder ] = useState("")

    const [ modal1, setModal1 ] = useState(false)
    const [ modal2, setModal2 ] = useState(false)

    const toggle1 = () => {
        setModal1(!modal1)
    }

    const toggle2 = () => {
        setModal2(!modal2)
    }

    useEffect( () => {
        ( async () => {
            try {
                const subjectResponse = await axios.get("http://localhost:5001/api/subjects")
                setSubjects(subjectResponse.data)
                const studentsResponse = await axios.get(`http://localhost:5001/api/students?sortBy=${sortBy}&order=${order}&search=${search}`)
                setStudents(studentsResponse.data)
            } catch(err) {
                console.error(err)
                alert(err.message)
            }
        }) ()
    }, [sortBy, order, search])

    // console.log(subjects, students)

    const addSubject = (subject) => {
        setSubjects([...subjects, subject])
        toggle1()
    }

    const handleDeleteSubject = async (id) => {
        const confirmation = window.confirm("Are  you sure to delete this Subject?")
        if(confirmation) {
          try {
            await axios.delete(`http://localhost:5001/api/subjects/${id}`)
            removeSubject(id)
          } catch(err) {
            alert(err.message)
          }
        }
    }

    const removeSubject = (id) => {
        const newSubjects = subjects.filter(subject => subject._id !== id)
        // console.log(newSubjects)
        setSubjects(newSubjects)
    }

    const addStudent = (student) => {
        setStudents([...students, student])
        toggle2()
    }

    const handleDeleteStudent = async (id) => {
        const confirmation = window.confirm("Are  you sure to delete the details of the Student?")
        if(confirmation) {
          try {
            await axios.delete(`http://localhost:5001/api/students/${id}`)
            removeStudent(id)
          } catch(err) {
            alert(err.message)
          }
        }
    }

    const removeStudent = (id) => {
        const newStudent = students.filter(student => student._id !== id)
        // console.log(newStudent)
        setStudents(newStudent)
    }

    console.log(search, sortBy, order)
    return (
        <div>
            <h1>Student Grading System</h1><hr/>
            <h2>Subjects: {subjects.length}</h2>
            {subjects.length !== 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>SI NO.</th>
                            <th>Subjects</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subjects.map((ele, i) => {
                            return (
                                <tr key={ele._id}>
                                    <td>{i + 1}</td>
                                    <td>{ele.name}</td>
                                    <Button 
                                        style={{marginTop : "5px"}}
                                        onClick={() => {
                                            handleDeleteSubject(ele._id)
                                    }}>Remove</Button>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No subjects available, Add a new Subject</p>
            )}
            
            <Button onClick={() => {
                setModal1(!modal1)
            }}>Add new Subject</Button>

            <Modal isOpen={modal1} toggle={toggle1}>
                        <ModalHeader toggle={toggle1}>Add Subject</ModalHeader>
                        <ModalBody>
                            <SubjectForm  toggle={toggle1} addSubject = {addSubject}/>
                        </ModalBody>
            </Modal>
            <hr/>
            <h2>Total Students : {students.length}</h2>
            <div className="d-flex justify-content-between px-4 m-0">
                <input
                    style={{
                    marginBottom: "10px",
                    width: "20%",
                    }}
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="search"
                    name="search"
                    className="form-control"
                />
                <div className="d-flex justify-content-end">
                    <select
                        className="form-select"
                        style={{
                            marginRight: "10px",
                            marginBottom: "10px",
                            width: "30%",
                        }}
                            value={sortBy}
                            onChange={(e)=> setSortBy(e.target.value)}
                            id="sortBy"
                        >
                            <option value="">Sort By</option>
                            <option value="name">Name</option>
                            <option value="subject">Subject</option>
                            <option value="grade">Grade</option>
                            <option value="remarks">Remarks</option>
                    </select>
                    <select
                        className="form-select"
                        style={{
                            marginRight: "190px",
                            marginBottom: "10px",
                            width: "30%",
                        }}
                            value={order}
                            onChange={(e)=> setOrder(e.target.value)}
                            id="order"
                        >
                            <option value="">Order</option>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                    </select>
                </div>
            </div>
            {students.length !== 0 ? (
                <div>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>SI NO.</th>
                                <th>Name</th>
                                <th>Subject</th>
                                <th>Grade</th>
                                <th>Remarks</th>
        
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((ele, i) => {
                                return (
                                    <tr key={ele._id}>
                                        <td>{i + 1}</td>
                                        <td>{ele.name}</td>
                                        <td>{ele.subject?.name}</td>
                                        <td>{ele.grade}</td>
                                        <td>{ele.remarks}</td>
                                        <Button
                                            style={{marginTop : "5px"}}
                                            onClick={() => {
                                                handleDeleteStudent(ele._id)
                                        }}>Remove</Button>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No students details available, Add a new Student</p>
            )}

            <Button onClick={() => {
                setModal2(!modal2)
            }}>Add new Student Details</Button>
            <Modal isOpen={modal2} toggle={toggle2}>
                        <ModalHeader toggle={toggle2}>Add Subject</ModalHeader>
                        <ModalBody>
                            <StudentForm  toggle={toggle2} subjects = {subjects} addStudent = {addStudent}/>
                        </ModalBody>
            </Modal>
        </div>
    )
}
import axios from "axios"
import { useState } from "react"

export default function StudentForm(props) {
    const {subjects, addStudent} = props

    const [name, setName] = useState("")
    const [subject, setSubject] = useState("")
    const [grade, setGrade] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = {
            name,
            subject,
            grade
        }

        try {
            const response = await axios.post('https://students-grade-system-backend.onrender.com/api/students', form)
            // console.log(response.data)
            addStudent(response.data)
        } catch(err) {
            alert(err.message)
            console.log(err)
        }
    }
    // console.log(subjects)
    return (
        <div>
            <form>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="name"
                    >Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="name"
                        name="name"
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label 
                        htmlFor="categoryId"
                        className="form-label"
                    >Subject</label>
                    <select
                    className="form-select"
                        value={subject}
                        onChange={(e)=> {setSubject(e.target.value)}}
                        id="subject"
                    >
                        <option value="">Select Subject</option>
                        {subjects?.map((ele) => {
                            return <option 
                                        key={ele._id}
                                        value={ele._id}
                                    >{ele.name}</option>
                        })}
                    </select>
                </div>
                <div className="form-group">
                    <label 
                        className="form-label"
                        htmlFor="grade"
                    >Grade</label>
                    <input
                        type="text"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                        id="grade"
                        name="grade"
                        className="form-control"
                    />
                </div>
                <input type="submit" onClick={handleSubmit} className="button-style btn btn-primary" style={{marginTop : "10px"}}/>
            </form>
        </div>
    )
}
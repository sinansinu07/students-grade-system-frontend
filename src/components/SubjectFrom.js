import axios from "axios"
import { useState } from "react"
import { render, localhost } from "./api"

export default function SubjectForm(props) {
    const {addSubject} = props
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(`${render}/api/subjects`, { name })
            console.log(response.data)
            addSubject(response.data)
        } catch(err) {
            alert(err.message)
        }
    }
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
                <input type="submit" onClick={handleSubmit} className="button-style btn btn-primary" style={{marginTop : "10px"}}/>
            </form>
        </div>
    )
}
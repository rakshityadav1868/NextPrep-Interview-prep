import { useState } from 'react'
import axios from "axios"

function App() {
  const [jobsDesc, setJobDesc] = useState("")
  const [skills, setSkills] = useState([])
  const [questions, setQuestion] = useState([])


  const analzye = async () => {
    const formdata = new FormData()       // formdata ek dabba hai jisme data pack kr lia orr usme apne ne jobdesc daal diya and phr fast api ko bheja
    formdata.append("job_desc", jobsDesc)

    const response = await axios.post("http://localhost:8000/analyze", formdata)
    setSkills(response.data.skills)
    setQuestion(response.data.question)
  }
  return (
    <div>
      <h1>NextPrep</h1>

      <textarea
        placeholder='Paste Job description here'
        rows="10"
        onChange={(e) => setJobDesc(e.target.value)}
      />
      <button onClick={analzye}>Analyze</button>

      {skills.length > 0 && (
        <div>
          <h2>Extracted Skills</h2>
          <table>
            <tr><th>skills</th><th>Category</th></tr>
            {skills.map((skill) => (
              <tr key={skill.skill}>
                <td>{skill.skill}</td>
                <td>{skill.category}</td>
              </tr>
            ))}
          </table>

        </div>
      )}
      {questions.length > 0 && (
        <div>
          <h2>Interview Question</h2>
          {questions.map((q) => (
            <div key={q.question}>
              <p>{q.question}</p>
              <span>{q.difficulty}</span>
              <span>{q.category}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
export default App
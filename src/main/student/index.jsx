import {
  Form,
  redirect,
  useLoaderData,
} from "react-router-dom";
import {
  backend,
} from "../../env"
import {
  authFetch,
  withAuth,
} from "../../request"

export const loader = withAuth(async ({ request, params }) => {
  const response = await authFetch(backend.students, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const students = await response.json()
  return { students: Array.from(students) }
})

export function StudentList() {
  const { students } = useLoaderData();
  let studentArea
  if (students.length === 0) {
    studentArea = <p>No student.</p>
  } else {
    studentArea = <ul>
      {
        students.map(student => <Row key={student._id} student={student} />)
      }
    </ul>
  }
  return (
    <div>
      {studentArea}
    </div>
  )
}

function Row(props) {
  const { student } = props
  return (
    <div>
      <a>{student.name}</a>
    </div>
  )
}
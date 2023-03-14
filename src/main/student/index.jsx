import React, { useContext } from "react"
import {
  Form,
  redirect,
  useLoaderData,
} from "react-router-dom";

import Typography from '@mui/material/Typography';
import {
  backend, i18n,
} from "../../env"
import {
  authFetch,
  withAuth,
} from "../../request"
import { ResponsiveAppBar } from "../dashboard"
export const loader = withAuth(async ({ request, params }) => {
  const response = await authFetch(backend.students, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // TODO: Test visual effects
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const students = await response.json()
  return { students: Array.from(students) }
})

export function StudentPanel() {
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
    <>
      <ResponsiveAppBar>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {i18n.get("students.title")}
        </Typography>
      </ResponsiveAppBar>
      <StudentGrid data={students} />
    </>
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

import { useTable } from 'react-table'

const studentGridColumn = [
  {
    Header: i18n.get("student.studentId"),
    accessor: 'studentId'
  },
  {
    Header: i18n.get("student.name"),
    accessor: 'name'
  },
  {
    Header: i18n.get("student.college"),
    accessor: 'college'
  },
  {
    Header: i18n.get("student.point"),
    accessor: 'point'
  },
]

function StudentGrid(props) {
  const data = props.data
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns: studentGridColumn, data })

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
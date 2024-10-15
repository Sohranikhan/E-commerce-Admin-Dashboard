"use client"
const DateFormate = ({date}) => {
const newDate = new Date(date).toLocaleString()
  return (
    <td>{newDate}</td>
  )
}

export default DateFormate
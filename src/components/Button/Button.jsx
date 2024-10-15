"use client"
const Button = ({text, loading, handler, className}) => {
  return (
    <button onClick={handler ? handler : ()=> null } disabled={loading? loading: false} className={`btn ${className ? className : ''}`}>{text}</button>
  )
}

export default Button
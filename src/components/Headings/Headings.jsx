const Headings = ({title, des}) => {
  return (
    <div className="flex flex-col gap-y-2 m-3">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-base">{des}</p>
    </div>
  )
}

export default Headings
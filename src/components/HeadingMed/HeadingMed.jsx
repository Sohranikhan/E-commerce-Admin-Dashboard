
const HeadingMed = ({title, des}) => {
    return (
      <div className="flex flex-col gap-y-2 m-3">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="text-base">{des}</p>
      </div>
    )
  }
  
  export default HeadingMed
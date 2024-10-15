import Link from "next/link"

const LinkComp = ({text, url, className}) => {
  return (
<Link href={url} className={`${className} bg-primary`}
>{text}</Link>
)
}

export default LinkComp
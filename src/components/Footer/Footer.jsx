
const Footer = () => {
  return (
    <footer className="w-full flex items-center justify-center footer bg-base-200 text-base-content pl-10">
  <form className="w-full flex flex-col items-center justify-center p-3">
    <h3 className="w-full overflow-hidden footer-title text-center">Join Our Newsletter</h3> 
    <fieldset className="form-control">
      <label className="label">
        <span className="label-text">Enter your email address</span>
      </label> 
      <div className="join w-full">
        <input type="text" placeholder="username@site.com" className="input w-[60%] md:w-auto input-bordered join-item overflow-hidden" /> 
        <button className="btn btn-primary join-item px-1 w-fit">Subscribe</button>
      </div>
    </fieldset>
  </form>
</footer>
  )
}

export default Footer
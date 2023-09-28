function Login() {
  return (
    <div className="left-0 flex justify-center items-center bg-[#00000062] top-0 fixed w-screen h-screen z-20">
      <div className="w-[400px] space-y-[15px] pb-[70px] text-start flex flex-col rounded-lg p-8 bg-white h-fit">
        <p className="text-3xl font-[800]">
          <span className="text-[#fec000]">Log in to</span> typing.works
        </p>
        <p className="tetx">
          Try using more features for typing <br />
          after log in.
        </p>
        <input
          type="text"
          className="border p-3 rounded-lg"
          placeholder="Email address"
        />
        <button className="text-center p-3 rounded-lg text-white font-[500] bg-[#fec000]">
          Continue
        </button>
        <button className="text-start">Forgot password?</button>
        <button className="text-start">
          Not a member? <span>Sign up</span> now
        </button>
      </div>
    </div>
  )
}

export default Login

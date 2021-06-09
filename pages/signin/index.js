import Head from "next/head";
import Link from 'next/link'
export default function Signin() {
  return (
    <div>
      <Head>
        <title>Sig in pages</title>
      </Head>
      <form className="mx-auto my-4" style={{ maxWidth: "500px" }}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
        <p className="my-2">
          You dont't have an account?
          <Link href="/register">
            <a className="mx-1" style={{color:'blue',}}>Register</a>
          </Link>
        </p>
      </form>
    </div>
  );
}

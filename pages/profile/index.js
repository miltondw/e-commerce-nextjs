import Head from "next/head";
import Image from "next/image";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/GlobalState";
import valid from "../../utils/valid";
import { patchData } from "../../utils/fetchData";
export default function Profile() {
  const initialState = {
    avatar: "",
    name: "",
    password: "",
    cf_password: "",
  };
  const [data, setData] = useState(initialState);
  const { avatar, name, password, cf_password } = data;

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    if (auth.user) setData({ ...data, name: auth.user.name });
  }, [auth.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password) {
      const errMsg = valid(name, auth.user.email, password, cf_password);
      if (errMsg)
        return dispatch({ type: "NOTIFY", payload: { error: errMsg } });
      updatePassword();
    }
  };
  const updatePassword = () => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });
    patchData("user/resetPassword", { password }, auth.token).then((res) => {
      if (res.err)
        return dispatch({ type: "NOTIFY", payload: { error: res.err } });
      return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
    });
    setData({ ...data, password: "", cf_password: "" });
  };
  if (!auth.user) return null;
  return (
    <div className="profile_page">
      <Head>
        <title>Profile</title>
      </Head>
      <section className="row text-secondary my3">
        <div className="col-md-4">
          <h3 className="text-center text-uppercase">
            {auth.user.role === "user" ? "User Profile" : "Admin Profile"}
          </h3>
          <div className="avatar">
            <Image
              src={auth.user.avatar}
              alt={auth.user.name}
              width={150}
              height={150}
            />

            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input type="file" name="file" id="file_up" />
            </span>
          </div>

          <div className="form-group">
            <label htmlFor="name">
              Name
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Your name"
                className="form-control"
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                defaultValue={auth.user.email}
                disabled={true}
                className="form-control"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="password">
              New Password
              <input
                type="password"
                name="password"
                placeholder="New password"
                className="form-control"
                value={password}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="cf_password">
              Confirm New Password
              <input
                type="password"
                name="cf_password"
                placeholder="Confirm password"
                className="form-control"
                value={cf_password}
                onChange={handleChange}
              />
            </label>
          </div>
          <button className="btn btn-info mt-2 " onClick={handleUpdateProfile}>
            Update
          </button>
        </div>

        <div className="col-md-8">
          <h3>Orders</h3>
        </div>
      </section>
    </div>
  );
}

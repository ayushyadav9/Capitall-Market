import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../utils/api";
import { toast } from "react-toastify";

const Register = () => {
  let navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState({
    email: "",
    password: "",
    name: "",
  });
  const handelRegister = (e) => {
    e.preventDefault();
    setisLoading(true);
    fetch(baseURL + "/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .then((data, err) => {
        setisLoading(false);
        if (!data.success) {
          toast.info(data.message);
          return;
        }
        localStorage.setItem("userJWT", data.data.token);
        toast.success("User Registered Successfuly");
        navigate("/");
      });
  };
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl text-[#002D74]">Create an Account</h2>

          <form action="" className="flex flex-col gap-4">
            <input
              className="p-2 mt-8 rounded-xl border w-full"
              onChange={(e) => setdata({ ...data, name: e.target.value })}
              value={data.name}
              type="text"
              name="name"
              placeholder="Name"
            />
            <input
              className="p-2 rounded-xl border"
              onChange={(e) => setdata({ ...data, email: e.target.value })}
              value={data.email}
              type="email"
              name="email"
              placeholder="Email"
            />
            <input
              className="p-2 rounded-xl border w-full"
              onChange={(e) => setdata({ ...data, password: e.target.value })}
              value={data.password}
              type="password"
              name="password"
              placeholder="Password"
            />
            <button
              onClick={handelRegister}
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Register"}
            </button>
          </form>
          <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74]"></div>

          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link
              to="/signin"
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"
            >
              Login
            </Link>
          </div>
        </div>

        <div className="md:block hidden w-1/2">
          <img
            className="rounded-2xl"
            alt=""
            src="https://images.unsplash.com/photo-1642543348739-f233f8f93793?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
          />
        </div>
      </div>
    </section>
  );
};

export default Register;

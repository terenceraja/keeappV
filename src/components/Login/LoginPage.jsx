import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Button } from "primereact/button";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      id="mainContainer"
      className="grow flex justify-center items-center bg-[#1b3a48]"
    >
      <div
        id="loginCard"
        className="bg-white  h-[600px]  sm:w-[400px] p-15 bg-white rounded-lg drop-shadow-lg"
      >
        <div className=" flex flex-col  justify-center gap-5 items-center h-[600px]  sm:w-[400px] p-15 bg-white rounded-lg drop-shadow-lg">
          <div className="flex flex-col items-center">
            <img
              src="https://ucarecdn.com/149afb0a-b8c2-4c32-bc6a-6a80628e4506/"
              className="mr-3 h-14"
              alt="Logo"
            />

            <h4 className="">Please sign-in to your account</h4>
            <Divider className="border-2" />
          </div>

          <div id="formContainer" className="flex flex-col gap-10">
            <span className="p-float-label">
              <InputText
                id="Login"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
              <label htmlFor="username">Login</label>
            </span>

            <span className="p-float-label">
              <InputText
                type="password"
                id="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="username">Password</label>
            </span>
            <Link to="/Chart">
              <Button className="w-full" label="Login" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

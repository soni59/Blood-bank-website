import { message } from "antd";
import React, { useEffect } from "react";
import { GetCurrentUser } from "../apicalls/Users";
import { Navigate, useNavigate } from "react-router-dom";
import { getLoggedInUserName } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { SetCurrentUser } from "../redux/usersSlice";
import bg from "./Images/bg2.jpg";

const ProtectedPage = ({ childern }) => {
  // const [currentUser, setCurrentUser] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        message.success(response.message);
        // setCurrentUser(response.data)
        dispatch(SetCurrentUser(response.data));
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);
  console.log(currentUser)
  return (
    currentUser && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-primary text-white px-5 py-3">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-2xl">Blood-Bank</h1>
            <span className="text-md">
              {currentUser.userType}
              {/* {currentUser.userType} */}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <i class="ri-shield-user-line"></i>
            <div className="flex flex-col">
              <span
                className="mr-5 text-xl cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {getLoggedInUserName(currentUser)}
              </span>
            </div>

            <i
              className="ri-logout-circle-r-line ml-5 cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
          </div>
        </div>

        <img src={bg} alt="bg" height="500px" width="100%"></img>
        <p className="text-xl underline font-bold text-primary text-center mt-5 mb-5">
          Blood Donation Process
        </p>
        <div className="grid grid-cols-1 grid-rows-1 md:grid-cols-4">
          <div className="mr-2 block rounded-lg bg-white  dark:bg-neutral-700">
            <div className="p-4">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Registration
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                We will ask you for your Mobile number and email id. You will
                read some information about donating blood
              </p>
            </div>
          </div>
          <div className="block rounded-lg bg-white  dark:bg-neutral-700">
            <div className="p-4">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Health History
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                You will answer a few questions about your health history and
                tell us about any prescription .We will check your temperature,
                pulse, blood pressure and hemoglobin level.
              </p>
            </div>
          </div>
          <div className="block rounded-lg bg-white  dark:bg-neutral-700">
            <div className="p-4">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Your Donation
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                If you're donating whole blood, we'll cleanse an area on your
                arm and insert a brand new sterile needle for the blood draw. A
                whole blood donation takes about 8-10 minutes, during which
                you'll be seated comfortably or lying down.
              </p>
            </div>
          </div>
          <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="p-4">
              <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Refreshment and Recovery
              </h5>
              <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                After donating blood, you'll have a snack and something to drink
                in the refreshment area. You'll leave after 10-15 minutes and
                continue your normal routine.
              </p>
            </div>
          </div>
        </div>

        {/* body */}
        {/* <h1> Welcome {getLoggedInUserName(currentUser)} </h1> */}
        <div className="p-5">{childern}</div>

        {/* footer */}

        <footer className=" bg-primary text-white px-3 py-1 text-center ">
          <div className="p-4 text-center bg-primary text-white">
            © 2023 Copyright : Blood_Bank
          </div>
        </footer>
      </div>
    )
  );
};

export default ProtectedPage;

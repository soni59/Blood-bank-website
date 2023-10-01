import { Button, Form, Input, Radio , message} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/Users";

const Login = () => {
  const [type, setType] = useState("donar");
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try{           
      const response = await LoginUser({
        ...values,
        userType : type,
      })
      if(response.success){
        message.success(response.message)
        localStorage.setItem('token',response.data)
        navigate('/')
      }else{
          throw new Error(response.message)
      }

      }catch(error){
        message.error(error.message)
      }
  };

  useEffect(()=>{
    if(localStorage.getItem("token")){
      navigate("/")
    }
  },[])

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow grid  p-5 gap-6 w-1/3"
        onFinish={onFinish}
      >
        <h1 className="uppercase text-2xl">
          <span className="text-primary">
            {type.toUpperCase()} - LOGIN
          </span>
          <hr />
        </h1>
        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
        >
          <Radio value="donar"> Donor </Radio>
          <Radio value="hospital"> hospital </Radio>
          <Radio value="organization"> organization </Radio>
        </Radio.Group>{" "}

        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" />
        </Form.Item>

        <Button
          type="primary"
          block
          className="text-xl"
          htmlType="submit"
        >
          Login
        </Button>
        <Link to="/register" className="text-center text-gray-700">
          Don't have an account ? Register Here
        </Link>
      </Form>
    </div>
  );
};

export default Login;

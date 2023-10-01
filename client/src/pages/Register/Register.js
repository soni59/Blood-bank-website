import { Button, Form, Input, Radio, message } from "antd";
import React, { useState ,useEffect } from "react";
import {Navigate, Link, useNavigate } from "react-router-dom";
import OrgHospitalform from "./OrgHospitalform";
import { RegisterUser } from "../../apicalls/Users";

const Register = () => {

    const [type , setType] = useState('donar')
    const navigate = useNavigate()

    const onFinish = async (values) =>{
        try{
            
        const response = await RegisterUser({
            ...values,
            userType : type,
        })
        if(response.success){
            message.success(response.message)
            navigate("/login");
        }else{
            throw new Error(response.message)
        }

        }catch(error){
            message.error(error.message)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("token")){
          navigate("/")
        }
    },[])

  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form layout="vertical" className="bg-white rounded shadow grid grid-cols-2 p-5 gap-6 w-1/2" onFinish={onFinish}>
        <h1 className="col-span-2 uppercase text-2xl">
            <span className="text-primary">
                {type.toUpperCase ()} - Registration
            </span><hr/>
        </h1>
        
        <Radio.Group onChange={(e)=> setType(e.target.value)} value={type} className="col-span-2">
            <Radio value='donar'> Donor </Radio>
            <Radio value='hospital'> hospital </Radio>
            <Radio value='organization'> organization </Radio>
        </Radio.Group>

            {(type === 'donar') && (
                <>
                    {' '}
                    <Form.Item label='Name' name='name'>
                    <Input/>
                    </Form.Item>
                    <Form.Item label='Email' name='email'>
                        <Input/>
                    </Form.Item>
                    <Form.Item label='Password' name='password'>
                        <Input type="password"/>
                    </Form.Item>
                    <Form.Item label='Phone' name='phone'>
                        <Input/>
                    </Form.Item>
                </>
            )}

        

            {(type === 'organization' || type === 'hospital') && <OrgHospitalform type={type}/>}

        <Button type="primary" block className="col-span-2 text-xl" htmlType="submit">
            Register</Button>
        <Link to='/login' className="col-span-2 text-center text-gray-700">Already have an account ? Login Here</Link>
      </Form>
    </div>
  );
};

export default Register;

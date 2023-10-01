import {  Form, Input} from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const OrgHospitalform = ({ type }) => {
  return (
    <>
      <Form.Item
        label={type === "hospital" ? "Hospital Name" : "Organization Name"}
        name={type === "hospital" ? "hospitalName" : "organisationName"}
      >
        <Input></Input>
      </Form.Item>
      <Form.Item label="Owner" name='owner'>
        <Input />
      </Form.Item>
      <Form.Item label="Email" name='email'>
        <Input />
      </Form.Item>
      <Form.Item label="Password" name='password'>
        <Input type="password" />
      </Form.Item>
      <Form.Item label="Phone" name='phone'>
        <Input />
      </Form.Item>
      <Form.Item label="Website" name='website'>
        <Input />
      </Form.Item>
      <Form.Item label="Address" name='address' className="col-span-2">
        <TextArea></TextArea>
      </Form.Item>
    </>
  );
};

export default OrgHospitalform;

import { Form, Radio, Input ,message } from "antd";
import Modal from "antd/es/modal/Modal";
import { React, useState } from "react";
import { getAntdInputValidation } from "../../../utils/helpers";
import { useSelector  } from "react-redux";
import { AddInventory } from "../../../apicalls/inventory";

const InventoryForm = ({ open, setOpen, reloadData }) => {

  const { currentUser } = useSelector((state) => state.users);
  const [inventoryType, setInventoryType] = useState("in");
  const [form] = Form.useForm();
  

  const onFinish = async (values) => {
    try {
      const response = await AddInventory({
        ...values,
        inventoryType,
        organization: currentUser._id,
      });
      if (response.success) {
        reloadData();
        message.success("Inventory Added Successfully");
        setOpen(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <Modal
      title="ADD INVENTORY"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      onOk={() => {
        form.submit();
      }}
    >
      <Form
        layout="vertical"
        className="flex flex-col gap-3"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item label="Inventory Type">
          <Radio.Group
            value={inventoryType}
            onChange={(e) => setInventoryType(e.target.value)}
          >
            <Radio value="in">In</Radio>
            <Radio value="out">Out</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label="Blood Group"
          name="bloodGroup"
          rules={getAntdInputValidation()}
        >
          <select name="" id="">
            <option value="a+">A+</option>
            <option value="A+">A+</option>
            <option value="a-">A-</option>
            <option value="b+">B+</option>
            <option value="b-">B-</option>
            <option value="o+">O+</option>
            <option value="o-">O-</option>
            <option value="ab+">AB+</option>
            <option value="ab-">AB-</option>
          </select>
        </Form.Item>

        <Form.Item
          label={inventoryType === "out" ? "Hospital Email" : "Donar Email"}
          name="email"
          rules={getAntdInputValidation()}
        >
          <Input type="email" />
        </Form.Item>

        <Form.Item
          label="Quantity (ML)"
          name="quantity"
          rules={getAntdInputValidation()}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InventoryForm;

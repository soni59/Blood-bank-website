import React, { useState } from "react";
import { Button, Table, message } from "antd";
import InventoryForm from "./InventoryForm";
import { GetInventory } from "../../../apicalls/inventory";
import { getDateFormat } from "../../../utils/helpers";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = React.useState([]);

  const columns = [
    {
      title: "Inventory Type",
      dataIndex: "inventoryType",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Blood Group",
      dataIndex: "bloodGroup",
      render: (text) => text.toUpperCase(),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      render: (text) => text + " ML",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      render: (text, record) => {
        if (record.inventoryType === "in") {
          return record.donar.name;
        } else {
          return record.hospital.hospitalName;
        }
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  //   get-data
  const getData = async () => {
    try {
      const response = await GetInventory();
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-3">
      <div className="flex justify-end">
        <Button type="default" onClick={() => setOpen(true)}>
          Add Inventory
        </Button>
      </div>

      <Table columns={columns} dataSource={data} className="mt-3" />

      {open && (
        <InventoryForm open={open} setOpen={setOpen} reloadData={getData} />
      )}
    </div>
  );
};

export default Inventory;

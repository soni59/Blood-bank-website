import { React, useEffect, useState } from "react";
import { Table, message } from "antd";
import { GetInventoryWithFilters } from "../apicalls/inventory";
import { getDateFormat } from "../utils/helpers";

const InventoryTable = ({filters, userType}) => {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  //   const dispatch = useDispatch();

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
        if (userType === "organization") {
          return record.inventoryType === "in"
            ? record.donor?.name
            : record.hospital?.hospitalName;
        } else {
          return record.organization.organisationName;
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
      const response = await GetInventoryWithFilters(filters);
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);


  return (
    <div>
      <Table columns={columns} dataSource={data} className="mt-3" />
    </div>
  )
}

export default InventoryTable

import { Table, message } from "antd";
import { React, useEffect, useState } from "react";
import { GetAllDonarsOfAnOrganization } from "../../../apicalls/Users";
import { getDateFormat } from "../../../utils/helpers";

const Donars = () => {
  const [data, setData] = useState([]);

  //   get- all donars
  const getData = async () => {
    try {
      const response = await GetAllDonarsOfAnOrganization();
      if (response.success) {
        setData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="m-4">
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Donars;

import React from "react";
import { Table, message } from "antd";
import { getDateFormat } from "../../../utils/helpers";
import { GetAllHospitalsOfAnOrganization } from "../../../apicalls/Users";

function Hospitals() {
  const [data, setData] = React.useState([]);

  const getData = async () => {
    try {   
        
      const response = await GetAllHospitalsOfAnOrganization();

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
      title: "Hospital Name",
      dataIndex: "hospitalName",
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
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text) => getDateFormat(text),
    },
  ];

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default Hospitals;

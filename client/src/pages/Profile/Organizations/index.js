import { React, useEffect, useState } from "react";
import { GetAllOrganizationsOfADonar, GetAllOrganizationsOfAHospital } from './../../../apicalls/Users';
// import { Modal, Table, message } from "antd";
import {  Table, message } from "antd";
import {  useSelector } from "react-redux";
import { getDateFormat } from "../../../utils/helpers";
// import InventoryTable from '../../../components/InventoryTable';

const Organizations = ({ userType }) => {
    // const [showHistoryModal, setShowHistoryModal] = useState(false);
    const { currentUser } = useSelector((state) => state.users);
    // const [selectedOrganization, setSelectedOrganization] = useState(null);
    const [data, setData] = useState([]);
    
  
    const getData = async () => {
      try {
        
        let response = null;
        if (userType === "hospital") {
          response = await GetAllOrganizationsOfAHospital();
        } else {
          response = await GetAllOrganizationsOfADonar();
        }
        
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
        dataIndex: "organisationName",
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
      // {
      //   title: "Action",
      //   dataIndex: "action",
      //   render: (text, record) => (
      //     <span
      //       className="underline text-md cursor-pointer"
      //       onClick={() => {
      //         setSelectedOrganization(record);
      //         setShowHistoryModal(true);
      //       }}
      //     >
      //       History
      //     </span>
      //   ),
      // },
    ];
  
    useEffect(() => {
      getData();
    }, []);
    return (
      <div>
        <Table columns={columns} dataSource={data} />
  
        {/* {showHistoryModal && (
          <Modal
            title={
           
              `${
                userType === "donar"
                  ? "Donations History"
                  : "Cunsumptions History"
              } In ${selectedOrganization.organizationName}`
            }
            centered
            open={showHistoryModal}
            onClose={() => setShowHistoryModal(false)}
            width={1000}
            onCancel={() => setShowHistoryModal(false)}
          >
            <InventoryTable
              filters={{
                organization: selectedOrganization._id,
                [userType]: currentUser._id,
              }}
            />
          </Modal>
        )} */}
      </div>
    );
}

export default Organizations

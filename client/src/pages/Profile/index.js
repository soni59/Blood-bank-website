import { Tabs } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import Inventory from "./Inventory";
import Donars from "./Donars";
import Hospitals from "./Hospitals";
import Organizations from "./Organizations";
import InventoryTable from "./../../components/InventoryTable";
import { getLoggedInUserName } from "../../utils/helpers";
import { Navigate, useNavigate } from "react-router-dom";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  console.log(currentUser);
  return (
    currentUser && (
      <>
        <div className="flex justify-between items-center bg-primary text-white px-5 py-3">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-2xl">Blood-Bank</h1>
            <span className="text-xs">
              {currentUser.userType.toUpperCase()}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <i class="ri-shield-user-line"></i>
            <div className="flex flex-col">
              {getLoggedInUserName(currentUser).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="m-4">
          <Tabs>
            {currentUser.userType === "organization" && (
              <>
                <Tabs.TabPane tab="Inventory" key="1">
                  <Inventory></Inventory>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Donars" key="2">
                  <Donars></Donars>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Hospitals" key="3">
                  <Hospitals></Hospitals>
                </Tabs.TabPane>
              </>
            )}

            {currentUser.userType === "donar" && (
              <>
                <Tabs.TabPane tab="Donations" key="4">
                  <InventoryTable
                    filters={{
                      inventoryType: "in",
                      donar: currentUser._id,
                    }}
                    userType="donar"
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Organizations" key="5">
                  <Organizations userType="donar" />
                </Tabs.TabPane>
              </>
            )}

            {currentUser.userType === "hospital" && (
              <>
                <Tabs.TabPane tab="Consumptions" key="6">
                  <InventoryTable
                    filters={{
                      inventoryType: "out",
                      hospital: currentUser._id,
                    }}
                    userType="hospital"
                  />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Organizations" key="7">
                  <Organizations userType="hospital" />
                </Tabs.TabPane>
              </>
            )}
          </Tabs>
        </div>

        {/* footer */}

        <footer className=" bg-primary text-white px-3 py-1 text-center  sticky bottom-0">
          <div className="p-4 text-center bg-primary text-white">
            © 2023 Copyright : Blood_Bank
          </div>
        </footer>
      </>
    )
  );
};

export default Profile;

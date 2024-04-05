"use client";
import { useState, useEffect } from "react";
import { Button, Table, Modal, Input } from "antd";
import { message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import AllDriverDetails from "../AllDriverDetails/AllDriverDetails";

function ManageDriver() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBus, setNewBus] = useState({
    driver_id: "",
    driver_name: "",
    bus_no: "",
    mobile_no: "",
    email: "",
  });

  const handleAddBus = () => {
    setIsAdding(true);
    setIsEditing(false);
    setNewBus({
      driver_id: "",
      driver_name: "",
      bus_no: "",
      mobile_no: "",
      email: "",
    });
  };

  const handleDeleteBus = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this driver?",
      okText: "Yes",
      okType: "danger",
      onOk: () => handleSaveDelete(record),
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSaveAdd = async () => {
    try {
      const response = await fetch("/api/NewDriver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBus),
      });

      if (response.ok) {
        message.success("New Driver added successfully!");
        window.location.reload();
        handleCancelAdd();
      } else {
        throw new Error("Failed to add New Driver");
      }
    } catch (error) {
      console.error("Error adding New Driver:", error);
      message.error("Failed to add New Driver. Please try again later.");
    }
  };

  const handleSaveDelete = async (record) => {
    try {
      const response = await fetch(`/api/DeleteDriver/${record}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Driver deleted successfully!");
        window.location.reload();
        setDataSource((prevDataSource) =>
          prevDataSource.filter((bus) => bus._id !== record._id)
        );
      } else {
        throw new Error("Failed to delete Driver");
      }
    } catch (error) {
      console.error("Error deleting Driver:", error);
      message.error("Failed to delete Driver. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Driver ID",
      dataIndex: "driver_id",
      key: "driver_id",
    },
    {
      title: "Driver Name",
      dataIndex: "driver_name",
      key: "driver_name",
    },
    {
      title: "Registration No",
      dataIndex: "bus_no",
      key: "bus_no",
    },
    {
      title: "Mobile No",
      dataIndex: "mobile_no",
      key: "mobile_no",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined
            onClick={() => handleDeleteBus(record._id)}
            style={{ marginLeft: 8, color: "red" }}
          />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchAllBusData = async () => {
      const allBusData = await AllDriverDetails();
      setDataSource(allBusData);
    };
    fetchAllBusData();
  }, []);

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/Managedriver", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: editingBus._id, ...editingBus }),
      });

      if (res.ok) {
        message.success("Driver details updated successfully");
        setIsEditing(false);
        setEditingBus(null);
        window.location.reload();
      } else {
        throw new Error("Failed to update Driver details");
      }
    } catch (error) {
      console.error("Error updating Driver details:", error);
      message.error("Failed to update Driver details");
    }

    setIsEditing(false);
    setEditingBus(null);
  };

  const handleEdit = (record) => {
    setEditingBus(record);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingBus(null);
  };

  return (
    <>
      <div style={{ marginRight: "3rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Button
            style={{
              marginBottom: "1rem",
              display: "flex",
              justifyContent: "end",
              backgroundColor: "#3A6FF8",
              color: "white",
              fontWeight: "500",
            }}
            onClick={handleAddBus}
          >
            Add Driver
          </Button>
        </div>

        <Table columns={columns} dataSource={dataSource} rowKey="id" />
        <Modal
          title={isEditing ? "Edit Driver" : "Add New Driver"}
          visible={isEditing || isAdding}
          onCancel={isEditing ? handleCancelEdit : handleCancelAdd}
          onOk={isEditing ? handleSaveEdit : handleSaveAdd}
        >
          <Input
            placeholder="Driver ID"
            value={isEditing ? editingBus?.driver_id : newBus.driver_id}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    driver_id: e.target.value,
                  })
                : setNewBus({ ...newBus, driver_id: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Driver Name"
            value={isEditing ? editingBus?.driver_name : newBus.driver_name}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    driver_name: e.target.value,
                  })
                : setNewBus({ ...newBus, driver_name: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Registration No"
            value={isEditing ? editingBus?.bus_no : newBus.bus_no}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    bus_no: e.target.value,
                  })
                : setNewBus({ ...newBus, bus_no: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Mobile No"
            value={isEditing ? editingBus?.mobile_no : newBus.mobile_no}
            onChange={(e) =>
              isEditing
                ? setEditingBus({ ...editingBus, mobile_no: e.target.value })
                : setNewBus({ ...newBus, mobile_no: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Email"
            value={isEditing ? editingBus?.email : newBus.email}
            onChange={(e) =>
              isEditing
                ? setEditingBus({ ...editingBus, email: e.target.value })
                : setNewBus({ ...newBus, email: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
        </Modal>
      </div>
    </>
  );
}

export default ManageDriver;

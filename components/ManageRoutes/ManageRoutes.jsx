"use client";
import { useState, useEffect } from "react";
import { Button, Table, Modal, Input } from "antd";
import { message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";
import AllRoutesDetails from "../AllRoutesDetails/AllRoutesDetails";

function ManageStudentss() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBus, setNewBus] = useState({
    route_id: "",
    area1: "",
    area2: "",
    area3: "",
    registration_no: "",
  });

  const handleAddBus = () => {
    setIsAdding(true);
    setIsEditing(false);
    setNewBus({
      route_id: "",
      area1: "",
      area2: "",
      area3: "",
      registration_no: "",
    });
  };

  const handleDeleteBus = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Route?",
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
      const response = await fetch("/api/NewRoute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBus),
      });

      if (response.ok) {
        message.success("Route added successfully!");
        window.location.reload();
        handleCancelAdd();
      } else {
        throw new Error("Failed to add Route");
      }
    } catch (error) {
      console.error("Error adding Route:", error);
      message.error("Failed to add Route. Please try again later.");
    }
  };

  const handleSaveDelete = async (record) => {
    try {
      const response = await fetch(`/api/DeleteRoute/${record}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Route deleted successfully!");
        window.location.reload();
        setDataSource((prevDataSource) =>
          prevDataSource.filter((bus) => bus._id !== record._id)
        );
      } else {
        throw new Error("Failed to delete Route");
      }
    } catch (error) {
      console.error("Error deleting Route:", error);
      message.error("Failed to delete Route. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Route ID",
      dataIndex: "route_id",
      key: "route_id",
    },
    {
      title: "Registration No",
      dataIndex: "registration_no",
      key: "registration_no",
    },
    {
      title: "Area1",
      dataIndex: "area1",
      key: "area1",
    },
    {
      title: "Area2",
      dataIndex: "area2",
      key: "area2",
    },
    {
      title: "Area3",
      dataIndex: "area3",
      key: "area3",
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

  const [busDetails, setBusDetails] = useState({
    _id: "",
    route_id: "",
    area1: "",
    area2: "",
    area3: "",
    registration_no: "",
  });

  useEffect(() => {
    const fetchAllBusData = async () => {
      const allBusData = await AllRoutesDetails();
      setDataSource(allBusData);
    };
    fetchAllBusData();
  }, []);

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/Manageroutes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: editingBus._id, ...editingBus }),
      });

      if (res.ok) {
        message.success("Route details updated successfully");
        setIsEditing(false);
        setEditingBus(null);
        window.location.reload();
      } else {
        throw new Error("Failed to update Route details");
      }
    } catch (error) {
      console.error("Error updating Route details:", error);
      message.error("Failed to update Route details");
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
            Add Route
          </Button>
        </div>

        <Table columns={columns} dataSource={dataSource} rowKey="id" />
        <Modal
          title={isEditing ? "Edit Student" : "Add New Bus"}
          visible={isEditing || isAdding}
          onCancel={isEditing ? handleCancelEdit : handleCancelAdd}
          onOk={isEditing ? handleSaveEdit : handleSaveAdd}
        >
          <Input
            placeholder="Route ID"
            value={isEditing ? editingBus?.route_id : newBus.route_id}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    route_id: e.target.value,
                  })
                : setNewBus({ ...newBus, route_id: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Registration No"
            value={isEditing ? editingBus?.registration_no : newBus.registration_no}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    registration_no: e.target.value,
                  })
                : setNewBus({ ...newBus, registration_no: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Area1"
            value={isEditing ? editingBus?.area1 : newBus.area1}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    area1: e.target.value,
                  })
                : setNewBus({ ...newBus, area1: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Area2"
            value={isEditing ? editingBus?.area2 : newBus.area2}
            onChange={(e) =>
              isEditing
                ? setEditingBus({ ...editingBus, area2: e.target.value })
                : setNewBus({ ...newBus, area2: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Area3"
            value={isEditing ? editingBus?.area3 : newBus.area3}
            onChange={(e) =>
              isEditing
                ? setEditingBus({ ...editingBus, area3: e.target.value })
                : setNewBus({ ...newBus, area3: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
        </Modal>
      </div>
    </>
  );
}

export default ManageStudentss;

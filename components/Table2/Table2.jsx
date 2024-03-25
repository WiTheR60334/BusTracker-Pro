"use client";
import { useState, useEffect } from "react";
import { Button, Table, Modal, Input } from "antd";
import { message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Table2() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBus, setNewBus] = useState({
    bus_no: "",
    registration_no: "",
    model: "",
    color: "",
    seats: "",
  });

  const handleAddBus = () => {
    setIsAdding(true);
    setIsEditing(false); 
    setNewBus({
      bus_no: "",
      registration_no: "",
      model: "",
      color: "",
      seats: "",
    });
  };

  const handleCancelAdd = () => {
    setIsAdding(false);
  };

  const handleSaveAdd = async () => {
    try {
      const response = await fetch("/api/NewBus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBus),
      });

      if (response.ok) {
        message.success("Bus added successfully!");
        window.location.reload();
        handleCancelAdd();
      } else {
        throw new Error("Failed to add bus");
      }
    } catch (error) {
      console.error("Error adding bus:", error);
      message.error("Failed to add bus. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Bus No",
      dataIndex: "bus_no",
      key: "bus_no",
    },
    {
      title: "Registration No",
      dataIndex: "registration_no",
      key: "registration_no",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div>
          <EditOutlined onClick={() => handleEdit(record)} />
          <DeleteOutlined
            onClick={() => handleDelete(record)}
            style={{ marginLeft: 8, color: "red" }}
          />
        </div>
      ),
    },
  ];

  const [busDetails, setBusDetails] = useState({
    _id: "",
    bus_no: "",
    registration_no: "",
    model: "",
    color: "",
    seats: 0,
  });

  useEffect(() => {
    const fetchAllBusDetails = async () => {
      try {
        const response = await fetch("/api/AllBusConnector", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch student data");
        }

        const data = await response.json();
        setDataSource(data.body);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchAllBusDetails();
  }, []);

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/Managebuses", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: editingBus._id, ...editingBus }),
      });

      if (res.ok) {
        message.success("Bus details updated successfully");
        setIsEditing(false);
        setEditingBus(null);
        window.location.reload();
      } else {
        throw new Error("Failed to update bus details");
      }
    } catch (error) {
      console.error("Error updating bus details:", error);
      message.error("Failed to update bus details");
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
      <Button style={{ marginBottom: "1rem" }} onClick={handleAddBus}>
        Add Bus
      </Button>
      <Table columns={columns} dataSource={dataSource} rowKey="id" />
      <Modal
        title={isEditing ? "Edit Bus" : "Add New Bus"}
        visible={isEditing || isAdding}
        onCancel={isEditing ? handleCancelEdit : handleCancelAdd}
        onOk={isEditing ? handleSaveEdit : handleSaveAdd}
      >
        <Input
          placeholder="Bus No"
          value={isEditing ? editingBus?.bus_no : newBus.bus_no}
          onChange={(e) =>
            isEditing
              ? setEditingBus({ ...editingBus, bus_no: e.target.value })
              : setNewBus({ ...newBus, bus_no: e.target.value })
          }
        />
        <Input
          placeholder="Registration No"
          value={
            isEditing ? editingBus?.registration_no : newBus.registration_no
          }
          onChange={(e) =>
            isEditing
              ? setEditingBus({
                  ...editingBus,
                  registration_no: e.target.value,
                })
              : setNewBus({ ...newBus, registration_no: e.target.value })
          }
        />
        <Input
          placeholder="Model"
          value={isEditing ? editingBus?.model : newBus.model}
          onChange={(e) =>
            isEditing
              ? setEditingBus({ ...editingBus, model: e.target.value })
              : setNewBus({ ...newBus, model: e.target.value })
          }
        />
        <Input
          placeholder="Color"
          value={isEditing ? editingBus?.color : newBus.color}
          onChange={(e) =>
            isEditing
              ? setEditingBus({ ...editingBus, color: e.target.value })
              : setNewBus({ ...newBus, color: e.target.value })
          }
        />
        <Input
          placeholder="Seats"
          value={isEditing ? editingBus?.seats : newBus.seats}
          onChange={(e) =>
            isEditing
              ? setEditingBus({
                  ...editingBus,
                  seats: parseInt(e.target.value),
                })
              : setNewBus({ ...newBus, seats: parseInt(e.target.value) })
          }
        />
      </Modal>
    </>
  );
}

export default Table2;

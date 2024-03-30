"use client";
import { useState, useEffect } from "react";
import { Button, Table, Modal, Input } from "antd";
import { message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { flightRouterStateSchema } from "next/dist/server/app-render/types";

function ManageStudentss() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingBus, setEditingBus] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newBus, setNewBus] = useState({
    enrollment_no: "",
    name: "",
    surname: "",
    standard: "",
    section: "",
    email: "",
    busNo: "",
  });

  const handleAddBus = () => {
    setIsAdding(true);
    setIsEditing(false);
    setNewBus({
      enrollment_no: "",
      name: "",
      surname: "",
      standard: "",
      section: "",
      email: "",
      busNo: "",
    });
  };

  const handleDeleteBus = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Student?",
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
      const response = await fetch("/api/NewStudent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBus),
      });

      if (response.ok) {
        message.success("Student added successfully!");
        window.location.reload();
        handleCancelAdd();
      } else {
        throw new Error("Failed to add Student");
      }
    } catch (error) {
      console.error("Error adding Student:", error);
      message.error("Failed to add Student. Please try again later.");
    }
  };

  const handleSaveDelete = async (record) => {
    try {
      const response = await fetch(`/api/DeleteStudent/${record}`, {
        method: "DELETE",
      });

      if (response.ok) {
        message.success("Student deleted successfully!");
        window.location.reload();
        setDataSource((prevDataSource) =>
          prevDataSource.filter((bus) => bus._id !== record._id)
        );
      } else {
        throw new Error("Failed to delete Student");
      }
    } catch (error) {
      console.error("Error deleting Student:", error);
      message.error("Failed to delete Student. Please try again later.");
    }
  };

  const columns = [
    {
      title: "Enrollment No",
      dataIndex: "enrollment_no",
      key: "enrollment_no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
    },
    {
      title: "Standard",
      dataIndex: "standard",
      key: "standard",
    },
    {
      title: "Section",
      dataIndex: "section",
      key: "section",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Registration No",
      dataIndex: "busNo",
      key: "busNo",
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
    enrollment_no: "",
    name: "",
    surname: "",
    standard: "",
    section: "",
    email: "",
    busNo: "",
  });

  useEffect(() => {
    const fetchAllBusDetails = async () => {
      try {
        const response = await fetch("/api/AllStudentsConnector", {
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
      const res = await fetch("/api/Managestudents", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: editingBus._id, ...editingBus }),
      });

      if (res.ok) {
        message.success("Student details updated successfully");
        setIsEditing(false);
        setEditingBus(null);
        window.location.reload();
      } else {
        throw new Error("Failed to update Student details");
      }
    } catch (error) {
      console.error("Error updating Student details:", error);
      message.error("Failed to update Student details");
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
            Add Student
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
            placeholder="Enrollment No"
            value={isEditing ? editingBus?.enrollment_no : newBus.enrollment_no}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    enrollment_no: e.target.value,
                  })
                : setNewBus({ ...newBus, enrollment_no: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Name"
            value={isEditing ? editingBus?.name : newBus.name}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    name: e.target.value,
                  })
                : setNewBus({ ...newBus, name: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Surname"
            value={isEditing ? editingBus?.surname : newBus.surname}
            onChange={(e) =>
              isEditing
                ? setEditingBus({ ...editingBus, surname: e.target.value })
                : setNewBus({ ...newBus, surname: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Standard"
            value={isEditing ? editingBus?.standard : newBus.standard}
            onChange={(e) =>
              isEditing
                ? setEditingBus({ ...editingBus, standard: e.target.value })
                : setNewBus({ ...newBus, standard: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Section"
            value={isEditing ? editingBus?.section : newBus.section}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    section: e.target.value,
                  })
                : setNewBus({ ...newBus, section: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Email"
            value={isEditing ? editingBus?.email : newBus.email}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    email: e.target.value,
                  })
                : setNewBus({ ...newBus, email: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
          <Input
            placeholder="Registration No"
            value={isEditing ? editingBus?.busNo : newBus.busNo}
            onChange={(e) =>
              isEditing
                ? setEditingBus({
                    ...editingBus,
                    busNo: e.target.value,
                  })
                : setNewBus({ ...newBus, busNo: e.target.value })
            }
            style={{ marginBottom: "1rem" }}
          />
        </Modal>
      </div>
    </>
  );
}

export default ManageStudentss;

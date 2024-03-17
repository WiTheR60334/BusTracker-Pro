// "use client";
// import { Table, Icon } from "antd";
// import React from "react";

// const dataSource = [
//   {
//     busNumber: "1",
//     key: "1",
//     name: "Mike",
//     RegistrationNumber: "GJ 1234",
//     noofSeats: "40",
//     age: 32,
//     actions: "delete",
//   },
//   {
//     key: "2",
//     name: "John",
//     busNumber: "2",
//     RegistrationNumber: "GJ 4567",
//     noofSeats: "30",
//     age: 42,
//     actions: 'delete',
//   },
// ];

// const columns = [
//   {
//     title: "Bus Number",
//     dataIndex: "busNumber",
//     key: "busNumber",
//   },
//   {
//     title: "Name",
//     dataIndex: "name",
//     key: "name",
//   },
//   {
//     title: "Age",
//     dataIndex: "age",
//     key: "age",
//   },
//   {
//     title: "Registration Number",
//     dataIndex: "RegistrationNumber",
//     key: "RegistrationNumber",
//   },
//   {
//     title: "No of Seats",
//     dataIndex: "noofSeats",
//     key: "noofSeats",
//   },
//   {
//     title: "Actions",
//     dataIndex: "actions",
//     key: "actions",
//   },
// ];

// function Table2() {
//   return (
//     <div>
//       <Table dataSource={dataSource} columns={columns} />
//     </div>
//   );
// }
// export default Table2;

"use client";
import { Button, Table, Modal, Input } from "antd";
import { useState } from "react";
import styles from "./Table2.module.css";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

function Table2() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "John",
      email: "john@gmail.com",
      address: "John Address",
    },
    {
      id: 2,
      name: "David",
      email: "david@gmail.com",
      address: "David Address",
    },
    {
      id: 3,
      name: "James",
      email: "james@gmail.com",
      address: "James Address",
    },
    {
      id: 4,
      name: "Sam",
      email: "sam@gmail.com",
      address: "Sam Address",
    },
  ]);
  const columns = [
    {
      key: "1",
      title: "ID",
      dataIndex: "id",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Address",
      dataIndex: "address",
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditStudent(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteStudent(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAddStudent = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Address " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newStudent];
    });
  };
  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };
  const onEditStudent = (record) => {
    setIsEditing(true);
    setEditingStudent({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingStudent(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Button
          style={{
            marginBottom: "2rem",
            backgroundColor: "#3A6FF8",
            color: "white",
          }}
          onClick={onAddStudent}
        >
          Add a new Bus
        </Button>
        <Table
          columns={columns}
          dataSource={dataSource}
          //   rowClassName={handleRowClassName}
        ></Table>
        <Modal
          title="Edit Student"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((student) => {
                if (student.id === editingStudent.id) {
                  return editingStudent;
                } else {
                  return student;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingStudent?.name}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.email}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          />
          <Input
            value={editingStudent?.address}
            onChange={(e) => {
              setEditingStudent((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default Table2;

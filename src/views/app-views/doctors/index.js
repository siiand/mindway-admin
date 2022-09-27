import { Card, Table, Space, Button, Tabs, Modal, Tag, Input } from "antd";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  addTopRatedDoctorInit,
  deleteTopRatedInit,
  fetchDoctorInit,
  fetchTopRatedDoctorInit,
  deleteDoctorInit,
  setDoctorAccountStatusInit,
} from "redux/actions/Doctor";
import Flex from "components/shared-components/Flex";
import AvatarStatus from "components/shared-components/AvatarStatus";
import {
  StarOutlined,
  StarFilled,
  ExclamationCircleOutlined,
  DeleteOutlined,
  StopOutlined,
  CheckOutlined,
  SearchOutlined,
} from "@ant-design/icons";
const { TabPane } = Tabs;
const { confirm } = Modal;
const Doctors = () => {
  const {
    doctorList,
    listTopRatedDoctor,
    topRatedLoading,
    error,
    loading,
    deleted,
  } = useSelector(
    (state) => ({
      doctorList: state.doctor.data,
      listTopRatedDoctor: state.doctor.topRatedDoctor,
      topRatedLoading: state.doctor.topRatedLoading,
      error: state.doctor.error,
      loading: state.doctor.loading,
      delete: state.doctor.delete,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorInit());
    dispatch(fetchTopRatedDoctorInit());
  }, [dispatch]);

  const columns = [
    {
      title: "등록일",
      key: "date",
      dataIndex: "createdAt",
      width: "20%",
    },
    {
      title: "사진",
      dataIndex: "doctorPicture",
      key: "name",
      render: (_, record) => (
        <Flex>
          <AvatarStatus
            size={30}
            src={record.doctorPicture}
            name={record.doctorName}
          />
        </Flex>
      ),
    },
    {
      title: "이름",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "상담소",
      dataIndex: "doctorHospital",
      key: "doctorHospital",
    },
    {
      title: "카테고리 / 전문분야",
      dataIndex: ["doctorCategory", "categoryName"],
      key: "doctorHospital",
    },
    {
      title: "계정 상태",
      key: "doctorHospital",
      dataIndex: "accountStatus",
      render: (tag) => (
        <>
          <Tag color={tag === "active" ? "green" : "volcano"} key={tag}>
            {tag.toUpperCase()}
          </Tag>
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={
              record.accountStatus === "active" ? (
                <StopOutlined />
              ) : (
                <CheckOutlined />
              )
            }
            shape="circle"
            onClick={
              record.accountStatus === "active"
                ? () => showConfirmDeactivate(record.doctorName, record.id)
                : () => showConfirmActivate(record.doctorName, record.id)
            }
          ></Button>
          <Button
            icon={<StarOutlined />}
            shape="circle"
            onClick={() => showConfirmAddTopRated(record.doctorName, record.id)}
          ></Button>
          <Button
            icon={<DeleteOutlined />}
            shape="circle"
            onClick={() =>
              showConfirmDeleteDoctor(record.doctorName, record.id)
            }
          ></Button>
        </Space>
      ),
    },
  ];

  const topRatedDoctorColumns = [
    {
      title: "사진",
      dataIndex: "doctorPicture",
      key: "name",
      render: (_, record) => (
        <Flex>
          <AvatarStatus
            size={30}
            src={record.doctorPicture}
            name={record.doctorName}
          />
        </Flex>
      ),
    },
    {
      title: "이름",
      dataIndex: "doctorName",
      key: "doctorName",
    },
    {
      title: "상담소",
      dataIndex: "doctorHospital",
      key: "doctorHospital",
    },
    {
      title: "카테고리 / 전문분야",
      dataIndex: ["doctorCategory", "categoryName"],
      key: "doctorHospital",
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<StarFilled />}
            shape="circle"
            onClick={() =>
              showConfirmDeleteTopRated(record.doctorName, record.id)
            }
          ></Button>
        </Space>
      ),
    },
  ];
  function showConfirmAddTopRated(doctorName, documentId) {
    confirm({
      title: `Do you want to add ${doctorName} to Top Rated Doctor"`,
      content:
        "if you adding this doctor to the top rated doctor, he will appear on the main page of all users",
      onOk() {
        addTopRated(documentId);
      },
      onCancel() {},
    });
  }

  function showConfirmDeleteTopRated(doctorName, documentId) {
    confirm({
      title: `Remove ${doctorName} from Top Rated Doctor.?"`,
      icon: <ExclamationCircleOutlined />,
      content:
        "if you remove this Doctor from top rated doctor, he will not be shown on Top Rated Doctor page",
      onOk() {
        deleteTopRated(documentId);
      },
      onCancel() {},
    });
  }
  function showConfirmDeleteDoctor(doctorName, documentId) {
    confirm({
      title: `Are you sure you want to delete ${doctorName} account`,

      content:
        "if you delete this doctor's account, this account will be deleted forever",
      onOk() {
        deleteDoctorAccount(documentId);
      },
      onCancel() {},
    });
  }
  function showConfirmDeactivate(doctorName, documentId) {
    confirm({
      title: `Are you sure you want to deactivate ${doctorName} account`,

      content:
        "If you deactivate this doctor's account, this doctor will not be visible to all users, until it is reactivated",
      onOk() {
        deactivateDoctor(documentId);
      },
      onCancel() {},
    });
  }
  function showConfirmActivate(doctorName, documentId) {
    confirm({
      title: `Are you sure you want to Activate ${doctorName} account`,

      content:
        "If you Aeactivate this doctor's account, this doctor  be visible to all users",
      onOk() {
        activateDoctor(documentId);
      },
      onCancel() {},
    });
  }

  function deactivateDoctor(doctorId) {
    dispatch(setDoctorAccountStatusInit(doctorId, "nonactive"));
  }
  function activateDoctor(doctorId) {
    dispatch(setDoctorAccountStatusInit(doctorId, "active"));
  }
  function deleteTopRated(doctorId) {
    dispatch(deleteTopRatedInit(doctorId));
  }
  function addTopRated(doctorId) {
    dispatch(addTopRatedDoctorInit(doctorId));
  }
  function deleteDoctorAccount(doctorId) {
    dispatch(deleteDoctorInit(doctorId));
  }
  function handleSearch(searchText) {
    const filteredEvents = doctorList.filter(({ doctorName }) => {
      doctorName = doctorName.toLowerCase();
      return doctorName.includes(searchText);
    });
    doctorList = filteredEvents;
  }

  return (
    <>
      <Card>
        {/* <Flex alignItems="center" justifyContent="between" mobileFlex={false}>
          <Flex className="mb-1" mobileFlex={false}>
            <div className="mr-md-3 mb-3">
              <Input
                placeholder="Search"
                prefix={<SearchOutlined />}
                onChange={(e) => handleSearch(e)}
              />
            </div>
          </Flex>
        </Flex> */}
        <Tabs defaultActiveKey="1">
          <TabPane tab="상담사" key="1">
            <Table
              dataSource={doctorList}
              columns={columns}
              loading={loading}
            />
          </TabPane>
          <TabPane
            tab={
              <span>
                <StarOutlined />
                인기 상담사
              </span>
            }
            key="2"
          >
            <Table
              dataSource={listTopRatedDoctor}
              columns={topRatedDoctorColumns}
              loading={topRatedLoading}
            />
          </TabPane>
        </Tabs>
      </Card>
    </>
  );
};

export default Doctors;

import { Card, Table, Space, Button, Modal, message } from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import React, { useEffect } from "react";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { fetchDoctorCategoryInit } from "redux/actions/DoctorCategory";
import { Link, useHistory } from "react-router-dom";
import {
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import FirebaseService from "services/FirebaseService";
const { confirm } = Modal;
const DoctorCategory = () => {
  const { doctorCategoryList, error, loading, deleted } = useSelector(
    (state) => ({
      doctorCategoryList: state.doctorCategory.data,
      error: state.doctorCategory.error,
      loading: state.doctorCategory.loading,
      delete: state.doctorCategory.delete,
    }),
    shallowEqual
  );
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctorCategoryInit());
  }, [dispatch]);

  const columns = [
    {
      title: "Category Icon",
      dataIndex: "iconUrl",
      key: "name",
      render: (_, record) => (
        <Flex>
          <AvatarStatus
            size={30}
            src={record.iconUrl}
            name={record.categoryName}
          />
        </Flex>
      ),
    },
    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryname",
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            shape="circle"
            onClick={() =>
              history.push({
                pathname:
                  "new-doctor-category/" +
                  record.id +
                  "/" +
                  record.categoryName,
              })
            }
          ></Button>
          <Button
            onClick={() => showPromiseConfirm(record.categoryName, record.id)}
            icon={<DeleteOutlined />}
            shape="circle"
          />
        </Space>
      ),
    },
  ];
  function showPromiseConfirm(categoryName, documentId) {
    confirm({
      title: `Do you want to delete ${categoryName} category.?"`,
      icon: <ExclamationCircleOutlined />,
      content:
        "if you delete this category, the doctor who has selected this category may not be found in the category list",
      onOk() {
        deleteDoctorCategory(documentId);
      },
      onCancel() {},
    });
  }

  const deleteDoctorCategory = async (id) => {
    try {
      await FirebaseService.removeDoctorCategory(id);
      message.success("success deleted doctor category");
      dispatch(fetchDoctorCategoryInit());
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <Card
      title="Doctor Category"
      extra={
        <Space>
          <Button icon={<PlusOutlined />}>
            <Link to={"new-doctor-category"}>Add Doctor Category</Link>
          </Button>
        </Space>
      }
      type="inner"
    >
      <Table
        pagination={false}
        columns={columns}
        dataSource={doctorCategoryList}
        rowKey="id"
        loading={loading}
      />
    </Card>
  );
};

export default DoctorCategory;

import React, { useEffect } from "react";
import { Card, Table, Modal, Space } from "antd";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { fetchUsersInit, deleteUserInit } from "redux/actions/Users";

const Users = () => {
  const { confirm } = Modal;
  const { userList, error, loading, deleted } = useSelector(
    (state) => ({
      userList: state.users.data,
      error: state.users.error,
      loading: state.users.loading,
      delete: state.users.delete,
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsersInit());
  }, [dispatch]);

  function showConfirmAddTopRated(userName, userId) {
    confirm({
      title: `Are you sure you want to delete the ${userName} user account?`,
      content:
        "if you delete this account, this account will be deleted forever",
      onOk() {
        deleteUser(userId);
      },
      onCancel() {},
    });
  }
  function deleteUser(userId) {
    dispatch(deleteUserInit(userId));
  }
  const columns = [
    {
      title: "이름",
      dataIndex: "displayName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "age",
    },
    {
      title: "가입일",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "role",
      dataIndex: "role",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() =>
              showConfirmAddTopRated(record.displayName, record.id)
            }
          >
            Delete
          </a>
        </Space>
      ),
    },
  ];
  console.log("loading : " + loading);
  return (
    <div>
      <Card title="사용자 리스트">
        <Table
          className="no-border-last"
          rowKey="id"
          columns={columns}
          dataSource={userList}
          loading={loading}
        />
      </Card>
      <div>
        <h3>{userList.length} 사용자</h3>
      </div>
    </div>
  );
};

export default Users;

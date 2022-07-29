import React, { useEffect, useState } from "react";
import { Card, Table, Space, Button, Tabs, Modal } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  getWithdrawRequestInit,
  setWihthdrawalRequestCompleteInit,
} from "redux/actions/WithdrawRequestActions";
const Transaction = () => {
  const { withdrawRequestList, error, loading, deleted } = useSelector(
    (state) => ({
      withdrawRequestList: state.withdrawRequest.data,
      error: state.withdrawRequest.error,
      loading: state.withdrawRequest.loading,
      deleted: state.withdrawRequest.delete,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();
  const { confirm } = Modal;
  useEffect(() => {
    dispatch(getWithdrawRequestInit());
  }, [dispatch]);

  function markAsComplete(record) {
    dispatch(setWihthdrawalRequestCompleteInit(record));
  }
  function showConfirmCompleteWithdrawal(withdrawalRequest) {
    confirm({
      title: `Are you sure you want to complete ${withdrawalRequest.withdrawMethod.name} withdrawal request`,

      content: `make sure you have sent money to ${withdrawalRequest.withdrawMethod.name} for $${withdrawalRequest.totalWithdraw} with  ${withdrawalRequest.withdrawMethod.method} payment method by ${withdrawalRequest.withdrawMethod.email}`,
      onOk() {
        markAsComplete(withdrawalRequest);
      },
      onCancel() {},
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: ["withdrawMethod", "name"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["withdrawMethod", "email"],
      key: "email",
    },
    {
      title: "Withdraw Method",
      dataIndex: ["withdrawMethod", "method"],
      key: "withrawMethod",
    },
    {
      title: "Balance",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Admin Fee",
      dataIndex: "adminFee",
      key: "adminFee",
    },
    {
      title: "Total Withdraw",
      dataIndex: "totalWithdraw",
      key: "totalWithdraw",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => showConfirmCompleteWithdrawal(record)}>Complete</a>
        </Space>
      ),
    },
  ];
  return (
    <div>
      {" "}
      <Card>
        <Table
          dataSource={withdrawRequestList}
          columns={columns}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default Transaction;

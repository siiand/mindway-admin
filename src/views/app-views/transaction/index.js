import React, { useEffect } from "react";
import { getTransactionInit } from "redux/actions/TransactionActions";
import { Card, Table } from "antd";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
const Transaction = () => {
  const { transactionList, error, loading, deleted } = useSelector(
    (state) => ({
      transactionList: state.transaction.data,
      error: state.transaction.error,
      loading: state.transaction.loading,
      deleted: state.transaction.delete,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTransactionInit());
  }, [dispatch]);

  const columns = [
    {
      title: "Date",
      key: "date",
      dataIndex: "createdAt",
      width: "20%",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      width: "10%",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "10%",
    },
    {
      title: "Link Receipt",
      key: "amount",
      render: (text, record) => (
        <>
          {
            <a href={record.linkReceipt} target="_blank" rel="noreferrer">
              Link Receipt
            </a>
          }
        </>
      ),
      width: "10%",
    },
    {
      title: "User Id",
      dataIndex: "userId",
      key: "amount",
    },
  ];
  return (
    <div>
      {" "}
      <Card>
        <Table
          dataSource={transactionList}
          columns={columns}
          loading={loading}
        />
      </Card>
    </div>
  );
};

export default Transaction;

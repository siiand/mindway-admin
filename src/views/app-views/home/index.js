import React, { useEffect } from "react";
import { Card, Table, Space, Button, Tabs, Modal, Row, Col } from "antd";
import StatisticWidget from "components/shared-components/StatisticWidget";
import DataDisplayWidget from "components/shared-components/DataDisplayWidget";
import { BarChartOutlined, UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import ChartWidget from "components/shared-components/ChartWidget";
import { getUserCountInit } from "redux/actions/DashboardActions";
const Home = () => {
  const { userCount, error, loading, deleted } = useSelector(
    (state) => ({
      userCount: state.dashboard.data,
      error: state.dashboard.error,
      loading: state.dashboard.loading,
      delete: state.dashboard.delete,
    }),
    shallowEqual
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserCountInit());
    console.log("kepanggil lagi bos");
  }, [dispatch]);
  const visitorChartData = {
    series: [
      {
        name: "Transaction",
        data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10],
      },
      {
        name: "Consultation",
        data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35],
      },
    ],
    categories: [
      "01 Jan",
      "02 Jan",
      "03 Jan",
      "04 Jan",
      "05 Jan",
      "06 Jan",
      "07 Jan",
      "08 Jan",
      "09 Jan",
      "10 Jan",
      "11 Jan",
      "12 Jan",
    ],
  };
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <DataDisplayWidget
                icon={<UserOutlined />}
                value={userCount}
                title="User Register"
                color="blue"
                size={"md"}
                avatarSize={50}
                vertical={false}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <DataDisplayWidget
                icon={<UserOutlined />}
                value={userCount}
                title="Doctor Register"
                color="cyan"
                size={"md"}
                avatarSize={50}
                vertical={false}
              />
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={8}>
              <StatisticWidget
                title="Revenue"
                value="$51"
                status={8.8}
                subtitle="Compare to last month (may)"
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={18}>
          <Row gutter={16}>
            <Col span={24}>
              <ChartWidget
                title="거래량"
                series={visitorChartData.series}
                xAxis={visitorChartData.categories}
                height={400}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

import React, { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  InputNumber,
  Form,
  Button,
  Modal,
  message,
  notification,
  Tabs,
  Table,
  Space,
} from "antd";
import AvatarStatus from "components/shared-components/AvatarStatus";
import Flex from "components/shared-components/Flex";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import {
  deleteImageCarouselInit,
  getImageCarouselInit,
  getWithdrawalSettingsInit,
  saveImageCarouselInit,
  setWithdrawalPercentageInit,
} from "redux/actions/SettingsActions";
import { Link, useHistory } from "react-router-dom";
const Settings = () => {
  const {
    settings,
    error,
    loading,
    deleted,
    success,
    fileList,
    previewVisible,
    previewImage,
    previewTitle,
    imageCarouselData,
    getImageCarouselLoading,
    getImageCarouselError,
    getImageCarouselSuccess,
    deleteImageCarouselSuccess,
  } = useSelector(
    (state) => ({
      settings: state.settings.data,
      error: state.settings.error,
      loading: state.settings.loading,
      delete: state.settings.delete,
      success: state.settings.success,
      fileList: [],
      imageCarouselData: state.settings.imageCarouselData,
      getImageCarouselLoading: state.settings.getImageCarouselLoading,
      getImageCarouselError: state.settings.getImageCarouselError,
      getImageCarouselSuccess: state.settings.getImageCarouselSuccess,
      deleteImageCarouselSuccess: state.settings.deleteImageCarouselSuccess,
    }),
    shallowEqual
  );
  const { TabPane } = Tabs;
  const dispatch = useDispatch();
  const { confirm } = Modal;
  useEffect(() => {
    dispatch(getWithdrawalSettingsInit());
    dispatch(getImageCarouselInit());
  }, [dispatch]);
  const history = useHistory();
  const openNotificationError = (errorMessage) => {
    const args = {
      message: "Error",
      description: `${errorMessage}`,
      duration: 0,
    };
    notification.open(args);
  };
  if (error) {
    openNotificationError(error);
  }
  console.log("success : " + success);
  if (success === true) {
    message.success("Success set withdrawal percentage");
  }
  if (deleteImageCarouselSuccess === true) {
    message.success("Success delete image carousel");
  }

  function showConfirmDelete(imageId, imageUrl) {
    confirm({
      title: `Are you sure you want to delete this image`,
      content:
        "this image will be deleted from the list of carousel images seen by the client",
      onOk() {
        onImageDeleted(imageId, imageUrl);
      },
      onCancel() {},
    });
  }
  const onImageDeleted = async (imageId, imageUrl) => {
    console.log(
      "🚀 ~ file: index.js ~ line 73 ~ onImageDeleted ~ values",
      imageId,
      imageUrl
    );
    let imageData = { imageId, imageUrl };
    dispatch(deleteImageCarouselInit(imageData));
  };

  function showPromiseConfirm(data) {
    confirm({
      title: `Are you sure you want to set the withdrawal percentage to be ${data.percentage}% and tax ${data.tax}%`,
      content:
        "This number will be seen by the doctor when withdrawing funds, the higher the percentage you take, the more likely the doctor will not be happy with it",
      onOk() {
        onFinish(data);
      },
      onCancel() {},
    });
  }

  function onFinish(data) {
    if (data.percentage + data.tax > 99) {
      return message.error(
        "The percentage amount taken and the tax exceeds 100%"
      );
    }
    dispatch(setWithdrawalPercentageInit(data));
  }
  function onFinishFailed(error) {
    openNotificationError(error);
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "imageUrl",
      key: "name",
      render: (_, record) => (
        <Flex>
          <AvatarStatus
            size={30}
            src={record.imageUrl}
            name={record.fileName}
          />
        </Flex>
      ),
    },
    {
      title: "Image File Name",
      dataIndex: "fileName",
      key: "fileName",
    },
    {
      title: "Date Added",
      dataIndex: "createdAt",
      key: "dateAdded",
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
                  `new-image-carousel` + record.id + "/" + record.categoryName,
              })
            }
          ></Button>
          <Button
            onClick={() => showConfirmDelete(record.id, record.imageUrl)}
            icon={<DeleteOutlined />}
            shape="circle"
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Admin Settings" key="1">
            <Row>
              <Col span={12}>
                <Card title="Withdrawal Setting" loading={loading}>
                  <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{
                      percentage: settings.percentage,
                      tax: settings.tax,
                    }}
                    onFinish={showPromiseConfirm}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      label="Percentage Taken"
                      name="percentage"
                      rules={[
                        {
                          required: true,
                          message: "Please input the number",
                        },
                      ]}
                    >
                      <InputNumber
                        formatter={(value) => `${value}%`}
                        parser={(value) => value.replace("%", "")}
                        style={{ width: " 20% " }}
                        max={99}
                      />
                    </Form.Item>
                    <Form.Item label="Tax" name="tax">
                      <InputNumber
                        formatter={(value) => `${value}%`}
                        parser={(value) => value.replace("%", "")}
                        style={{ width: " 20% " }}
                        max={99}
                      />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                      <Button type="primary" htmlType="submit">
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                  <p>
                    * the percentage that will be deducted when the doctor makes
                    a withdrawal
                  </p>
                </Card>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="Client Settings" key="2">
            <Row>
              <Col span={16}>
                <Card
                  title="Image Carousel"
                  loading={getImageCarouselLoading}
                  extra={
                    <Space>
                      <Button icon={<PlusOutlined />}>
                        <Link to={"new-image-carousel"}>
                          Add Image Carousel
                        </Link>
                      </Button>
                    </Space>
                  }
                >
                  <Table
                    pagination={false}
                    columns={columns}
                    dataSource={imageCarouselData}
                    rowKey="id"
                    loading={loading}
                  />
                </Card>
              </Col>
            </Row>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default Settings;

import React, { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  InputNumber,
  Input,
  Form,
  Button,
  Modal,
  message,
  notification,
  Tabs,
  Table,
  Space,
  Upload,
} from "antd";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { saveImageCarouselInit } from "redux/actions/SettingsActions";
const NewImageCarousel = () => {
  const history = useHistory();
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { confirm } = Modal;
  const {
    saveImageCarouselLoading,
    saveImageCarouselSuccess,
    saveImageCarouselError,
  } = useSelector(
    (state) => ({
      saveImageCarouselLoading: state.settings.saveImageCarouselLoading,
      saveImageCarouselSuccess: state.settings.saveImageCarouselSuccess,
      saveImageCarouselError: state.settings.saveImageCarouselError,
    }),
    shallowEqual
  );

  let selectedImage;
  if (saveImageCarouselSuccess === true) {
    message.success("success add new image carousel");
    history.goBack();
  }
  if (saveImageCarouselError === true) {
    message.error("Error : " + saveImageCarouselError);
  }

  function showPromiseConfirm(data) {
    confirm({
      title: `Are you sure you want to upload this image into a carousel`,
      content: "This image will be seen by all your clients on the main page",
      onOk() {
        onFinish(data);
      },
      onCancel() {},
    });
  }

  const onFinish = async (values) => {
    if (selectedImage) {
      let action = {
        fileName: values.image_carousel.file.name,
        file: values.image_carousel.fileList[0].originFileObj,
      };
      dispatch(saveImageCarouselInit(action));
    } else {
      message.error("Image can't be empty");
    }
  };

  const onImageRemove = async (values) => {
    console.log(
      "🚀 ~ file: index.js ~ line 56 ~ onImageRemove ~ values",
      selectedImage
    );
    selectedImage = null;
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return;
    }
    selectedImage = file;
  }

  return (
    <Card title="New Image Corausel" loading={saveImageCarouselLoading}>
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 10 }}
        form={form}
        name="doctor_category_input"
        onFinish={showPromiseConfirm}
        scrollToFirstError
        labelAlign="left"
        initialValues={null}
      >
        <Form.Item
          name="image_carousel"
          label="Image Carousel"
          rules={[
            {
              required: false,
              message: "Please chose Category Icon",
            },
          ]}
        >
          <Upload
            name="logo"
            listType="picture"
            multiple
            maxCount={1}
            beforeUpload={beforeUpload}
            onRemove={onImageRemove}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 3,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NewImageCarousel;

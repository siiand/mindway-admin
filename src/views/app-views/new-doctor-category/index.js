import React, { useState, useMemo } from "react";
import { Card, Form, Input, Button, Upload, message } from "antd";
import { useParams, Redirect } from "react-router-dom";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import FirebaseService from "services/FirebaseService";
import {
  doctorCategorySchema,
  doctorCategorySchemaEditing,
} from "utils/validation/DoctorCategoryValidation";
import { useHistory } from "react-router-dom";
import { modifyDoctorCategoryInit } from "redux/actions/DoctorCategory";

const NewDoctorCategory = () => {
  const history = useHistory();
  const { id, name } = useParams();
  const isEditing = useMemo(() => !!id, [id]);
  const dispatch = useDispatch();

  const { success, cateGoryData, error } = useSelector(
    (state) => ({
      success: state.users.success,
      cateGoryData: state.users.data.find((user) => user.id === id),
      error: state.users.error,
    }),
    shallowEqual
  );

  const [form] = Form.useForm();
  const onFinish = async (values) => {
    try {
      if (isEditing) {
        const form = {
          categoryName: values.categoryName,
          iconUrl: values.category_icon,
        };
        const isValid = await doctorCategorySchemaEditing.validate(form);
        if (isValid) {
          if (!values.category_icon) {
            await FirebaseService.editDoctorCategory(
              id,
              values.categoryName,
              null
            );
            history.push("/app/doctor-category");
          } else {
            let iconUrl = await FirebaseService.uploadImage(
              values.category_icon.file.name,
              values.category_icon.fileList[0].originFileObj
            );
            const form = { categoryName: values.categoryName, iconUrl };
            await FirebaseService.editDoctorCategory(
              id,
              form.categoryName,
              form.iconUrl
            );
            history.push("/app/doctor-category");
          }
        }
      } else {
        console.log("add new category");
        let iconUrl = await FirebaseService.uploadImage(
          values.category_icon.file.name,
          values.category_icon.fileList[0].originFileObj
        );

        const form = {
          categoryName: values.categoryName,
          iconUrl,
        };
        const isValid = await doctorCategorySchema.validate(form);
        if (isValid) {
          await FirebaseService.editDoctorCategory(
            id,
            form.categoryName,
            form.iconUrl
          );
          history.push("/app/doctor-category");
        }
      }
    } catch (error) {
      message.error("error : " + error.message);
    }
  };

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M && false;
  }

  return (
    <Card>
      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 10 }}
        form={form}
        name="doctor_category_input"
        onFinish={onFinish}
        scrollToFirstError
        labelAlign="left"
        initialValues={{ categoryName: isEditing ? name : null }}
      >
        <Form.Item
          name="categoryName"
          label="Category Name"
          rules={[
            {
              required: true,
              message: "Please chose Category Icon",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="category_icon"
          label="Category Icon"
          rules={[
            {
              required: isEditing ? false : true,
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

export default NewDoctorCategory;

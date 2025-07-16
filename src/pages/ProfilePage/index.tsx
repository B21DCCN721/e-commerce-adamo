import anhNen from "../../assets/imgs/nenProfile.png";
import { Flex, Avatar, Button, Typography, Row, Col, Form, Input, DatePicker, Upload, Select, type UploadProps, type GetProp,} from "antd";
import { AntDesignOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import avatar from "../../assets/imgs/avatar.jpg";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import type { User } from "../../types/user";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
import { getBase64, beforeUpload } from "../../helper/handleUploadImg";
const ProfilePage = () => {
  const [form] = Form.useForm();
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const handleEdit = (): void => {
    setCanEdit(true);
  }
  const handleSubmit = (): void => {
    console.log('Lỗi không nhận enter ở profile', form.getFieldsValue());
    setCanEdit(false);
  }
  const [infoUser] = useState<User>({
    id: 1,
    avatar,
    name: 'Đào Xuân Trí',
    gender: 'Nam',
    email: 'abc@gmail.com',
    phone: '123456789',
    address: 'Yên Phương-Yên Lạc-Vĩnh Phúc',
    birthday: new Date('1990-01-01'),
  });
  useEffect(() => {
    form.setFieldsValue({ ...infoUser, birthday: dayjs(infoUser.birthday) });
  }, [form, infoUser]);

  const handleChangeAvatar: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoadingAvatar(false);
        setImageUrl(url);
        // Gán avatar base64 vào form
        form.setFieldsValue({ avatar: url });
      });
    }
  };


  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      {loadingAvatar ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <img src={anhNen} alt="Nền trang cá nhân" width="100%" style={{ marginBottom: "16px", minHeight: '90px' }} />
      <Flex justify="space-between" align="center" style={{ marginBottom: 32 }}>
        <Flex gap={20} align="center">
          <Avatar
            size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            icon={<AntDesignOutlined />}
            src={infoUser.avatar}
          />
          <div>
            <Typography.Title level={4}>Tên người dùng</Typography.Title>
            <Typography.Text>Email</Typography.Text>
          </div>
        </Flex>
        <Button type="primary" icon={<EditOutlined />} onClick={handleEdit}>Chỉnh sửa</Button>
      </Flex>
      <Form form={form} disabled={!canEdit} layout="vertical" name="Thông tin cá nhân" autoComplete="off" onFinish={handleSubmit}>
        <Form.Item name="avatar" label="Tải ảnh">
          <Upload
            name="avatar"
            listType="picture-circle"
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={handleChangeAvatar}
          >
            {imageUrl ? <img
              src={imageUrl}
              alt="avatar"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%',
              }}
            /> : uploadButton}
          </Upload>
        </Form.Item>

        <Row gutter={32}>
          <Col span={12}>
            <Form.Item name='name' label='Họ và tên' rules={[
              { required: true, message: 'Vui lòng nhập tên của bạn' },
              { type: 'string', message: 'Tên không hợp lệ!' }
            ]}>
              <Input />
            </Form.Item>
            <Form.Item name='gender' label='Giới tính'>
              <Select
                defaultValue="male"
                onChange={(value: string) => { console.log("Giới tính:", value); }}
                options={[
                  { value: 'male', label: 'Nam' },
                  { value: 'female', label: 'Nữ' },
                ]}
              />
            </Form.Item>
            <Form.Item name='birthday' label='Ngày sinh' rules={[
              { required: true, message: 'Vui lòng nhập ngày sinh của bạn' },
              { type: 'date', message: 'Ngày sinh không hợp lệ!' }
            ]}>
              <DatePicker style={{ width: '100%' }} needConfirm />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='email' label='Email' rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}>
              <Input />
            </Form.Item>
            <Form.Item name='phone' label='Số điện thoại' rules={[
              { required: true, message: 'Vui lòng nhập số điện thoại' },
              {
                pattern: /^0[1-9]{1}[0-9]{8,9}$/,
                message: 'Số điện thoại phải có 10 hoặc 11 chữ số bắt đầu bằng 0',
              },
            ]}>
              <Input />
            </Form.Item>
            <Form.Item name='address' label='Địa chỉ' rules={[
              { required: true, message: 'Vui lòng nhập địa chỉ của bạn!' },
              { type: 'string', message: 'Địa chỉ không hợp lệ!' }
            ]}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='btnsubmit'>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ProfilePage;
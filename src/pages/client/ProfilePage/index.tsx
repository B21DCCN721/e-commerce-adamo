import anhNen from "../../../assets/imgs/nenProfile.png";
// import silverWolf from "../../assets/imgs/silverwolf.gif";
import { Flex, Avatar, Button, Typography, Row, Col, Form, Input, DatePicker, Upload,
        type UploadProps, type GetProp, Radio, message, Spin, } from "antd";
import { AntDesignOutlined, EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import avatar from "../../../assets/imgs/avatar.jpg";
import { useEffect, useState } from "react";
import type { User } from "../../../types/user";
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];
import { getBase64, beforeUpload } from "../../../utils/handleUploadImg";
import { getProflie, updateProfile } from "../../../services/userService";
import dayjs from "dayjs";
const ProfilePage = () => {
  const userId: string = localStorage.getItem('userId') ?? '';
  const user = localStorage.getItem('infoUser') ?? '';
  const [form] = Form.useForm();
  const [infoUser, setInfoUser] = useState<User>({
    name: JSON.parse(user).name,
    email: JSON.parse(user).email,
    avatar: JSON.parse(user).avatar,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [canEdit, setCanEdit] = useState<boolean>(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  // cập nhật thông tin người dùng
  const handleSubmit = async () => {
    console.log('Lỗi không nhận enter ở profile', form.getFieldsValue());
    try {
      const response = await updateProfile(userId, form.getFieldsValue());
      if (response) {
        setInfoUser({
          ...response,
          birthday: response.birthday ? dayjs(response.birthday) : undefined,
        });
        localStorage.setItem('infoUser', JSON.stringify({name: response.name, email: response.email, avatar: response.avatar ?? avatar}))
      }
      setCanEdit(false);
      setImageUrl('');
      message.success("Cập nhật thông tin thành công");
    } catch (error) {
      console.log("Failed to update user profile", error);
      message.error("Cập nhật thông tin thất bại");
    }
  }
  // lấy thông tin người dùng
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const response = await getProflie(userId);
        if (response) {
          setInfoUser({
            ...response,
            birthday: response.birthday ? dayjs(response.birthday) : undefined,
            avatar: response.avatar || avatar,
          });
        }
      } catch (error) {
        console.log("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, [userId]);
  // set giá trị cho form
  useEffect(() => {
    form.setFieldsValue(infoUser);
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
  if (loading) {
    return <Flex justify="center"><Spin size="large"></Spin></Flex>
  }
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
            <Typography.Title level={4}>{form.getFieldValue("name")}</Typography.Title>
            <Typography.Text>{form.getFieldValue("email")}</Typography.Text>
          </div>
        </Flex>
        <Button type="primary" icon={<EditOutlined />} onClick={() => setCanEdit(true)}>Chỉnh sửa</Button>
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
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
            >
              <Radio.Group>
                <Radio value="male">Nam</Radio>
                <Radio value="female">Nữ</Radio>
                <Radio value="other">Khác</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item name='birthday' label='Ngày sinh' rules={[
              { required: true, message: 'Vui lòng nhập ngày sinh của bạn' },
              { type: 'date', message: 'Ngày sinh không hợp lệ!' }
            ]}>
              <DatePicker style={{ width: '100%' }} needConfirm />
            </Form.Item>
            <Form.Item name='email' label='Email' rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' }
            ]}>
              <Input />
            </Form.Item>
          </Col>
          {/* <Col span={12}>
            <Image src={silverWolf} alt="demo cho do trong" style={{ borderRadius: '10px' }} />
          </Col> */}
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
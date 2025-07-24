import { Form, Select, Switch, Button } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface FormSettingProps {
  closeDrawer: () => void;
}
const FormSetting: React.FC<FormSettingProps> = ({ closeDrawer }) => {
  const [language, setLanguage] = useState<string>('vi');
  const [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const handleSave = () => {
    localStorage.setItem('language', language);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    changeLanguage(language);
    closeDrawer();
  }
  return (
    <Form layout="vertical">
      <Form.Item label="Ngôn ngữ">
        <Select value={language} onChange={setLanguage}>
          <Select.Option value="vi">Vietnamese</Select.Option>
          <Select.Option value="en">English</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Giao diện tối">
        <Switch checked={darkMode} onChange={setDarkMode} />
      </Form.Item>
      <Button type="primary" onClick={handleSave}>Lưu</Button>
    </Form>
  )
};

export default FormSetting;

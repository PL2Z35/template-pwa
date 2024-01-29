import React from 'react';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { Button, Input, Space } from 'antd';

const App: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  return (
    <Space direction="vertical">
      <Input.Password placeholder="input password" />
    </Space>
  );
};

export default App;
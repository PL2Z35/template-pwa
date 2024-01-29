import React, { useState, ReactNode } from 'react';
import { Modal, Button, FloatButton, Slider } from 'antd';
import { FilterOutlined } from '@ant-design/icons';

interface Props {
  children: ReactNode;
}

interface Brand {
  brand: string;
}

const App: React.FC<Props> = ({ children }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <FloatButton.Group type="primary" style={{ right: 40, top: 610 }} icon={<FilterOutlined />}>
        <FloatButton style={{ width: '70px', height: '70px' }} onClick={openModal} />
      </FloatButton.Group>
      <Modal
        visible={modalVisible}
        onCancel={closeModal}
        centered
        footer={[]}
        className='card'
      >
        {children}
      </Modal>
    </>
  );
};

export default App;

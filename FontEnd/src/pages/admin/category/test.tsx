import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const AppTest: React.FC = () => {
    const [visible, setVisible] = useState(false); // Sử dụng thuộc tính `visible` thay vì `open`
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('Content of the modal');

    const showModal = () => {
        setVisible(true); // Thay đổi visible thành true để hiển thị modal
    };

    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false); // Thay đổi visible thành false để đóng modal
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false); // Thay đổi visible thành false để đóng modal
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal with async logic
            </Button>
            <Modal
                title="Title"
                visible={visible} // Sử dụng thuộc tính `visible` thay vì `open`
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <p>{modalText}</p>
            </Modal>
        </>
    );
};

export default AppTest;
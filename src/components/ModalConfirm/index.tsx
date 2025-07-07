import { Button, Modal } from "antd";
import { useState } from "react";

interface ModalConfirmProps {
    btnTitle: string;
    modalTitle: string;
    content: string;
    disabled?: boolean,
    onOk?: () => void;
    onCancel?: () => void;
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({ btnTitle, modalTitle, content, disabled = false, onOk, onCancel }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
        if (onOk) {
            onOk();
        }
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        setIsModalOpen(false);
    };

    return (
        <>
            <Button onClick={showModal} danger disabled={disabled}>
                {btnTitle}
            </Button>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Hủy"
                okType="danger"
            >
                {content}
            </Modal>
        </>
    );
}
export default ModalConfirm;
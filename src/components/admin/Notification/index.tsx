import React, { useState } from 'react';
import { Popover, } from 'antd';

interface NotificationProps {
    content: React.ReactNode;   // nội dung hiển thị trong popover
    children: React.ReactNode;
}

const Notification: React.FC<NotificationProps> = ({ content, children }) => {
    const [open, setOpen] = useState(false);
    const handleOpenChange = (newOpen: boolean) => {
        setOpen(newOpen);
    };
    return (
        <Popover
            content={content}
            placement="bottomRight"
            arrow
            title="Thông báo"
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
        >
            {children}
        </Popover>
    );
};

export default Notification;

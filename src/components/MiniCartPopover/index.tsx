import React from 'react';
import { Popover, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

interface MiniCartPopoverProps {
    count: number;               // số lượng sản phẩm
    content: React.ReactNode;   // nội dung hiển thị trong popover
}

const MiniCartPopover: React.FC<MiniCartPopoverProps> = ({ count, content }) => {
    return (
        <Popover
            content={content}
            trigger="hover"
            placement="bottomRight"
            arrow
        >
            <Badge count={count} size="small" showZero>
                <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <ShoppingCartOutlined style={{ marginRight: 4, fontSize:20 }} />
                    <span>Giỏ hàng</span>
                </div>
            </Badge>
        </Popover>
    );
};

export default MiniCartPopover;

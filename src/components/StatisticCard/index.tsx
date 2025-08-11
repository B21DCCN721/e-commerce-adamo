import { Card, Flex, Image, Typography } from "antd"
import React from "react"
interface StatisticCardProps {
    icon?: string,
    title: string,
    content: string,
}
const StatisticCard:React.FC<StatisticCardProps> = ({icon, title, content}) => {
    return(
        <Card hoverable style={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            borderRadius: 12,
          }}>
            <Flex vertical align="center" gap={8}>
              <Image width={65} height={65} src={icon} alt="icon chart" preview={false} />
              <Typography.Text>{title}</Typography.Text>
              <Typography.Title level={4} style={{ margin: 0 }}>{content}</Typography.Title>
            </Flex>
          </Card>
    )
}

export default StatisticCard;
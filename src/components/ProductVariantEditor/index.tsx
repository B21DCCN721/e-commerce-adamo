import { Button, Form, Input, InputNumber, Space, Card } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ProductVariantEditor = () => {
  return (
    <Form.List name="variants">
      {(variantFields, { add: addVariant, remove: removeVariant }) => (
        <div>
          {variantFields.map(({ key, name, ...restField }) => (
            <Card
              key={key}
              title={`Màu sắc #${name + 1}`}
              extra={
                <MinusCircleOutlined
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => removeVariant(name)}
                />
              }
              style={{ marginBottom: 16 }}
            >
              <Form.Item
                {...restField}
                name={[name, "color"]}
                label="Màu sắc"
                rules={[{ required: true, message: "Nhập màu hoặc mã hex" }]}
              >
                <Input placeholder="VD: Đỏ hoặc #ff0000" />
              </Form.Item>

              <Form.List name={[name, "sizes"]}>
                {(sizeFields, { add: addSize, remove: removeSize }) => (
                  <div>
                    {sizeFields.map(({ key: sizeKey, name: sizeName, ...sizeRest }) => (
                      <Space key={sizeKey} align="baseline" style={{ display: "flex", marginBottom: 8 }}>
                        <Form.Item
                          {...sizeRest}
                          name={[sizeName, "size"]}
                          rules={[{ required: true, message: "Nhập size" }]}
                        >
                          <Input placeholder="Size (S, M, L...)" />
                        </Form.Item>
                        <Form.Item
                          {...sizeRest}
                          name={[sizeName, "quantity"]}
                          rules={[{ required: true, message: "Nhập số lượng" }]}
                        >
                          <InputNumber min={0} placeholder="Số lượng" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => removeSize(sizeName)} style={{ color: "red" }} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => addSize()} block icon={<PlusOutlined />}>
                        Thêm size
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            </Card>
          ))}

          <Form.Item>
            <Button type="dashed" onClick={() => addVariant()} block icon={<PlusOutlined />}>
              Thêm màu
            </Button>
          </Form.Item>
        </div>
      )}
    </Form.List>
  );
};

export default ProductVariantEditor;

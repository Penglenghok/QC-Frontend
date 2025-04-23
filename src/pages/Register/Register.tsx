import { Button, Divider, Form, Input, Row } from "antd";
import { useDispatch } from "react-redux";
import { registerAction } from "../../redux/action/auth.action";
import { useNavigate } from "react-router-dom";
import { useForm } from "antd/es/form/Form";

type Props = {};

export default function Register({}: Props) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onFinish = async () => {
    await form.validateFields();
    const values = form.getFieldsValue();
    dispatch(registerAction(values) as any);
    form.resetFields();
  };

  const [form] = useForm();

  return (
    <div className="login-container">
      <Divider />
      <Form
        form={form}
        className="form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            onClick={onFinish}
            type="primary"
            htmlType="submit"
            size="large"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Button type="dashed" onClick={() => navigate(-1)}>
        Back To Login
      </Button>
    </div>
  );
}

import { Button, Divider, Form, Input } from "antd";
import "./Login.css";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/action/auth.action";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Login({}: Props) {
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    dispatch(loginAction(values) as any);
  };

  const navigate = useNavigate();

  return (
    <div className="login-container">
      <h1>QUAD-COUNT</h1>
      <Form
        className="form"
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
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
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Divider />
      <Button type="dashed" onClick={() => navigate("/register")}>
        Register
      </Button>
    </div>
  );
}

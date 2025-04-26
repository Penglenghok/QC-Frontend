import { Button, Card, Divider, Form, Input, Modal, Row, Select } from "antd";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  createGroupAction,
  getGroupAction,
} from "../../redux/action/group.action";
import { IReducers } from "../../redux/store";
import { useForm } from "antd/es/form/Form";
import { IGroup } from "../../types/group.type";
import { getUserAction } from "../../redux/action/user.action";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { selectedGroupAtom } from "../../atom/group.atom";
import { logoutAction } from "../../redux/action/auth.action";

type Props = {};

export default function Home({}: Props) {
  const dispatch = useDispatch();
  const { user } = useSelector((state: IReducers) => state.auth);
  const { groups } = useSelector((state: IReducers) => state.group);
  const { users } = useSelector((state: IReducers) => state.user);

  const [, setGroup] = useAtom(selectedGroupAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [form] = useForm();
  const navigate = useNavigate();

  const onCreate = () => {
    const formValues = form.getFieldsValue();
    const participants = formValues?.users?.map((item: any) =>
      JSON.parse(item)
    );
    const payload: any = {
      name: formValues.name,
      userIds: [
        user,
        ...participants.filter((item: any) => item.id !== user.id),
      ].map((item: any) => item.id),
    };
    dispatch(createGroupAction(payload) as any);
    form.resetFields();
    onCloseModal();
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  const onOpenModal = () => {
    setIsModalOpen(true);
  };

  const onGroupDetail = (item: IGroup) => {
    navigate(`/expense/${item.id}`);
    setGroup(item);
  };

  const onLogout = () => {
    dispatch(logoutAction() as any);
  };

  useEffect(() => {
    dispatch(getGroupAction(user.id) as any);
    dispatch(getUserAction() as any);
  }, []);

  const AddGroupModal = () => {
    return (
      <Modal
        title="Create Expense"
        open={isModalOpen}
        onOk={onCreate}
        onCancel={onCloseModal}
      >
        <Form form={form}>
          <Form.Item
            label="Title"
            name="name"
            style={{ color: "white" }}
            rules={[{ required: true, message: "Please input expense title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Participants" name="users">
            <Select mode="multiple">
              {users?.map((item) => {
                return (
                  <Select.Option value={JSON.stringify(item)}>
                    {item.first_name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    );
  };

  return (
    <div className="home-container">
      <Button className="logout-button" onClick={onLogout}>
        Logout
      </Button>
      <h1>Group Expense</h1>
      <Row wrap style={{ width: "500px" }}>
        {groups?.map((item) => {
          return (
            <Card
              title={item.name}
              size="small"
              style={{ marginLeft: 20, marginBottom: 10 }}
            >
              <p>Members: {item.users.length}</p>
              <Button onClick={() => onGroupDetail(item)}>Detail</Button>
            </Card>
          );
        })}
      </Row>
      <Divider />
      <Button size="large" type="primary" onClick={onOpenModal}>
        New Group
      </Button>
      <AddGroupModal />
    </div>
  );
}

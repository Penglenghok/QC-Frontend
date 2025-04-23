import { Button, Checkbox, Col, Form, Input, Modal, Row, Select } from "antd";
import _ from "lodash";
import { requireFormField } from "../helpers/form.validation";
import { expense_types } from "../mock_data";
import { Expense, ExpenseGroupMember } from "./../expense_types";
import { useEffect, useRef, useState } from "react";

interface ExpensePopupProps {
  loading?: boolean;
  isModalOpen: boolean;
  handleOk: (expense: Expense) => void;
  handleCancel: () => void;
  text?: string;
  title: string;
  cancelTxt?: string;
  submitTxt: string;
  expense?: Expense;
  members: ExpenseGroupMember[];
}

const ExpenseModal = ({
  isModalOpen,
  handleOk,
  handleCancel,
  text,
  title,
  cancelTxt,
  submitTxt,
  loading = false,
  expense,
  members = [],
}: ExpensePopupProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [checkedMembers, setCheckedMembers] = useState<string[]>(
    members.filter((member) => member.isChecked).map((member) => member.id)
  );
  const [distributedAmounts, setDistributedAmounts] = useState<{
    [key: string]: number;
  }>({});
  const formRef = useRef<any>(null);

  const handleExternalSubmit = () => {
    formRef.current?.submit();
  };

  const handleCheckboxChange = (checkedValues: any) => {
    setCheckedMembers(checkedValues);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
  };

  useEffect(() => {
    const numChecked = checkedMembers.length;
    const dividedAmount = numChecked > 0 ? amount / numChecked : 0;

    const updatedAmounts: { [key: string]: number } = {};
    checkedMembers.forEach((memberId) => {
      updatedAmounts[memberId] = dividedAmount;
    });

    setDistributedAmounts(updatedAmounts);
  }, [amount, checkedMembers]);

  const onFinish = (values: any) => {
    handleOk({
      ...values,
      paid_by: members.find((i) => i.id == values.paid_by) || values.paid_by,
    });
  };

  return (
    <Modal
      title={title}
      open={isModalOpen}
      onCancel={handleCancel}
      centered
      footer={[
        <Button key="cancel" disabled={loading} onClick={handleCancel}>
          {cancelTxt || "Return"}
        </Button>,
        <Button
          key="save"
          type="primary"
          loading={loading}
          onClick={handleExternalSubmit}
        >
          {submitTxt}
        </Button>,
      ]}
    >
      {!_.isEmpty(text) && <p className="py-5">{text}</p>}
      <Form ref={formRef} className="mt-5" onFinish={onFinish}>
        <Form.Item
          label="Title"
          rules={[requireFormField("Required")]}
          name="title"
        >
          <Input placeholder={"E.g Drinks"} />
        </Form.Item>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label="Amout"
              rules={[requireFormField("Required")]}
              name="amount"
            >
              <Input
                placeholder={"0.0 $"}
                type="number"
                onChange={handleAmountChange}
              />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Type"
              rules={[requireFormField("Required")]}
              name="type"
            >
              <Select placeholder={"Shopping"} className="">
                {expense_types.map((a) => (
                  <Select.Option key={`types-${a}`} value={a}>
                    {a}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Paid By"
          rules={[requireFormField("Required")]}
          name="paid_by"
        >
          <Select placeholder={"Paid By ?"}>
            {members.map((a) => (
              <Select.Option key={`paid_by-${a.id}`} value={a.id}>
                {a.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <h4>Split</h4>
        <Checkbox.Group value={checkedMembers}>
          <Row>
            {members.map((member) => (
              <Col span={24} key={member.id}>
                <Checkbox value={member.id}>{member.name}</Checkbox>
                {checkedMembers.includes(member.id) && (
                  <span style={{ marginLeft: "10px" }}>
                    ${distributedAmounts[member.id]?.toFixed(2) || "0.00"}
                  </span>
                )}
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form>
    </Modal>
  );
};

export default ExpenseModal;

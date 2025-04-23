import { Button, Form, Input, Modal, Select, List } from "antd";
import { useState } from "react";
import { IUser } from "../types/auth.type";

type Props = {
    isModalOpen: boolean;
    handleOk: (members: IUser[]) => void;
    handleCancel: () => void;
    groupName: string
    setGroupName: (name: string) => void;
    availableMembers: Member[];
};

const GroupModal = (props: Props) => {
    const { isModalOpen, handleOk, handleCancel, setGroupName, availableMembers, groupName } = props;
    const [form] = Form.useForm();
    const [selectedMemberId, setSelectedMemberId] = useState<number | undefined>(undefined);
    const [addedMembers, setAddedMembers] = useState<Member[]>([]);
    const [membersError, setMembersError] = useState<string | null>(null);

    const onOk = () => {
        form.validateFields()
            .then(() => {
                if (addedMembers.length === 0) {
                    setMembersError("Please add at least one member.");
                    return;
                }
                setMembersError(null);
                handleOk(addedMembers);
                setAddedMembers([]);
                setGroupName("")
            })
            .catch(() => { });
    };

    const handleAddMember = () => {
        if (selectedMemberId) {
            const member = availableMembers.find((m) => m.id === selectedMemberId);
            if (member && !addedMembers.some((m) => m.id === member.id)) {
                setAddedMembers([...addedMembers, member]);
                setSelectedMemberId(undefined);
                setMembersError(null);
            }
        }
    };

    const handleRemoveMember = (id: number) => { setAddedMembers(addedMembers.filter((m) => m.id !== id)); };

    return (
        <Modal title="Create New Group" open={isModalOpen} onOk={onOk} onCancel={handleCancel} >
            <Form form={form}>
                <Form.Item label="Group Name:" name="groupName"
                    rules={[{ required: true, message: "Please enter a group name" }]} >
                    <Input placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                </Form.Item>
                <Form.Item label="Members:">
                    <div style={{ display: "flex", gap: "8px" }}>
                        <Select
                            placeholder="Select a member"
                            value={selectedMemberId}
                            onChange={setSelectedMemberId}
                            style={{ flex: 1 }}
                        >
                            {availableMembers.map((member) => (
                                <Select.Option key={member.id} value={member.id}>{member.first_name + " " + member.last_name}</Select.Option>
                            ))}
                        </Select>
                        <Button onClick={handleAddMember} type="primary">Add</Button>
                    </div>
                    {membersError && (
                        <div style={{ color: "red", marginTop: "8px" }}>
                            {membersError}
                        </div>
                    )}
                </Form.Item>

                {addedMembers.length > 0 && (
                    <List bordered dataSource={addedMembers} renderItem={(member) => (
                        <List.Item
                            actions={[
                                <Button type="link" danger onClick={() => handleRemoveMember(member.id)} >
                                    Remove
                                </Button>,
                            ]}
                        >
                            {member.first_name + " " + member.last_name}
                        </List.Item>
                    )}
                    />
                )}
            </Form>
        </Modal>
    );
};

export default GroupModal;
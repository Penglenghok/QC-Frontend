import { Button } from "antd"
import { Group } from "../pages/Home/Group"
import '../pages/Home/Group.css'
import { useNavigate } from "react-router-dom"
import { IGroup } from "../types/group.type"
import { useAtom } from "jotai"
import { selectedGroupAtom } from "../atom/group.atom"

type Props = {
    groups: IGroup[]
    handleDelete: (groupId: number) => void
}



const GroupList = (props: Props) => {
    const navigate = useNavigate();
    const [group, setGroup] = useAtom(selectedGroupAtom);

    const onGroupDetail = (item: IGroup) => {
        navigate(`/expense/${item.id}`);
        setGroup(item);
    };
    const { groups, handleDelete } = props
    return (
        <div className='groups_list-wrapper'>
            <h3 className='mb-0'>Groups:</h3>
            {
                groups.map((group) => (
                    <div className='groups_list-item' key={group.id}>
                        <div className='group_detail'>
                            <div className='group_title'>{group.name}</div>
                        </div>

                        <Button type="link" onClick={() => onGroupDetail(group)} >
                            Details
                        </Button>
                        {/* <Button type="link" danger onClick={() => handleDelete(group.id)} >
                            Remove
                        </Button> */}
                    </div>
                ))
            }
        </div>
    )
}

export default GroupList
import { Loading, Switch, Table, useTheme } from "@nextui-org/react";
import { useState, VFC } from "react";
import { CheckmarkOutline, CloseOutline } from "react-ionicons";
import useSWR from "swr";
import { AttendantType } from "../../types/types";
import fetchWithToken from "../lib/fetchWithToken";

const BooleanCell: VFC<{ value: boolean }> = (props) => {
    const { theme } = useTheme();
    return props.value ? (
        <CheckmarkOutline color={theme?.colors.green700.value} />
    ) : (
        <CloseOutline color={theme?.colors.red700.value} />
    );
};

const SwitchCell: VFC<{ id: string; value: boolean }> = ({ id, value }) => {
    const [active, setActive] = useState(value);

    const handleChange = async () => {
        const data = await fetchWithToken(
            `${process.env.API_URL}/attendees/${id}/active`,
            { body: JSON.stringify({ active: !active }) }
        ).catch((e) => console.log(e));

        if (data) setActive(data.active);
    };

    return <Switch initialChecked={value} onClick={handleChange} />;
};

const UserTable: VFC = (props) => {
    const { data, error } = useSWR<AttendantType[]>(
        `${process.env.API_URL}/admin/attendees`,
        fetchWithToken
    );

    const columns = ["NAME", "EMAIL", "GROUP", "REGISTERED", "PHOTO CONSENT"];

    if (!data) {
        return <Loading />;
    }
    return (
        <Table
            aria-label="Example table with static content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header>
                {columns.map((col) => (
                    <Table.Column key={col}>{col}</Table.Column>
                ))}
            </Table.Header>
            <Table.Body>
                {data.map((user) => (
                    <Table.Row key={user.id}>
                        <Table.Cell>{user.name}</Table.Cell>
                        <Table.Cell>{user.email}</Table.Cell>
                        <Table.Cell>{user.group}</Table.Cell>
                        <Table.Cell>
                            <BooleanCell value={user.registered} />
                        </Table.Cell>
                        <Table.Cell>
                            <BooleanCell value={user.photo_consent} />
                        </Table.Cell>
                        <Table.Cell>
                            <SwitchCell id={user.id} value={user.active} />
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    );
};

export default UserTable;

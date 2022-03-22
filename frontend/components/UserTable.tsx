import { Loading, Table, useTheme } from "@nextui-org/react";
import { VFC } from "react";
import { CheckmarkOutline, CloseOutline } from "react-ionicons";
import useSWR from "swr";
import { AttendantType } from "../../types/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const BooleanCell: VFC<{ value: boolean }> = (props) => {
  const { theme } = useTheme();
  return props.value ? (
    <CheckmarkOutline color={theme?.colors.green700.value} />
  ) : (
    <CloseOutline color={theme?.colors.red700.value} />
  );
};

const UserTable: VFC = (props) => {
  const { data, error } = useSWR<AttendantType[]>(
    "https://retoolapi.dev/7uXNmU/data", // TODO: Change this URL
    fetcher
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
              <BooleanCell value={user.foto_consent} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default UserTable;

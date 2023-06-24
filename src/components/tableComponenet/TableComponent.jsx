import {
  ActionIcon,
  Avatar,
  Group,
  Paper,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

const TableComponent = ({
  headCells,
  rowData,
  setSingleInvoice,
  setViewBookingModal,
}) => {
  console.log("Row Data", rowData);
  const [rowDatas, setRowDatas] = useState(rowData);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });
  const [searchPhrase, setSearchPhrase] = useState("");
  const sortNumericValue = (label) => {
    setSorted({
      sorted: label,
      reversed: !sorted.reversed,
    });

    const rowDataCopy = [...rowDatas];
    rowDataCopy.sort((dataA, dataB) => {
      if (sorted.reversed === true) {
        return dataB[label] - dataA[label];
      }
      return dataA[label] - dataB[label];
    });
    setRowDatas(rowDataCopy);
  };
  const sortStringValue = (label) => {
    setSorted({ sorted: label, reversed: !sorted.reversed });
    const rowDataCopy = [...rowDatas];
    rowDataCopy.sort((dataA, dataB) => {
      if (sorted.reversed === true) {
        return dataA[label].localeCompare(dataB[label]);
      }
      return dataB[label].localeCompare(dataA[label]);
    });
    setRowDatas(rowDataCopy);
  };

  const search = (event) => {
    const matchedData = rowData?.filter((data) => {
      console.log("Object.values(data)", Object.values(data).length);
      for (let i = 0; i < Object.values(data).length; i++) {
        if (
          Object.values(data)
          [i].toString()
            .toLowerCase()
            .includes(event.target.value.toString().toLowerCase())
        ) {
          return true;
        }
      }
    });
    setSorted({ sorted: "", reversed: false });
    setRowDatas(matchedData);
    setSearchPhrase(event.target.value);
  };
  // useEffect(() => {}, [rowDatas]);
  return (
    <Paper withBorder>
      <Paper p={"xs"} mb={"xs"}>
        <Group position="right">
          <TextInput
            value={searchPhrase}
            onChange={search}
            icon={<IconSearch />}
            label={"Search"}
            placeholder={"Search"}
          />
        </Group>
      </Paper>
      <Table striped withBorder withColumnBorders>
        <thead>
          <tr>
            {headCells?.map((head, index) => {
              return (
                <th
                  key={index}
                  onClick={() => {
                    console.log("I have been cilcked");
                    head.numeric === true
                      ? sortNumericValue(head.id)
                      : sortStringValue(head.id);
                  }}
                >
                  <Group
                    spacing={3}
                    align={"center"}
                    position={head.numeric === true ? "right" : "left"}
                  >
                    <Text>{head?.label}</Text>{" "}
                    {!sorted.reversed === true && sorted.sorted === head.id ? (
                      <IconArrowDown />
                    ) : (
                      <IconArrowUp />
                    )}
                  </Group>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rowDatas?.map((row, index) => {
            return (
              <tr key={index}>
                {headCells?.map((head, index) => {
                  return head.id === "actions" ? (
                    <td key={index}>
                      <ActionIcon
                        onClick={() => {
                          console.log("I have been clicked");
                          console.log(row);
                          setViewBookingModal(true);
                          setSingleInvoice(row?.subVenueBookingObject);
                        }}
                      >
                        {head.view}
                      </ActionIcon>
                    </td>
                  ) : head.id === "profileImage" ? (<td><Avatar size={"md"} radius={"xl"} src={row[head?.id]}></Avatar></td>) :

                    (
                      <td
                        align={
                          typeof row[head?.id] === "number" ? "right" : "left"
                        }
                      >
                        {head.date
                          ? row[head?.id]?.split("T")[0] +
                          " " +
                          row[head?.id]?.split("T")[1]?.split(".")[0]
                          : row[head?.id]?.toLocaleString()}
                      </td>
                    );
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Paper>
  );
};

export default TableComponent;

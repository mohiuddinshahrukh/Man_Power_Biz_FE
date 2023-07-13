/* eslint-disable react/prop-types */
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Group,
  Paper,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { IconArrowDown, IconArrowUp, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SpecificViewModal from "../modals/SpecificViewModal";
import { useDisclosure } from "@mantine/hooks";
import { deleteCallWithHeaders, getCallWithHeaders } from "../../helpers/apiCallHelpers";

const TableComponent = ({
  modalObject,
  buttonObject,
  headCells,
  getDataApiURI,

}) => {
  const [rows, setTableRows] = useState([]);
  const [sorted, setSorted] = useState({ sorted: "", reversed: false });
  const [searchPhrase, setSearchPhrase] = useState("");
  const [data, setData] = useState({});

  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCallWithHeaders(`${getDataApiURI}`).then(setTableRows).then(setLoading(false));
  }, [refresh])



  const deleteFunction = async (uri, id) => {
    await deleteCallWithHeaders(uri, id, refresh, setRefresh);

  }
  const sortNumericValue = (label) => {
    setSorted({
      sorted: label,
      reversed: !sorted.reversed,
    });

    const rowDataCopy = [...rows];
    rowDataCopy.sort((dataA, dataB) => {
      if (sorted.reversed === true) {
        return dataB[label] - dataA[label];
      }
      return dataA[label] - dataB[label];
    });
    setTableRows(rowDataCopy);
  };
  const sortStringValue = (label) => {
    setSorted({ sorted: label, reversed: !sorted.reversed });
    const rowDataCopy = [...rows];
    rowDataCopy.sort((dataA, dataB) => {
      if (sorted.reversed === true) {
        return dataA[label].localeCompare(dataB[label]);
      }
      return dataB[label].localeCompare(dataA[label]);
    });
    setTableRows(rowDataCopy);
  };

  const search = (event) => {
    const matchedData = rows?.filter((data) => {
      // console.log("Object.values(data)", Object.values(data)?.length);
      for (let i = 0; i < Object.values(data)?.length; i++) {
        if (
          Object.values(data)[i].toString()
            .toLowerCase()
            .includes(event.target.value.toString().toLowerCase())
        ) {
          return true;
        }
      }
    });
    setSorted({ sorted: "", reversed: false });
    setTableRows(matchedData);
    setSearchPhrase(event.target.value);
  };

  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Paper pos={"relative"}>
      <SpecificViewModal opened={opened} open={open} close={close} title={modalObject.title} data={data} centered={"centered"} />
      <Paper p={"xs"} mb={"xs"}>
        <Group position="apart">
          <Button
            disabled={buttonObject.hidden}
            uppercase={buttonObject.uppercase} size={buttonObject.size} component={Link} to={buttonObject.path} leftIcon={buttonObject.iconPosition === "left" ? buttonObject.icon : null}
            rightIcon={buttonObject.iconPosition === "right" ? buttonObject.icon : null} >{buttonObject?.title}</Button>
          <TextInput
            value={searchPhrase}
            onChange={search}
            icon={<IconSearch />}
            label={"Search"}
            placeholder={"Search"}
          />
        </Group>
      </Paper>
      {rows?.length > 0 && !loading ? <Table striped withBorder withColumnBorders>
        <thead>
          <tr style={{ wordBreak: "keep-all" }}>
            {headCells?.map((head, index) => {
              return (
                head.id !== "actions" ? <th
                  key={index}
                  onClick={() => {
                    // console.log("I have been cilcked");
                    head.numeric === true
                      ? sortNumericValue(head.id)
                      : sortStringValue(head.id);
                  }}
                >
                  <Group
                    noWrap
                    spacing={3}
                    align={"center"}
                    position={head.numeric === true ? "right" : "left"}
                  >
                    <Text style={{}}>{head?.label}</Text>{" "}
                    {!sorted.reversed === true && sorted.sorted === head.id ? (
                      <IconArrowDown size={16} />
                    ) : (
                      <IconArrowUp size={16} />
                    )}
                  </Group>
                </th> : <th
                  key={index}

                >
                  <Group
                    noWrap
                    spacing={3}
                    align={"center"}
                    position={head.numeric === true ? "right" : "left"}
                  >
                    <Text style={{}}>{head?.label}</Text>
                  </Group>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows?.map((row, outerIndex) => {
            return (
              <tr key={outerIndex}>
                {headCells?.map((head, innerIndex) => {
                  return head.id === "actions" ? (
                    <td key={innerIndex}>
                      <Group noWrap spacing={0}>
                        {head.view && <ActionIcon
                          onClick={() => {
                            open()
                            setData(row)
                          }}
                        >
                          {head.view.icon}
                        </ActionIcon>}
                        {head.edit &&
                          head.edit ? <ActionIcon component={Link} to={`${head.edit.editRoute}${row._id}`}

                          >
                          {head.edit.icon}
                        </ActionIcon> : null
                        }
                        {head.delete &&
                          head.delete ? <ActionIcon
                            onClick={() => {
                              deleteFunction(head.delete.deleteURI, row._id)
                            }}
                          >
                          {head.delete.icon}
                        </ActionIcon> : null
                        }
                      </Group>
                    </td>
                  ) : <td
                    align={head?.numeric === true ? "right" : "left"}
                  >

                    {console.log(head.id.includes("status"))}
                    {
                      head.id === "profileImage" ? <Avatar size={"md"} radius={"xl"} src={row[head?.id]}></Avatar> : head.id === "image" ? <Avatar size={"md"} radius={"xl"} src={row[head?.id]}></Avatar> : head.id === "coverImage" ? <Avatar size={"md"} radius={"xl"} src={row[head?.id]}></Avatar> :
                        head.id?.toLowerCase()?.includes("status") ? <Badge variant="filled" color={row[head.id] === true ? "green" : "red"}>{row[head.id] === true ? "Active" : "Blocked"}</Badge> :
                          <Text lineClamp={2}>{head.date
                            ? row[head?.id]?.split("T")[0] +
                            " " +
                            row[head?.id]?.split("T")[1]?.split(".")[0]
                            : row[head?.id]?.toLocaleString()}</Text>


                    }
                  </td>
                })}
              </tr>
            );
          })}
        </tbody>
      </Table> : <Title align="center" p={"xl"}>{!loading ? "No data to display" : "Loading"}</Title>}
    </Paper >
  );
};

export default TableComponent;

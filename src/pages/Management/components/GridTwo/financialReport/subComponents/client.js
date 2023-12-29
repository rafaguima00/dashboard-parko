import Top from "../../../../../../components/top/top";
import { client } from "../../../../map/tableClients";
import { Table, Icon, Body } from "../style";
import { FiEye } from "react-icons/fi";
import { TbDownload } from "react-icons/tb";

const Client = (props) => {

    const { neutralColor } = props;

    return (
        <>
            <Top 
                children="Clientes"
                textcolor={neutralColor}
            />
            <span>
                <Table>
                    <tr>
                        <th>Relatório</th>
                        <th>Descrição</th>
                        <th>Ação</th>
                    </tr>
                    <Body>
                        {client.map(item => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>
                                    {item.id === 0 && 
                                        <Icon onClick={() => {/* it's working */}}>
                                            <TbDownload color={neutralColor} size={19}/>
                                        </Icon>
                                    }
                                    <Icon onClick={() => {/* it's working */}}>
                                        <FiEye color={neutralColor} size={19}/>
                                    </Icon>
                                </td>
                            </tr>
                        ))}
                    </Body>
                </Table>
            </span>
        </>
    )
}

export default Client;
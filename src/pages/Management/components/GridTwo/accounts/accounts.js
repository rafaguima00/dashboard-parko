import { Div, Span } from "../../../style";
import { theme } from "../../../../../theme/theme";
import InputGroup from "./components/groupInput";
import TableAccount from "./components/table";
import Modal from "../../../../../components/Modal";
import { useState } from "react";
import FilterDate from "./form/filterDate";
import NovaConta from "./form/novaConta";

const Accounts = () => {

    const { neutralColor, primaryColor } = theme;
    const [filterDate, setFilterDate] = useState(false);
    const [count, setCount] = useState(false);

    return (
        <Span>
            <Div height={100}>
                <InputGroup 
                    neutralColor={neutralColor} 
                    primaryColor={primaryColor} 
                    setFilterDate={setFilterDate} 
                    setCount={setCount}
                />
                <TableAccount neutralColor={neutralColor}/>
                <Modal
                    isOpen={filterDate}
                    setOpen={setFilterDate}
                    title={"Filtrar Datas"}
                    maxWidth={"30rem"}
                >
                    <FilterDate colors={{ primaryColor, neutralColor }} />
                </Modal>
                <Modal
                    isOpen={count}
                    setOpen={setCount}
                    title={"Nova Conta"}
                    maxWidth={"52rem"}
                >
                    <NovaConta colors={{ primaryColor, neutralColor }}/>
                </Modal>
            </Div>
        </Span>
    )
}

export default Accounts;
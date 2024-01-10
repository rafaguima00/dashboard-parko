import { useState } from "react";
import { Div, Span } from "../../../style";
import { theme } from "../../../../../theme/theme";
import InputGroup from "./components/groupInput";
import TableAccount from "./components/table";
import Modal from "../../../../../components/Modal";
import NewHeritage from "./form/new";
import EditHeritage from "./form/edit";

const Heritage = () => {

    const { neutralColor, primaryColor } = theme;

    const [newItem, setNewItem] = useState(false);
    const [editItem, setEditItem] = useState(false);
    const [chosenItem, setChosenItem] = useState({});

    return (
        <Span>
            <Div height={100}>
                <InputGroup neutralColor={neutralColor} primaryColor={primaryColor} setNewItem={setNewItem} />
                <TableAccount neutralColor={neutralColor} setEditItem={setEditItem} setChosenItem={setChosenItem}/>
                <Modal
                    isOpen={newItem}
                    setOpen={setNewItem}
                    title={"Novo Patrimônio"}
                    maxWidth={"52rem"}
                >
                    <NewHeritage colors={{ primaryColor, neutralColor }} />
                </Modal>
                <Modal
                    isOpen={editItem}
                    setOpen={setEditItem}
                    title={"Editar Patrimônio"}
                    maxWidth={"52rem"}
                >
                    <EditHeritage colors={{ primaryColor, neutralColor }} chosenItem={chosenItem} />
                </Modal>
            </Div>
        </Span>
    )
}

export default Heritage;
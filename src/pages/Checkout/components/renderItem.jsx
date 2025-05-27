import { ElementList, ItemList } from "../style"
import { formatCurrency } from "../../../utils/FormatCurrency"
import DividaCliente from "./dividaCliente"
import { mapDateTime } from "../../../utils/MapDateTime"

const RenderItem = (props) => {
    const { 
        item,
        clicked,
        setClicked,
        firstWord,
        debtClient,
        handleOnClick,
        valuesDebt,
        verificarDividas
    } = props

    return <>
        {clicked === item.id ? 
            <DividaCliente 
                debtClient={debtClient} 
                item={item} 
                valuesDebt={valuesDebt}
                setClicked={setClicked}
                clicked={clicked}
                verificarDividas={verificarDividas}
            /> :
            <ElementList 
                backgroundcolor={"#f4f4f4"}
                textcolor={"#7c7c7c"}
                onClick={() => handleOnClick(item)}
            >
                <ItemList>{item.id}</ItemList>
                <ItemList>{item.name}</ItemList>
                <ItemList>{item.name_vehicle}</ItemList>
                <ItemList>{item.license_plate}</ItemList>
                <ItemList>{mapDateTime(item)}</ItemList>
                <ItemList>{formatCurrency(item.value, 'BRL')}</ItemList>
                <ItemList>{firstWord.split(" ")[0]}</ItemList>
            </ElementList>
        }
    </>
}

export default RenderItem
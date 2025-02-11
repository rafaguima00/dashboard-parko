import { ElementList, ItemList } from "../style"
import { formatCurrency } from "../../../services/formatCurrency"
import DividaCliente from "./dividaCliente"

const RenderItem = (props) => {
    const { 
        item,
        clicked,
        setClicked,
        firstWord,
        debtClient,
        handleOnClick,
        valuesDebt
    } = props

    const mapDateTime = (item) => {

        if(item.data_entrada === "" && item.hora_entrada === "") {
            return ""
        }
        
        if(item.data_entrada === "") {
            return `dd/mm/yyyy, ${item.hora_entrada}`
        }

        if(item.hora_entrada === "") {
            return `${item.data_entrada}, 00:00:00`
        }

        return `${item.data_entrada}, ${item.hora_entrada}`
    }

    return <>
        {clicked === item.id ? 
            <DividaCliente 
                debtClient={debtClient} 
                item={item} 
                valuesDebt={valuesDebt}
                setClicked={setClicked}
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
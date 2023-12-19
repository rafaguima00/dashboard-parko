import TopForm from "../../components/topForm";
import { ContainerForm } from "../style";
import { ContentView } from "./style";
import { theme } from "../../../../theme/theme";
import FormColaborator from "./components/form";
import ListColaborators from "./components/listColaborators";

const ColaboratorsForm = () => {
    return (
        <ContainerForm>
            <TopForm children="Nossos colaboradores" />
            <ContentView>
                <ListColaborators theme={theme}/>
                <FormColaborator theme={theme}/>
            </ContentView>
        </ContainerForm>
    )
}

export default ColaboratorsForm;
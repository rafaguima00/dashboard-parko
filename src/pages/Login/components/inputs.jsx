import TextInput from "../../../components/Input"

const Inputs = ({ data, setData }) => {

    const cinzaClaro = "#7D7D7D" 

    return <>
        <div>
            <TextInput 
                textColor={cinzaClaro} 
                label="E-mail"
                type="email"
                placeholder="Digite seu e-mail"
                width={288}
                borderColor={cinzaClaro}
                borderWidth={2}
                value={data.email}
                setValue={e => {
                    setData(data => (
                        { ...data, email: e.target.value }
                    ))
                }}
            />
            <TextInput 
                textColor={cinzaClaro}
                label="Senha"
                type="password"
                placeholder="Digite sua senha"
                width={288}
                borderColor={cinzaClaro}
                borderWidth={2}
                value={data.password}
                setValue={e => {
                    setData(data => (
                        { ...data, password: e.target.value }
                    ))
                }}
                margin={"1rem 0"}
            />
        </div>
    </>
}

export default Inputs
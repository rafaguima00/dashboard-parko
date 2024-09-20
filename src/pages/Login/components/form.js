import { AreaForm } from "../style"
import ForgotPassword from "./forgotPassword"
import ContentForm from "./formContent"
import { useState } from "react"
import SendLink from "./sendLink"
import NewPassword from "./newPassword"
import Confirmation from "./confirmation"

const Form = () => {

    const [page, setPage] = useState(5)

    return (
        <AreaForm>
            {page === 1 && <ContentForm setPage={setPage} />}
            {page === 2 && <ForgotPassword setPage={setPage} />}
            {page === 3 && <SendLink setPage={setPage} />}
            {page === 4 && <NewPassword setPage={setPage} />}
            {page === 5 && <Confirmation setPage={setPage} />}
        </AreaForm>
    )
}

export default Form;
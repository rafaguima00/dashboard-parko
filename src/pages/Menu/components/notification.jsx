import { theme } from "../../../theme/theme"
import { Notification, RequestLength, Span } from "../style"
import { IoNotificationsOutline } from "react-icons/io5"

const NotificationButton = (props) => {

    const { primaryColor } = theme
    const { requests } = props

    return <>
        <Notification onClick={() => {}}>
            {requests.length > 0 &&
                <Span>
                    <RequestLength>{requests.length}</RequestLength>
                </Span>
            }
            <IoNotificationsOutline size={18} color={primaryColor} />
        </Notification>
    </>
}

export default NotificationButton
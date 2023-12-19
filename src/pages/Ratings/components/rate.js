import {
    ImageProfile,
    Profile,
    Space,
    UserName,
    Body,
    Comments
} from "../style";
import camera from "../../../assets/camera.png";
import { FaStar } from "react-icons/fa6";
import { rating } from "../../../mocks/avaliacoes";
import { theme } from "../../../theme/theme";

const Rate = () => {

    const { neutralColor, primaryColor } = theme;

    return (
        <section>
            {rating.map((item) => (
                <Body key={item.id}>
                    <Profile>
                        <ImageProfile src={camera} />
                        <Space>
                            <UserName textcolor={neutralColor}>{item.name}</UserName>
                            <FaStar color={primaryColor} title="olá ndd"/>
                        </Space>
                    </Profile>
                    <hr />
                    <Comments>
                        <p>{item.comment !== "" ? item.comment : "Sem comentários"}</p>
                    </Comments>
                </Body>
            ))

            }
        </section>
    )
}

export default Rate;
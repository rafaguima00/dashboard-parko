import {
    ImageProfile,
    Profile,
    Space,
    UserName,
    Body,
    Comments,
    Div,
    Note
} from "../style";
import camera from "../../../assets/camera.png";
import { FaStar } from "react-icons/fa6";
import { theme } from "../../../theme/theme";

const Rate = (props) => {

    const { neutralColor, primaryColor } = theme;
    const { ratings, dataClient } = props;

    const renderItems = () => {
        const findRate = ratings.filter(item => item.id_establishment === dataClient.id_establishment);

        return { findRate };
    };

    const { findRate } = renderItems();

    return (
        <section>
            {findRate.map((item) => (
                <Body key={item.id}>
                    <Profile>
                        <ImageProfile src={camera} />
                        <Space>
                            <UserName textcolor={neutralColor}>{item.name_costumer}</UserName>
                            <Div>
                                <FaStar color={primaryColor} children={item.rate} />
                                <Note>{item.rate}</Note>
                            </Div>
                        </Space>
                    </Profile>
                    <hr />
                    <Comments>
                        <p>{item.comments !== "" ? item.comments : "Sem comentários"}</p>
                    </Comments>
                </Body>
            ))

            }
        </section>
    )
}

export default Rate;
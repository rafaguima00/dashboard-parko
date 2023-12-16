import {
    ImageProfile,
    Profile,
    UserName,
    Body,
    Comments
} from "../style";
import camera from "../../../assets/camera.png";
import { FaRegStar } from "react-icons/fa";
import { rating } from "../../../mocks/avaliacoes";

const Rate = () => {
    return (
        <section>
            {rating.map((item) => (
                <Body key={item.id}>
                    <Profile>
                        <div>
                            <ImageProfile src={camera} />
                            <div>
                                <UserName>{item.name}</UserName>
                                <p></p>
                            </div>
                        </div>
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
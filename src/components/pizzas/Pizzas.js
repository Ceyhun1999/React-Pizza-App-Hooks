import { Row } from "react-bootstrap";
import Pizza from "../pizza/Pizza";

export default function Pizzas({ data, onAddToCart }) {
    return (
        <div className="pizzas py-4">
            <Row xs={1} md={2} xl={3} className="g-4">
                {data.map((item) => (
                    <Pizza key={Object.values(item.id)[0]} pizza={item} onAddToCart={onAddToCart} />
                ))}
            </Row>
        </div>
    );
}

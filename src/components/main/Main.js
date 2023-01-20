import { Container } from "react-bootstrap";
import Filter from "../filter/Filter";
import Pizzas from "../pizzas/Pizzas";

export default function Main({ data, onAddToCart, onFilter, onSearch }) {
    return (
        <main>
            <Filter onFilter={onFilter} onSearch={onSearch} />
            <Container>
                <Pizzas className="p-4" data={data} onAddToCart={onAddToCart} />
            </Container>
        </main>
    );
}

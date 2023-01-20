import { useState } from "react";
import { Card, Col, Form } from "react-bootstrap";
import ButtonAdd from "../buttonAdd/buttonAdd";

import "./Pizza.css";

export default function Pizza({ pizza, onAddToCart }) {
    const { id, name, img, desc, size, price } = pizza;
    const [sizeState, setSizeState] = useState(Object.keys(size)[0]);

    const onChangePrice = (e) => setSizeState(e.target.value);

    return (
        <Col>
            <Card className="h-100">
                <div className="card__content">
                    <img src={"./assets/img/pizzas/" + img} alt="Pizza" />
                    <div className="сard__title">
                        <h5>{name}</h5>
                    </div>
                    <p className="card__desc">{desc}</p>
                    <div className="card__splitter"></div>
                    <div className="card__shadow pb-2" />
                </div>
                <div>
                    <div className="d-flex align-items-center mb-3 px-3">
                        <Form.Select onChange={onChangePrice}>
                            {Object.keys(size).map((item) => {
                                return (
                                    <option key={id[item]} value={item}>
                                        {size[item]}
                                    </option>
                                );
                            })}
                        </Form.Select>
                        <span className="w-50 text-end fs-3">{price[sizeState]} ₼</span>
                    </div>
                    <div className="text-center pb-3">
                        <ButtonAdd
                            onAddToCart={() => {
                                onAddToCart({
                                    img: img,
                                    name: name,
                                    id: id[sizeState],
                                    price: price[sizeState],
                                    size: size[sizeState],
                                    quant: 1,
                                });
                            }}
                        />
                    </div>
                </div>
            </Card>
        </Col>
    );
}

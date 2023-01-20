import { Button, CloseButton, Modal, Table } from "react-bootstrap";

export default function Cart(props) {
    let { order, showModal, handleCloseModal, onChangeQuant, onDeleteCartItem, totalPrice, addTotalPrice } =
        props;
    return (
        <Modal
            show={showModal}
            onHide={handleCloseModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Sifarişlər</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table responsive="lg">
                    <thead>
                        <tr className="bg-warning">
                            <th>№</th>
                            <th>Şəkil</th>
                            <th>Adı</th>
                            <th>Ölçüsü</th>
                            <th>Qiyməti</th>
                            <th>Ədədi</th>
                            <th>Yekun</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((item, index) => {
                            const { id, img, name, size, price, quant } = item;
                            return (
                                <tr className="align-middle border border-light" key={id}>
                                    <td>{index + 1}</td>
                                    <td>
                                        <img
                                            style={{ width: "60px" }}
                                            src={"./assets/img/pizzas/" + img}
                                            alt=""
                                        />
                                    </td>
                                    <td>{name}</td>
                                    <td>{size}</td>
                                    <td>{price} ₼</td>
                                    <td>
                                        <div className="d-flex">
                                            <Button
                                                onClick={() => onChangeQuant(id, -1)}
                                                size="sm"
                                                variant="outline-warning border-0">
                                                ▼
                                            </Button>
                                            <span>{quant}</span>
                                            <Button
                                                onClick={() => onChangeQuant(id, 1)}
                                                size="sm"
                                                variant="outline-warning border-0">
                                                ▲
                                            </Button>
                                        </div>
                                    </td>
                                    <td>
                                        <span>{quant * price}</span>
                                        <span> ₼</span>
                                    </td>
                                    <td>
                                        <CloseButton
                                            onClick={() => {
                                                onDeleteCartItem(id);
                                            }}
                                        />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tbody>
                        <tr className="text-center border  border-light">
                            <td colSpan="8">Ümumi qiymət {totalPrice} ₼</td>
                        </tr>
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer className="border-0">
                <Button variant="secondary" onClick={handleCloseModal}>
                    Bağla
                </Button>
                <Button variant="primary" onClick={handleCloseModal}>
                    Sifarişi göndər
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

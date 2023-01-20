import { useState } from "react";
import { Container, Form } from "react-bootstrap";

export default function Filter({ onFilter, onSearch }) {
    const [value, setValue] = useState("");

    const onResetValue = () => setValue("");

    const filters = ["all", "chick", "meat", "vegan", "spicy"];
    const filtersName = ["Hamısı", " Toyuqlu", "Ət ilə", "Vegetarian", "Acılı"];
    return (
        <div className="filter border p-4 bg-dark text-light border-0">
            <Container className="pt-3">
                <Form.Control
                    onInput={(e) => {
                        onSearch(e);
                        setValue(e.target.value);
                    }}
                    value={value}
                    placeholder="Axtarış..."
                    type="text"
                />
                <br />
                <Form onChange={onFilter} className="d-md-flex justify-content-around fs-6">
                    {filters.map((type, index) => (
                        <Form.Check
                            key={type}
                            name="filter1"
                            defaultChecked={type === "all" ? "checked" : ""}
                            inline
                            label={filtersName[index]}
                            type="radio"
                            value={type}
                            onClick={onResetValue}
                        />
                    ))}
                </Form>
            </Container>
        </div>
    );
}

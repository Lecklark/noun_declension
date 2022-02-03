import { InputGroup, DropdownButton, FormControl, Dropdown } from 'react-bootstrap';

const InputBar = ({ drditems, clickAction, changeAction, value }) => {

    return (
        <InputGroup className="mb-3" >
            <DropdownButton
                variant="outline-primary"
                title="Выберите падеж"
            >
                {drditems.map((item, idx) => <Dropdown.Item
                    key={idx}
                    href="#"
                    onClick={() => clickAction(idx)}>
                    {item}
                </Dropdown.Item>)}
            </DropdownButton>
            <FormControl placeholder="Введите существительное..." value={value} onChange={changeAction} />
        </InputGroup>
    );
}

export default InputBar
import { useState } from 'react';
import useTranslate from '../hooks/useTranslate';
import InputBar from './InputBar';


const Translator = () => {

    const [value, setValue] = useState("");
    const [padej, setPadej] = useState("");
    const [result, setResult, translate] = useTranslate();
    const padejs = ["Родительный", "Дательный", "Винительный", "Творительный", "Предложный"];

    const translationHandler = (num) => {
        translate(value, num);
        setPadej(padejs[num]);
    }

    const inputChangeHandler = (e) => {
        setValue(e.target.value);
        setResult("");
    }

    return (
        <div className="translator">
            <InputBar drditems={padejs} clickAction={translationHandler} changeAction={inputChangeHandler} value={value} />
            {result && <div className="translator__result result">
                <div className="result__title">{padej} падеж слова <span>{value.toLowerCase()}</span></div>
                <div className='result__result'>{result}</div>
            </div>}
        </div>
    );
}

export default Translator
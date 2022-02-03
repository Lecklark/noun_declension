import { useState } from 'react';

function useTranslate() {
    const [result, setResult] = useState("");

    const translate = (str, num) => {
        str = str.toLowerCase().trim();
        const rules = { // правила для окончаний
            "а": ["ы", "е", "у", "ой", "е"],
            "е": ["я", "ю", "e", "ем", "и"],
            "(ш/ж/к/ч)а": ["%и", "%е", "%у", "%ой", "%е"],
            "б/в/м/г/д/л/ж/з/к/н/п/т/ф/ч/ц/щ/р/х": ["%а", "%у", "%а", "%ом", "%е"],
            "и": ["ей", "ям", "%", "ями", "ях"],
            "ый": ["ого", "ому", "%", "ым", "ом"],
            "й": ["я", "ю", "я", "ем", "е"],
            "о": ["а", "у", "%", "ом", "е"],
            "с/ш": ["%а", "%у", "%", "%ом", "%е"],
            "ы": ["ов", "ам", "%", "ами", "ах"],
            "ь": ["я", "ю", "я", "ем", "е"],
            "уль": ["ули", "уле", "улю", "улей", "уле"],
            "(ч/ш/д/т)ь": ["%и", "%и", "%ь", "%ью", "%и"],
            "я": ["и", "е", "ю", "ей", "е"]
        };
        const bigObj = {}; //будущий объект с развернутыми ключами
        let newStr;

        for (let key in rules) {
            if (key.includes('(')) {
                key.slice(key.indexOf('(') + 1, key.indexOf(')')) //возвращает то, что находится между ()
                    .split('/').forEach(item => {
                        bigObj[`${"(" + item + ")" + key.slice(key.indexOf(')') + 1)}`] = rules[key]; //формируем объект с развернутыми ключами
                    });
                continue
            }
            key.split('/').forEach(item => bigObj["(" + item + ")"] = rules[key]);
        }

        for (let key in bigObj) {
            const normKey = key.replace("(", "").replace(")", ""); //для проверок избавляемся в ключах от ()
            if (String(str.slice(-normKey.length)) === String(normKey)) {
                newStr = str.slice(0, -normKey.length) + bigObj[key][num];
                newStr = newStr.replace("%", key.slice(key.indexOf("(") + 1, key.indexOf(")")));
            }
        }
        setResult(newStr);
    }

    return [result, setResult, translate];
}

export default useTranslate
import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/mode';
import 'ace-builds/src-noconflict/ext-modelist'

import 'ace-builds/src-noconflict/theme-monokai';
import Loader from './Loader';
const CodeEditor = () => {
    const data = ["c++", "python", "javascript"]
    const [message, setMessage] = useState('');
    const [value, setValue] = useState('');
    const [lang1, setLang1] = useState('c++');
    const [lang2, setLang2] = useState("c++");
    const [loader, setLoader] = useState(true);
    // const [lang, setLang] = useState(python);
    // const [secondlang, setSecondlang] = useState(javascript);

    const handleCodeChange = (newCode) => {
        setValue(newCode);
    };


    const getMessage = async () => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value,
                codelang1: "python",
                codelang2: lang1
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {
            const response = await fetch('http://localhost:8080/completions', options)
            const data = await response.json()
            setMessage(data.choices[0].message.content)
            setLoader(true)
            console.log("response done")
        }

        catch (error) {
            console.log(error)
        }

        console.log(message)
    }

    // const getLang = (e) => {
    //     setLang1(e.target.value)
    //     console.log("this is lang 1", lang1)
    // }
    return (
        <>
            <h1>Code Convertor Using chatgpt</h1>
            <div>
                <div>
                    <h2>Select lang to convert from </h2>
                    <select onChange={(e) => {
                        const new1 = e.target.value;
                        console.log("current value", new1)
                        setLang1(new1)
                        console.log("this is the value in usestate", lang1)
                    }}>
                        {data.map((element, index) => <option key={index} >
                            {element}
                        </option>)}
                    </select>
                </div>
                <div>
                    <h2>select lang to convert to </h2>
                    <select onChange={(e) => {
                        const new2 = e.target.value;
                        console.log("current value", new2)
                        setLang2(new2)
                        console.log("this is the value in usestate", lang2)
                    }}>
                        {data.map((data, index) => <option key={index}>{data}</option>)}
                    </select>
                </div>
            </div>
            <div className='flex'>
                <AceEditor
                    mode="python"
                    theme="monokai"
                    onChange={handleCodeChange}
                    value={value}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />
                <div onClick={getMessage}>Submit</div>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    value={message}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    readOnly={{ readOnly: true }}
                />
            </div>

        </>
    );
};

export default CodeEditor;

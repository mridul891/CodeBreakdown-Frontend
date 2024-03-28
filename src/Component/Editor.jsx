import { useState } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-python';
// import 'ace-builds/src-noconflict/mode';
import 'ace-builds/src-noconflict/ext-modelist'

import 'ace-builds/src-noconflict/theme-monokai';
// import Loader from './Loader';
const CodeEditor = () => {
    const data = ["c++", "python", "javascript"]
    const [message, setMessage] = useState('');
    const [value, setValue] = useState('');
    const [firstlang, setFirstlang] = useState("python");
    const [secondlang, setSecondlang] = useState("javascript");
    const [index, setIndex] = useState(0);
    const [isloggedin, setIsloggedin] = useState(false);
    const handleCodeChange = (newCode) => {
        setValue(newCode);
    };


    const getMessage = async () => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value,
                codelang1: firstlang,
                codelang2: secondlang
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await fetch('https://codebreakdown-backend.onrender.com/completions/convert', options)
            const data = await response.json()
            setMessage(data.choices[0].message.content)
            setIndex(prev => prev + 1)
            console.log("THe try left is", index)
            console.log("response done")
        }

        catch (error) {
            setIndex(prev => prev + 1)
            console.log("The try left is", index)
            console.log(error)
        }

        console.log(message)
        console.log(index)
    }

    return (
        <>
            {console.log(isloggedin) ?
                <div className='bg-[#000] h-[100vh] w-[100vw]'>
                    <div className='text-white'>
                        <div className=''>
                            <h2>Select lang to convert from </h2>
                            <select onChange={(e) => {
                                // setting up the value of the language
                                setFirstlang(e.target.value);
                            }}>
                                {data.map((element, index) => <option key={index} >
                                    {element}
                                </option>)}
                            </select>
                        </div>
                        <div>
                            <h2>select lang to convert to </h2>
                            <select onChange={(e) => {
                                // this is written to set the value of the second language
                                setSecondlang(e.target.value)
                            }}>
                                {data.map((data, index) => <option key={index}>{data}</option>)}
                            </select>
                        </div>
                    </div>
                    <div>
                        {
                            index < 5 ?
                                <div className='flex'>
                                    <AceEditor
                                        mode="python"
                                        theme="monokai"
                                        onChange={handleCodeChange}
                                        value={value}
                                        name="UNIQUE_ID_OF_DIV"
                                        editorProps={{ $blockScrolling: true }}
                                    />
                                    <button onClick={getMessage} className='h-[10vw]'>Submit</button>
                                    <AceEditor
                                        mode="javascript"
                                        theme="monokai"
                                        value={message}
                                        name="UNIQUE_ID_OF_DIV"
                                        editorProps={{ $blockScrolling: true }}

                                    />
                                </div> : <h1>Login in to try More</h1>
                        }
                    </div>

                </div> : <h1>Please login</h1>}
        </>
    );
};

export default CodeEditor;

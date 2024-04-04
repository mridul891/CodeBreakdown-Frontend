import { useState } from 'react';
import AceEditor from 'react-ace';
// import './constant.js'
// import 'ace-builds/src-noconflict/mode';
import 'ace-builds/src-noconflict/ext-modelist'

import 'ace-builds/src-noconflict/theme-monokai';
import { useSelector } from 'react-redux';
import { selectUser } from '@/feature/userSlice';
import Please from './Please';
// import Loader from './Loader';
const Generator = () => {
    const [message, setMessage] = useState('');
    const [value, setValue] = useState('');
    const user = useSelector(selectUser);

    const handleCodeChange = (newCode) => {
        setValue(newCode);
    };


    const getMessage = async () => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                message: value,
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }
        try {
            const response = await fetch('https://codebreakdown-backend.onrender.com/generator/generate', options)
            const data = await response.json()
            setMessage(data.choices[0].message.content)

        }

        catch (error) {
            console.log(error)
        }

        console.log(message)
    }

    return (
        <>

            <div className='flex'>
                <AceEditor
                    mode='python'
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
            </div>

        </>


    );
};

export default Generator;

import { useState } from "react";
import AceEditor from "react-ace";
// import "./constant.js";
// import 'ace-builds/src-noconflict/mode';
import "ace-builds/src-noconflict/ext-modelist";
import modepython from "ace-builds/src-noconflict/mode-python";
import modejavascript from "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

import Please from "./Please";
import { config } from "ace-builds";
import Navbar from "./Navbar";
config.setModuleUrl("ace/mode/python", modepython);
config.setModuleUrl("ace/mode/javascript", modejavascript);
// ace.config.set('basePath', '/node_modules/ace-builds/src-min-noconflict');
// import Loader from './Loader';
const CodeEditor = () => {
  const data = [
    "c++",
    "python",
    "javascript",
    "java",
    "c",
    "PHP",
    "R",
    "SQL",
    "Go",
    "Swift",
    "Perl",
    "Ruby",
    "Rust",
  ];
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [firstlang, setFirstlang] = useState("python");
  const [secondlang, setSecondlang] = useState("javascript");
  const [index, setIndex] = useState(0);

  // const user = useSelector(selectUser);
  const token = document.cookie;
  const handleCodeChange = (newCode) => {
    setValue(newCode);
  };

  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
        codelang1: firstlang,
        codelang2: secondlang,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(
        "https://codebreakdown-backend.onrender.com/completions/convert",
        options
      );
      const data = await response.json();
      console.log(data.choices[0].message.content);
      setMessage(data.choices[0].message.content);
      setIndex((prev) => prev + 1);
      console.log("THe try left is", index);
      console.log("response done");
    } catch (error) {
      setIndex((prev) => prev + 1);
      console.log("The try left is", index);
      console.log(error);
    }
    console.log(message);
    console.log(index);
  };

  return (
    <>
      {token ? (
        <div className="flex flex-col py-5 lg:h-[100vh] lg:w-[100vw] lg:py-10 w-full bg-[#000] ">
          <div>
            
          </div>
          {/* choosing options div */}
          <div className="text-center text-white flex flex-col gap-4 mb-4 lg:items-center">
            <div className="flex gap-2 p-3">
              <h2 className="text-white text-xl font-bold">
                Select Lang To Convert From{" "}
              </h2>
              <select
                onChange={(e) => {
                  // setting up the value of the language
                  setFirstlang(e.target.value);
                }}
              >
                {data.map((element, index) => (
                  <option key={index}>{element}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-2 p-3">
              <h2 className="text-white text-xl font-bold">
                Select Lang To Convert To{" "}
              </h2>
              <select
                onChange={(e) => {
                  // this is written to set the value of the second language
                  setSecondlang(e.target.value);
                }}
              >
                {data.map((data, index) => (
                  <option key={index}>{data}</option>
                ))}
              </select>
            </div>
          </div>
          {/* CodeEditors div*/}
          <div className="flex flex-col gap-6 px-10 lg:flex-row lg:px-20">
            {/* first editor */}

            <AceEditor
              style={{ height: "60vh", width: "80vw", fontSize: "25px" }}
              mode="python"
              theme="monokai"
              onChange={handleCodeChange}
              value={value}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: false }}
            />

            <div className="h-10">
              <button onClick={getMessage} className="h-[10vw] ">
                Submit
              </button>
            </div>
            {/* Second Editor */}

            <AceEditor
              style={{ height: "60vh", width: "80vw", fontSize: "25px" }}
              mode="python"
              theme="monokai"
              value={message}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      ) : (
        <Please />
      )}
    </>
  );
};

export default CodeEditor;

import { useState } from "react";
import AceEditor from "react-ace";
import './constant.js'
// import 'ace-builds/src-noconflict/mode';
import "ace-builds/src-noconflict/ext-modelist";

import "ace-builds/src-noconflict/theme-monokai";
import { useSelector } from "react-redux";
import { selectUser } from "@/feature/userSlice";
import Please from "./Please";
// import Loader from './Loader';
const CodeEditor = () => {
  const data = ["c++", "python", "javascript"];
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const [firstlang, setFirstlang] = useState("python");
  const [secondlang, setSecondlang] = useState("javascript");
  const [index, setIndex] = useState(0);

  // const user = useSelector(selectUser);
  const token = document.cookie;
  const handleCodeChange = (newCode) => {
    console.log(newCode)
    setValue(newCode);
    console.log(value)
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
      console.log(data);
      setMessage(data.choices[0]);
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
        <div className="flex flex-col lg:h-[100vh] lg:w-[100vw]  w-full bg-[#000] ">
          {/* choosing options div */}
          <div className="text-center flex flex-col gap-4 mb-4 lg:items-center">
            <div className="flex gap-4">
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
            <div className="flex gap-11">
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
          <div className="flex flex-col gap-6 px-10 lg:flex-row">
            {/* first editor */}

            <AceEditor
              style={{ height: "60vh", width: "80vw" }}
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
              style={{ height: "60vh", width: "80vw" }}
              mode="javascript"
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

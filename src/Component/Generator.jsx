import { useState } from "react";
import AceEditor from "react-ace";
// import './constant.js'
// import 'ace-builds/src-noconflict/mode';
import "ace-builds/src-noconflict/ext-modelist";
import { TailSpin } from "react-loader-spinner";

import "ace-builds/src-noconflict/theme-monokai";
import { useSelector } from "react-redux";
import { selectUser } from "@/feature/userSlice";
import Please from "./Please";
import { Ace } from "ace-builds";
// import Loader from './Loader';
const Generator = () => {
  const [message, setMessage] = useState("");
  const [value, setValue] = useState("");
  const user = useSelector(selectUser);
  const [loading, setLoading] = useState(false);

  //   const handleCodeChange = (newCode) => {
  //     setValue(newCode);
  //   };

  const getMessage = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      setLoading(true);
      const response = await fetch(
        "https://codebreakdown-backend.onrender.com/generator/generate",
        options
      );
      const data = await response.json();
      setMessage(data.choices[0].message.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    console.log(message);
  };
  return (
    <div className="h-[100vh] w-[100vw] bg-black">
      <div className="text-white py-10 px-[20vw]">
        <label htmlFor="OrderNotes" className="sr-only">
          Order notes
        </label>

        <div className="overflow-hidden rounded-lg border shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
          <textarea
            id="OrderNotes"
            className="w-full px-4 resize-none border-none align-top focus:ring-0 sm:text-sm"
            rows="4"
            placeholder="Enter The Query to get Output"
            onChange={(e) => setValue(e.target.value)}
          ></textarea>

          <div className="flex items-center justify-end gap-2 p-3">
            <button
              type="button"
              className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
              onClick={getMessage}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="px-3 lg:px-[30vw] py-10">
          <TailSpin color="red" radius={"8px"} />
        </div>
      ) : (
        <div className="px-3 lg:px-[30vw]">
          <AceEditor
            style={{ height: "60vh", fontSize: "20px" }}
            mode="python"
            theme="monokai"
            value={message}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: false }}
          />
        </div>
      )}
    </div>
  );
};

export default Generator;

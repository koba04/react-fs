import React, { useState, useEffect } from "react";
import { ReactFS } from "../src";
import readline from "readline";

const askQuestion = (): Promise<string> => {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("input a text: ", (text: string) => {
      if (text == null) return;
      resolve(text);
      rl.close();
    });
  });
};

const App = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const answer = await askQuestion();
      console.log("answer is ", answer);
      setName(answer);
    })();
  }, [name]);
  return (
    <>
      <directory name="src">
        <file name="index.js">const hello = "hello";</file>
      </directory>
      <directory name="foo">
        {name && <file name={name}>{name}</file>}
      </directory>
      <file name="README.md"># Hello File Renderer</file>
    </>
  );
};

ReactFS.render(<App />, "./demo");

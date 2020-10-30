import styled from "styled-components";
import { useState } from "react";

import { match } from "../utils/regex";

import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [formState, setFormState] = useState({
    inputString: "abaaaabaaanbbbb",
    patternString: "aba*+bbb*",
    replacerString: "ccc",
  });
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmmit = () => {
    setResult(
      match(
        formState.inputString,
        formState.patternString,
        formState.replacerString
      )
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Visualizing Regex</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Visualizing Regex</h1>

        <InputsContainer>
          <InputDiv>
            <p for="inputString">Input string:</p>
            <input
              type="text"
              name="inputString"
              value={formState.inputString}
              onChange={(e) => handleInputChange(e)}
            />
          </InputDiv>
          <InputDiv>
            <p for="patternString">Pattern to replace:</p>
            <input
              type="text"
              name="patternString"
              value={formState.patternString}
              onChange={(e) => handleInputChange(e)}
            />
          </InputDiv>
          <InputDiv>
            <p name="replacerString">String to replace with:</p>
            <input
              type="text"
              name="replacerString"
              value={formState.replacerString}
              onChange={(e) => handleInputChange(e)}
            />
          </InputDiv>
        </InputsContainer>

        <Button
          onClick={() => handleSubmmit()}
          disabled={formState.inputString === ""}
        >
          Run
        </Button>

        <Result>
          <h3>result:</h3>
          <h1 className={styles.title}>{result}</h1>
        </Result>
      </main>
    </div>
  );
}

const Button = styled.button`
  margin-bottom: 2.3rem;

  background-color: #5362c7;
  border: none;
  border-radius: 5px;

  cursor: pointer;

  color: white;

  padding: 1rem 2rem;
  width: 100%;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InputDiv = styled.div`
  border: 2px solid #eaeaea;
  border-radius: 10px;

  padding: 1rem 2rem;

  & > p {
    text-align: center;
    margin: 0 0 0.5rem 0;
  }

  & > input {
    padding: 0.5rem;
    border: none;
    font-size: 1.2rem;

    outline: none;

    border-bottom: 2px solid #eaeaea;
  }
`;

const InputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  grid-gap: 1.5rem;

  margin-bottom: 1.5rem;
`;

const Result = styled.div`
  text-align: center;

  & > h3 {
    text-transform: uppercase;
  }

  & > h2 {
    font-size: 3rem;
  }

  & > h2,
  h3 {
    margin: 0;
  }
`;

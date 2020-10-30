import styled from "styled-components";
import { useState } from "react";

import { validateString, infixToPostfix } from "../utils/helperFuncs";

import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [formState, setFormState] = useState({
    expression: "(4+5)-2*(10*3)",
  });
  const [result, setResult] = useState("");

  const handleInputChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmmit = () => {
    // Check match here
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>CFG Syntactic Analyzer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>CFG Syntactic Analyzer</h1>

        <InputsContainer>
          <InputDiv>
            <p for="expression">Expression:</p>
            <input
              type="text"
              name="expression"
              value={formState.expression}
              onChange={(e) => handleInputChange(e)}
            />
          </InputDiv>
        </InputsContainer>

        <Button
          onClick={() => handleSubmmit()}
          disabled={formState.expression === ""}
        >
          Run
        </Button>

        <Result>
          <h3>Is it accepted by the language ___ ?</h3>
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

  width: 100%;

  padding: 1rem 2rem;

  & > p {
    text-align: center;
    margin: 0 0 0.5rem 0;
  }

  & > input {
    padding: 0.5rem;
    border: none;
    font-size: 1.2rem;

    text-align: center;

    width: 100%;

    outline: none;

    border-bottom: 2px solid #eaeaea;
  }
`;

const InputsContainer = styled.div`
  width: 100%;
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

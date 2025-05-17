import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: "Helvetica Neue", Arial, sans-serif;
  }

  body {
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  h1 {
    text-align: center;
    margin: 20px 0;
    color: #2c3e50;
  }

  h2 {
    color: #34495e;
    margin-bottom: 10px;
    font-size: 1.2em;
  }
`;

export default GlobalStyle;

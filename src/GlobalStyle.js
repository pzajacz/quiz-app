import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,700;1,400&display=swap');
  
  *{
    margin: 0;
    padding: 0;
    
  }
  body {
    padding: 100px;
    font-family: 'Open Sans', sans-serif;
  }
`;

export default GlobalStyle;
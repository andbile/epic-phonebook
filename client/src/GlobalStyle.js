import {createGlobalStyle} from "styled-components";

export const Global = createGlobalStyle`
 html{
  font-size: 16px;
 }
 
 body{
  font-size: 1rem;
  line-height: 1.3rem;
  font-family: Roboto, sans-serif;
  color: #000000;
  background-color: #fff;
  }
  
  html, body{
  height: 100%;
}

body #root{
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px 0;
}

.btn:focus{
  box-shadow: none !important;
}

.icon{
  transform: translateY(-2px);
  margin-left: 5px;
  margin-right: 5px;
}

.seller{
background-color: #28a745;
color: #ffffff;
}

.not-seller{
background-color: #007bff;
color: #ffffff;
}


`
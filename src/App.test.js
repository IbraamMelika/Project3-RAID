import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

import React from "react"
import ReactDOM from 'react-dom'

import RowRetry from './RowRetry'
import requests from './requests'

//plan on using jest to test row componant 
//plan on using jest to test search

test("row", () => {
    const div = document.createElement("div")
    ReactDOM.render(<RowRetry title="Documentaries" fetchURL={requests.fetchDocumentaries}/>, div)
});

/*
test("search", () => {
    expect(true).toBeTruthy();
});
*/
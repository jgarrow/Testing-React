import React from "react";
import * as rtl from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";

import App from "./App";

jest.mock("axios", () => {
    return {
        get: jest.fn(() =>
            Promise.resolve({
                data: {
                    next: "https://swapi.co/api/people/?page=2",
                    previous: null,
                    results: [
                        {
                            name: "Luke Skywalker"
                        }
                    ]
                }
            })
        )
    };
});

test("made an api call", async () => {
    const wrapper = rtl.render(<App />);
    await wrapper.findByText(/luke skywalker/i);
    expect(axios.get).toHaveBeenCalled();
});

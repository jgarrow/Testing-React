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

// jest.mock("axios");

test("made an api call", async () => {
    const wrapper = rtl.render(<App />);
    // const data = {
    //     data: {
    //         next: "https:swapi.co/api/people/?page=2",
    //         previous: null,
    //         results: [
    //             {
    //                 name: "Luke Skywalker"
    //             }
    //         ]
    //     }
    // };
    // axios.get.mockImplementationOnce(() => Promise.resolve(data));

    // await wrapper.findByText(/luke skywalker/i);
    await expect(axios.get).toHaveBeenCalled();
});

test("luke skywalker renders to screen", async () => {
    const wrapper = rtl.render(<App />);
    const luke = await wrapper.findByText(/luke skywalker/i);
    expect(luke).toHaveTextContent("Luke Skywalker");
});

test("next fires api call", async () => {
    const wrapper = rtl.render(<App />);
    const nextBtn = wrapper.getByText(/next/i);

    rtl.act(() => {
        rtl.fireEvent.click(nextBtn);
    });

    // const hanSolo = await wrapper.findByText(/han solo/i);
    await expect(axios.get).toHaveBeenCalled();

    // expect(hanSolo).toHaveTextContent("Han Solo");
});

import React from "react";
import ReactDOM from "react-dom";
import { App, Search, Table } from "./App";
import renderer from "react-test-renderer";

describe("App", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  it("has a valid snapshot", () => {
    const component = renderer.create(<App />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

// describe("Search component", () => {
//   const props = {
//     value: "dd",
//     oChange: () => {},
//     onSubmit: () => {}
//   };
//   it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<Search {...props}>Search</Search>, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
//   it("has a valid snapshot", () => {
//     const component = renderer.create(<Search>Search</Search>);
//     let tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });

// describe("Test component", () => {
//   const props = {
//     list1: [
//       {
//         title: "Some title",
//         pages: 100,
//         author: "Some author"
//       }
//     ],
//     list2: [
//       {
//         title: "Some title",
//         pages: 100,
//         author: "Some author"
//       }
//     ]
//   };
//   it("renders without crashing", () => {
//     const div = document.createElement("div");
//     ReactDOM.render(<Table {...props} />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
// });

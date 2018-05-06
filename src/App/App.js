// external libraries
import React, { Component } from "react";
import axios from "axios";

// app imports
import { Search } from "../Search";
import { Table } from "../Table";
import { searchUrl, frontPageUrl } from "../Utils";

// css
import "./App.css";

const CORS_API_URL = "https://cors-anywhere.herokuapp.com/";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: {
        hits: [],
        page: 0,
        nbPages: 0,
        isLoading: false
      },
      searchTerm: "",
      error: null
    };
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.searchChange = this.searchChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    const page = this.state.result.page;
    this.fetchSearchTopStories(searchTerm, page);
  }

  render() {
    // console.log("in render..");
    const { result, searchTerm } = this.state; // object destructuring

    const tableDOM = (
      <Table
        hits={result.hits}
        page={result.page}
        nbPages={result.nbPages}
        searchTerm={searchTerm}
        filterCallback={this.isSearched}
        loadMoreStories={this.fetchSearchTopStories}
      />
    );

    if (this.state.result.isLoading) {
      return <div className="loader" />;
    }
    return (
      <div className="container-grid">
        <div className="header">
          <h1 className="title"> Hacker Views</h1>
          <h3 className="subtitle">hacker news plus great views.</h3>
        </div>
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.searchChange}
            onSubmit={this.onSearchSubmit}
          />
        </div>
        {/* option 1 for conditional rendering: using ternary operator */}
        {/* {result ? tableDOM : noResultsDOM} */}
        {/* option 2 for conditional rendering: using && operator. more concise and obviates need for noResultsDOM */}
        {result && tableDOM}
      </div>
    );
  }

  // remember setState does not immediately execute.
  // hence async-await to ensure fetchSearch... is called only after state is set
  async onSearchSubmit(event) {
    event.preventDefault();

    // restart search from page 0 and reinitialise hits array to empty before new search
    await this.setState({ result: { hits: [], page: 0 } });

    this.fetchSearchTopStories(this.state.searchTerm, this.state.result.page);
  }

  inCache() {
    return this.state.cache[this.state.searchTerm];
  }

  fetchSearchTopStories(searchTerm, page) {
    //!!important: when setting state to an object that has multiple key-value pairs
    // you have to set state to each key-value pair.
    // setting the state of only one will leave the others undefined.
    // this.setState({
    //   result: {
    //     hits: this.state.result.hits,
    //     page: this.state.result.page,
    //     nbPages: this.state.result.nbPages,
    //     isLoading: true
    //   }
    // });
    // line 134-35 using destructuring is  a shortened way of achieving the same as above
    let url = null;
    const pageNumber = "&page=" + page.toString();

    if (searchTerm === "") {
      // set url to fetch front_page stories
      url = frontPageUrl + pageNumber;
    } else {
      // set url to fetch pages related to search term submitted
      
      // ..enclosing search string in double quotes to handle the possibility of multi-word search string
      searchTerm = '"' + searchTerm + '"';

      searchTerm += pageNumber;
      url = searchUrl + searchTerm;
    }
    const updatedResult = { ...this.state.result, isLoading: true };
    this.setState({ result: updatedResult });

    console.log({ url });
    axios(CORS_API_URL + url)
      .then(results => {
        console.log(results);
        this.setSearchTopStories(
          results.data.hits,
          results.data.page,
          results.data.nbPages
        );
      })
      .catch(error => this.setState({ error }));
  }

  setSearchTopStories(hits, page, nbPages) {
    // the following line is only if you want to add new results to existing results.
    // let updatedHits = [...this.state.result.hits, ...hits];
    let updatedHits = [...hits, ...this.state.result.hits];
    // updatedHits.reverse();

    this.setState({
      result: {
        hits: updatedHits,
        page: page,
        nbPages: nbPages,
        isLoading: false
      }
    });
  }

  searchChange(e) {
    console.log("In searchChange");
    console.log("e.target.value", e.target.value);
    this.setState({ searchTerm: e.target.value.toLowerCase() });
    console.log("this.state.searchTerm", this.state.searchTerm);
  }

  isSearched(searchTerm) {
    // item is the argument that filter receives, which is automatically passed to a filter's callback
    return item => item.title.toLowerCase().includes(searchTerm);
  }
}

export { App, Search, Table };

import React from "react"
import PropTypes from "prop-types"

import Debter from './Debter'

import { accountsFetch, collectorFetch } from './API/api'

class Accounts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      debters: [],
      collector: {},
      search: "",
      searchType: "First Name",
      searchValue: "first_name",
      showSearch: false,
    };
    this.updateSearch = this.updateSearch.bind(this);
    this.updateRadioSearch = this.updateRadioSearch.bind(this);
    this.searchToggle = this.searchToggle.bind(this);
  }
    componentDidMount(){
      this.dataFetch()
    }
    componentDidUpdate(prevProps, prevState){
      const { search, debters, searchType, searchValue } = this.state
      let ul = document.getElementById("debterUL");
      let li = ul.getElementsByTagName('li')
      if(prevState.searchValue != searchValue || prevState.search != search){
        for (let i = 0; i < debters.length; i++) {
          if (searchValue == "first_name"){
            const txtValue = debters[i].first_name
            if (txtValue.toUpperCase().indexOf(search.toUpperCase()) > -1) {
              li[i].style.display = "";
            } else {
              li[i].style.display = "none";
            }
            this.setState({searchType: "First Name"})
          }else if (searchValue == "last_name"){
            const txtValue = debters[i].last_name
            if (txtValue.toUpperCase().indexOf(search.toUpperCase()) > -1) {
              li[i].style.display = "";
            } else {
              li[i].style.display = "none";
            }
            this.setState({searchType: "Last Name"})
          }else if (searchValue == "ssn"){
            const txtValue = debters[i].ssn
            if(search.length > 6){
              const newSearch = `${search.slice(0,3)}-${search.slice(3,6)}-${search.slice(6,10)}`
              if (txtValue.toUpperCase().indexOf(newSearch) > -1) {
                li[i].style.display = "";
              } else {
                li[i].style.display = "none";
              }
            }else if(search.length > 3 && !search.includes("-")){
                const newSearch = `${search.slice(0,3)}-${search.slice(3,6)}`
                if (txtValue.toUpperCase().indexOf(newSearch) > -1) {
                  li[i].style.display = "";
                } else {
                  li[i].style.display = "none";
                }
            }else{
              const newSearch = search
              if (txtValue.toUpperCase().indexOf(newSearch) > -1) {
                li[i].style.display = "";
              } else {
                li[i].style.display = "none";
              }
            }

            this.setState({searchType: "SSN"})
          }
        }
      }
    }

    dataFetch(){
      const { id } = this.props.match.params
      accountsFetch(id).then(APIaccounts => {
        this.setState({
          debters: APIaccounts
         });
      })
      collectorFetch(id).then(APIcollector => {
        this.setState({
          collector: APIcollector
         });
      })

    }

    updateSearch(e){
      this.setState({
        search: this.search.value,
      });
    };
    updateRadioSearch(e){
      this.setState({
        searchValue: e.target.value
      });
    };

    searchToggle(){
      this.setState(prevState => ({
        showSearch: !prevState.showSearch
      }));
    }

  render () {
    const { debters, collector, search, searchType, showSearch } = this.state
    const { current_collector, token } = this.props

    const searchPlaceHolder = `Search by ${searchType}..`

    const myAccounts = debters.map((debter,index) => {
      return(
        <li id = "debterLI">
          <Debter
            debter = {debter}
            token = {token}
            key = {debter.ssn}
          />
        </li>
      )
    })

    return (
      <div className = "Accounts">
        { showSearch &&

          <div className = "searchDiv">
            <h3 className = "title">Search for Debter</h3>
            <input
              pattern = "[0-9\-]+"
              type = "search"
              className = "searchBar"
              onChange = {this.updateSearch}
              placeholder = {searchPlaceHolder}
              ref = {(search) => this.search = search}
              autoFocus = {true}
            />
            <h5 className = "searchBy">Search By:</h5>
            <div className = "firstNameRadio">
              <label>First Name</label>
              <input
              type="radio"
              value="first_name"
              onChange = {this.updateRadioSearch}
              checked={this.state.searchValue === 'first_name'}
              />
            </div>
            <div className = "lastNameRadio">
              <label>Last Name</label>
              <input
              type="radio"
              value="last_name"
              onChange = {this.updateRadioSearch}
              checked={this.state.searchValue === 'last_name'}
              />
            </div>
            <div className = "ssnRadio">
              <label>SSN</label>
              <input
              type="radio"
              value="ssn"
              onChange = {this.updateRadioSearch}
              checked={this.state.searchValue === 'ssn'}
              />
            </div>
            <div className = "searchExpanded">
              <button onClick = {this.searchToggle}>
                X
              </button>
            </div>
          </div>

          ||

          <div className = "searchCollapsed">
            <button onClick = {this.searchToggle}>
              Click to Search
            </button>
          </div>
        }
          <h1>{collector.first_name}'s Accounts   --{collector.username}</h1>
          <ul id = "debterUL">
            {myAccounts}
          </ul>
      </div>
    );
  }
}

export default Accounts

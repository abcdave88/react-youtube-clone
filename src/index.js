//import modules
import React, { Component } from "react";
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search'; 
//import js file
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = "AIzaSyBA7YYeaEWIcCvj-7470DzSm0wH3AoWbzM";

// Create a new componet. This componet should produce some HTML
class App extends Component{
  constructor(props){
    super(props);

    this.state = { videos : [], 
                  selectedVideo : null 
    };

    this.videoSearch('Kindred Shins');
    
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos : videos,
        selectedVideo :videos[0] 
      });
    });
  } 

  render () {
    return (
      <div>
        <SearchBar onSearchTermChange={ term => this.videoSearch(term)} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} /> 
      </div>
    );
  }
}

//Take this componet's generated HTML and put on the page 
ReactDOM.render(<App />, document.querySelector('.container'));
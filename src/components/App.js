import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import unsplash from "../apis/unsplash";
import ImageList from "./ImageList";
import VideoList from './VideoList';
import Grid from "@material-ui/core/Grid";
import 'semantic-ui-css/semantic.min.css';

class App extends React.Component {
    state = {
        videos: [],
        images: [],
        collection: [],
        selectedItems: {},
        term: null,
    }
    handleSubmit = async (termFromSearchBar) => {
        const response = await youtube.get('/search', {
            params: {
                q: termFromSearchBar
            }
        })
        const imageresponse = await unsplash.get("/search/photos", {
            params: {
               query: termFromSearchBar,
               per_page: 7
            },
         });
        this.setState({
            videos: response.data.items,
            images: imageresponse.data.results,
            term: termFromSearchBar,
        })
    };
    handleVideoSelect = (video) => {
        var term = this.state.term;
        if (!this.state.selectedItems[term]){
            this.state.selectedItems[term] = [`https://www.youtube.com/embed/${video.id.videoId}`];
        }
        else{
            this.state.selectedItems[term].push(`https://www.youtube.com/embed/${video.id.videoId}`);
        }
        this.setState({selectedItems: this.state.selectedItems});
    }

    handleImageSelect = (image) => {
        var term = this.state.term;
        if (!this.state.selectedItems[term]){
            this.state.selectedItems[term] = [image.links.download];
        }
        else{
            this.state.selectedItems[term].push(image.links.download);
        }
        this.setState({selectedItems: this.state.selectedItems});
    }

    handleClick () {
        // console.log("hi");
        // console.log(this.state);
    }

    render() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <ImageList handleVideoSelect={this.handleImageSelect} images={this.state.images.slice(0,3)} />
                            </Grid>
                            <Grid item xs={4}>
                                <ImageList handleVideoSelect={this.handleImageSelect} images={this.state.images.slice(3,6)} />
                            </Grid>
                            <Grid item xs={4}>
                                <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                                <ImageList handleVideoSelect={this.handleImageSelect} images={this.state.images.slice(6,7)} />
                            </Grid>
                        </Grid>
                        <button onClick={this.handleClick}>
                            Clear saved
                        </button>
                        <div>
                              <p>Selected Items: {JSON.stringify(this.state.selectedItems)}</p>
                        </div>
                </div>
            </div>
        )
    }
}

export default App;
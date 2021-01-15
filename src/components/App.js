import React from 'react';
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import unsplash from "../apis/unsplash";
import VideoList from './VideoList';
import ImageList from "./ImageList";
import VideoDetail from './VideoDetail';
import Grid from "@material-ui/core/Grid"

class App extends React.Component {
    state = {
        videos: [],
        images: [],
        collection: [],
        selectedVideo: null
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
            },
         });
        this.setState({
            videos: response.data.items,
            images: imageresponse.data.results,
        })
    };
    handleVideoSelect = (video) => {
        this.setState({selectedVideo: video})
    }

    render() {
        return (
            <div className='ui container' style={{marginTop: '1em'}}>
                <SearchBar handleFormSubmit={this.handleSubmit}/>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                            </Grid>
                            <Grid item xs={4}>
                            <ImageList images={this.state.images} />
                            </Grid>
                        </Grid>
                        {/* <div className="eleven wide column">
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div> */}
                        {/* <div className="five wide column">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div>
                        <div className="five wide column">
                            <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                        </div> */}
                </div>
            </div>
        )
    }
}

export default App;
import SearchBar from './Searchbar';
import youtube from '../apis/youtube';
import unsplash from "../apis/unsplash";
import ImageList from "./ImageList";
import VideoList from './VideoList';
import Grid from "@material-ui/core/Grid";
import 'semantic-ui-css/semantic.min.css';
import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

function App () {
    const [videos, setvideos] = useState([])
    const [images, setimages] = useState([])
    const [selectedItems, setselectedItems] = useState({})
    const [term, setTerm] = useState('')

    const handleSubmit = async (termFromSearchBar) => {
        setselectedItems({})
        setTerm(termFromSearchBar)
        console.log(typeof termFromSearchBar)
        debugger
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
        setvideos(response.data.items);
        setimages(imageresponse.data.results);
        setTerm(termFromSearchBar);
    };
    const handleVideoSelect = async (video) => {
        if (!selectedItems[term]){
            selectedItems[term] = [`https://www.youtube.com/embed/${video.id.videoId}`];
        }
        else{
            selectedItems[term].push(`https://www.youtube.com/embed/${video.id.videoId}`);
            setselectedItems(selectedItems)
        }
        setselectedItems(selectedItems)
    }

    const handleImageSelect = async (image) => {
        if (!selectedItems[term]){
            selectedItems[term] = [image.links.download];
        }
        else{
            selectedItems[term].push(image.links.download);
            setselectedItems(selectedItems)
        }
        setselectedItems(selectedItems)
        console.log(selectedItems)
    }

    const handleClick = () => {
        setselectedItems({})
    }

        return (
            <div style={{marginTop: '1em'}}>
                <Container>
                    <SearchBar handleFormSubmit={handleSubmit}/>
                    <div>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <ImageList handleVideoSelect={handleImageSelect} images={images.slice(0,3)} />
                            </Grid>
                            <Grid item xs={4}>
                                <ImageList handleVideoSelect={handleImageSelect} images={images.slice(3,6)} />
                            </Grid>
                            <Grid item xs={4}>
                                <VideoList handleVideoSelect={handleVideoSelect} videos={videos}/>
                                <ImageList handleVideoSelect={handleImageSelect} images={images.slice(6,7)} />
                            </Grid>
                        </Grid>
                        <Button style={{marginTop: '1em'}} variant="contained" color="primary" onClick={handleClick}>
                            Clear saved
                        </Button>
                        <div style={{marginTop: '1em'}}>
                              <p>Selected Items: {JSON.stringify(selectedItems)}</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
}

export default App;

// class App extends React.Component {
//     constructor () {
//         super()
//         this.state = {
//             videos: [],
//             images: [],
//             collection: [],
//             selectedItems: {},
//             term: null,
//         }
//     }
//     // state = {
//     //     videos: [],
//     //     images: [],
//     //     collection: [],
//     //     selectedItems: {},
//     //     term: null,
//     // }
//     handleSubmit = async (termFromSearchBar) => {
//         const response = await youtube.get('/search', {
//             params: {
//                 q: termFromSearchBar
//             }
//         })
//         const imageresponse = await unsplash.get("/search/photos", {
//             params: {
//                query: termFromSearchBar,
//                per_page: 7
//             },
//          });
//         console.log(termFromSearchBar)
//         this.setState({
//             videos: response.data.items,
//             images: imageresponse.data.results,
//             term: termFromSearchBar,
//         })
//     };
//     handleVideoSelect = (video) => {
//         var term = this.state.term;
//         if (!this.state.selectedItems[term]){
//             this.state.selectedItems[term] = [`https://www.youtube.com/embed/${video.id.videoId}`];
//         }
//         else{
//             this.state.selectedItems[term].push(`https://www.youtube.com/embed/${video.id.videoId}`);
//         }
//         this.setState({selectedItems: this.state.selectedItems});
//     }

//     handleImageSelect = (image) => {
//         var term = this.state.term;
//         if (!this.state.selectedItems[term]){
//             this.state.selectedItems[term] = [image.links.download];
//         }
//         else{
//             this.state.selectedItems[term].push(image.links.download);
//         }
//         this.setState({selectedItems: this.state.selectedItems});
//         console.log(this.state.selectedItem)
//     }

//     handleClick () {
//         this.setState({
//             selectedItems: {}
//         })
//     }

//     render() {
//         return (
//             <div className='ui container' style={{marginTop: '1em'}}>
//                 <SearchBar handleFormSubmit={this.handleSubmit}/>
//                     <div>
//                         <Grid container spacing={3}>
//                             <Grid item xs={4}>
//                                 <ImageList handleVideoSelect={this.handleImageSelect} images={this.state.images.slice(0,3)} />
//                             </Grid>
//                             <Grid item xs={4}>
//                                 <ImageList handleVideoSelect={this.handleImageSelect} images={this.state.images.slice(3,6)} />
//                             </Grid>
//                             <Grid item xs={4}>
//                                 <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
//                                 <ImageList handleVideoSelect={this.handleImageSelect} images={this.state.images.slice(6,7)} />
//                             </Grid>
//                         </Grid>
//                         <button onClick={this.handleClick}>
//                             Clear saved
//                         </button>
//                         <div>
//                               <p>Selected Items: {JSON.stringify(this.state.selectedItems)}</p>
//                         </div>
//                 </div>
//             </div>
//         )
//     }
// }

// export default App;
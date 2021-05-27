import React, { useState, useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';

function Searchbar(props) {
    const [input, setInput] = useState('Default Text')

    const handleChange = event => {
        // console.log(event.target.value);
        setInput(event.target.value);
    };

    const handleSubmit = event => {
        setInput(input);
        event.preventDefault();
        props.handleFormSubmit(input);
    }

        return (
            <div className='search-bar ui segment'>
                <form onSubmit={handleSubmit} className='ui form'>
                    <div className='field'>
                        <label htmlFor="video-search">Image & Video Search</label>
                        <input onChange={handleChange} value={input} name='video-search' type="text" input={input}/>
                    </div>
                </form>
            </div>
        )
}
export default Searchbar;

// class Searchbar extends React.Component {
//     state = {
//         term: 'Default text'
//     };
//     handleChange = (event) => {
//         this.setState({
//             term: event.target.value
//         });
//     };
//     handleSubmit = event => {
//         event.preventDefault();
//         this.props.handleFormSubmit(this.state.term);
//     }

//     render() {
//         return (
//             <div className='search-bar ui segment'>
//                 <form onSubmit={this.handleSubmit} className='ui form'>
//                     <div className='field'>
//                         <label htmlFor="video-search">Image&Video Search</label>
//                         <input onChange={this.handleChange} name='video-search' type="text" value={this.state.term}/>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }
// export default Searchbar;
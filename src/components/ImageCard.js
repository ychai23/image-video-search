import React from "react";

class ImageCard extends React.Component {
   constructor(props) {
      super(props);
      this.state = { spans: 0 };
      this.imageRef = React.createRef();
   }

   componentDidMount() {
      // console.log(this.imageRef.current.clientHeight);
      // added addEventListener for first download the image from unsplash
      this.imageRef.current.addEventListener("load", this.setSpans);
   }

   setSpans = () => {
      // console.log(this.imageRef.current.clientHeight);
      const height = this.imageRef.current.clientHeight;
      const spans = Math.ceil(height / 10);
      this.setState({ spans: spans });
   };

   render() {
      // Use destructing to escape the regular use of "this.props.image"
      const { description, urls } = this.props.image;
      return (
         <div style={{ gridRowEnd: `span ${this.state.spans}` }}>
            <img
               //    alt={this.props.image.description}
               //    src={this.props.image.urls.regular}
               ref={this.imageRef}
               alt={description}
               src={urls.regular}
            />
         </div>
      );
   }
}

export default ImageCard;
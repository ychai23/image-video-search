import React from "react";
import '../style/grid.css';

const ImageCard = ({image , handleVideoSelect}) => {
   const { description, urls} = image;
   return (
      <div className=' .video-item item' onClick={ () => handleVideoSelect(image)}>
      <img className='ui image'
         //    alt={this.props.image.description}
         //    src={this.props.image.urls.regular}
         alt={description}
         src={urls.regular}
      />
   </div>
   )
};
export default ImageCard;
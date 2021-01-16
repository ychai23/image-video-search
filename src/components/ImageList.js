import React from "react";
import ImageCard from "./ImageCard";

const ImageList = ({images , handleVideoSelect}) => {
   //    console.log(props.images);
   const renderedImages = images.map((image) => {
      return (
         //  <img key={image.id} alt={image.description} src={image.urls.regular} />
         <ImageCard key={image.id} image={image} handleVideoSelect={handleVideoSelect}/>
      );
   });
   return <div className='ui relaxed divided list'>{renderedImages}</div>;
};

export default ImageList;
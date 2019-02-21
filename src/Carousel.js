import React, {useState, useEffect} from 'react';
import './Carousel.css';
const img_width = 300;
const img_height = 300;
const parentPad = 0;
const parentHeight = img_height + 2 * parentPad;
const parentWidth = img_width * 3;
const visibleImages = 5;


const Carousel = (props) => {
  let {imgList} = props;

  const loadCarousel = () => {
    // imgList= imgList.reverse();
    imgList.splice(3);
    return (
      <div className="carouselWrapper" style={{ height: parentHeight + 'px', width:  parentWidth + 'px', padding: parentPad + 'px'}}>
      { 
        imgList.map(({large_url, url, id}, index) => {
          let styl = { position: 'absolute', top: 0, left: 0, display: 'block' };
          if (index === 0 ) {
            const val = parentWidth * 0.333;
            styl.transform =  'translateX(' + val + 'px)';

          }
          if (index === 1 ) {
            const val = parentWidth * 0.57;
            styl.transform =  'translateX(' + val + 'px) translateZ(100px) scale(0.8)';
            styl.opacity = 0.8;
            styl.zIndex = -1;
          }
          if (index === 2 ) {
            const val = parentWidth * 0.74;
            styl.transform =  'translateX(' + val + 'px) translateZ(100px) scale(0.6)';
            styl.opacity = 0.6;
            styl.zIndex = -2;
          }
          return (
            <a href={large_url} target="_blank" key={id} style={{...styl}} onClick={() => { console.log(index)}}>
              <img src={url} alt={'img_' + id } width={img_width} height={img_height}/>
            </a>
          )
        })
      }
      </div>
    );
  };

  return(
    <div>
      <div><span>Carousel</span></div>
      {loadCarousel()}
    </div>
  )
}
export default Carousel;
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
  const [currFirstImg, setCurrFirstImg] = useState(0);
  const [imageList, setImageList] = useState({ order: [], styles: {}});

  const elementsInLeft = Math.ceil(visibleImages / 2);
  const elementsInRight = visibleImages - elementsInLeft;

  const getRight = () => {
    const rightElements = {};
    rightElements.order = [];
    let curr_center = currFirstImg;
    let timesToIterate = 1;
    let zIndex = -1;
    let xTranslate = img_width;
    let zTranslate = 0;
    let opacity = 1;
    const division = xTranslate * (1.66 / elementsInRight);
    let opacityDivider = (0.7 / elementsInRight);
    while(timesToIterate < elementsInRight + 1) {
      const styles = {};
      let currImgIndex;
      if (curr_center === 0) {
        currImgIndex = imgList.length - 1 - timesToIterate + 1;
      } else {
        currImgIndex = (curr_center - timesToIterate > -1 ? curr_center - timesToIterate : imgList.length - Math.abs(curr_center - timesToIterate));
      }
      xTranslate = img_width - (division * timesToIterate);
      zTranslate =  -(division) * timesToIterate;
      opacity = 1 - (opacityDivider * timesToIterate);
      styles.transform =  'translateX(' + xTranslate + 'px) translateZ(' +  zTranslate + 'px)';
      styles.opacity = opacity;
      styles.zIndex = zIndex--;
      rightElements.order.push(currImgIndex);
      rightElements[currImgIndex] = { styles };
      timesToIterate++;
    }
    rightElements.order.reverse();
    return rightElements;
  }
  const getLeft = () => {
    let curr_center = currFirstImg;
    const leftElements = {};
    leftElements.order = [];
    let zIndex = 0;
    let xTranslate = img_width;
    let zTranslate = 0;
    let opacity = 1;
    const division = xTranslate * (1.66 / elementsInLeft);
    let opacityDivider = (0.7 / (elementsInLeft- 1 ));
    let timesToIterate = 0; // iterate leftelement times to change all those image's styles
    while(timesToIterate !== elementsInLeft) {
      const styles = {};
      let currImgIndex;
      if (curr_center === 0) {
        currImgIndex = curr_center + timesToIterate;
      } else {
        currImgIndex = curr_center + timesToIterate < imgList.length ? curr_center + timesToIterate :  curr_center + timesToIterate - imgList.length;
      }
      // const currImgIndex = currFirstImg + timesToIterate < imgList.length - 1 ? currFirstImg + timesToIterate : prevIndex++;
      if (currImgIndex !== currFirstImg) {      // If the current element is on center
        xTranslate = img_width + (division * timesToIterate);
        zTranslate =  -(division) * timesToIterate;
        opacity = 1 - (opacityDivider * timesToIterate);
      }
      styles.transform =  'translateX(' + xTranslate + 'px) translateZ(' +  zTranslate + 'px)';
      styles.opacity = opacity;
      styles.zIndex = zIndex--;
      leftElements.order.push(currImgIndex);
      leftElements[currImgIndex] = { styles };
      timesToIterate++;
    }
    return leftElements;
  }

  const changeCenter = (event, index, large_url) => {
    if (index !== currFirstImg) {
      event.preventDefault();
      setCurrFirstImg(index);
    } else {
      window.open(large_url);
    }
  }
  const findIndeces = () => {
    const left = getLeft();
    const right = getRight();
    let newImageList = {}
    const order = right.order.concat(left.order);
    console.log('left', left);
    console.log('right', right);
    newImageList = {...right, ...left, order};
    setImageList(newImageList);
  }

  useEffect(() => {
    findIndeces();
  }, [currFirstImg]);

  const loadCarousel = () => {
    console.log(imageList);
    return (
      <ul className="carouselWrapper" style={{ height: parentHeight + 'px', width:  parentWidth + 'px', padding: parentPad + 'px', perspective: '500px'}}>
      {
        imgList.map(({large_url, url, id}, index) => {
          const dn = imageList.order.indexOf(index) === -1;
          const styles = imageList[index] ? imageList[index].styles: {};
          return (
            <li key={id} className={'imgWrap ' + (dn ? 'dn': '')} style={{...styles, position: 'absolute', transition: 'all 1s ease-in-out'}} onClick={(e) => { changeCenter(e, index, large_url)} }>
              <img src={url} alt={'img_' + id } width={img_width} height={img_height}/>
            </li>
          )
        })
      }
      </ul>
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

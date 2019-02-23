import React, {useState, useEffect, useRef} from 'react';
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
  const [actualFirst, setActualFirst] = useState('');
  const [imageList, setImageList] = useState({ order: [], styles: {}});
  const currFirstImgRef = useRef(0);
  const intervalRef = useRef(0);
  const imgDifference = useRef(1);
  const durationRef = useRef(1000);

  const elementsInLeft = Math.ceil(visibleImages / 2);
  const elementsInRight = visibleImages - elementsInLeft;

  const constructImageList = () => {
    const imageList = {};
    imageList.order = [];
    let curr_center = currFirstImg;
    let timesToIterate = 0;
    let zIndex = - elementsInRight;
    let xTranslate = img_width;
    let zTranslate = 0;
    let opacity = 1;
    const division = xTranslate * (1.66 / visibleImages);
    let opacityDivider = (0.7 / elementsInRight);
    let rightEltCount = elementsInRight;
    let leftEltCount = elementsInLeft;
    let curr_center_copy = curr_center;
    while(timesToIterate < visibleImages ) {
      const styles = {};
      let currImgIndex;
      let currImgIndexOnRight = true;
      if (timesToIterate < elementsInRight) {
        const nextIndex = curr_center - (rightEltCount);
        currImgIndex = nextIndex > -1 ? nextIndex : imgList.length - Math.abs(nextIndex);
        opacity = 1 - (opacityDivider * rightEltCount);
        zTranslate =  -(img_width * (1.66 / elementsInRight)) * rightEltCount;
        xTranslate = img_width - ((img_width * (1.66 / elementsInRight)) * rightEltCount);
        rightEltCount--;
      } else {
        currImgIndexOnRight = false;
        currImgIndex = curr_center_copy;
        if (curr_center_copy + 1 >= imgList.length) {
          curr_center_copy = 0;
        } else {
          curr_center_copy++;
        }
        opacity = 1 - (opacityDivider * Math.abs(leftEltCount - (timesToIterate + 1)));
        zTranslate =  - (img_width * (1.66 / elementsInLeft)) * Math.abs(leftEltCount - (timesToIterate + 1));
        xTranslate = img_width + (img_width * (1.66 / elementsInLeft)) * Math.abs(leftEltCount - (timesToIterate + 1));
      }
      styles.transform =  'translateX(' + xTranslate + 'px) translateZ(' +  zTranslate + 'px)';
      styles.opacity = opacity;
      styles.zIndex = currImgIndexOnRight ? zIndex++ : zIndex --;
      imageList.order.push(currImgIndex);
      imageList[currImgIndex] = { styles };
      timesToIterate++;
    }
    durationRef.current = actualFirst === '' ? 1000 : ((1000/imgDifference.current));
    console.log(imageList);
    setImageList(imageList);
  }


  const changeCenter = (event, index, large_url) => {
    const currFirstImgIndex = imageList.order.indexOf(currFirstImg);
    const prevIndex = imageList.order[currFirstImgIndex - 1];
    const nextIndex = imageList.order[currFirstImgIndex + 1];
    if (index !== currFirstImg) {
      event.preventDefault();
      if (index === prevIndex || index === nextIndex) {
        setCurrFirstImg(index);
      } else {
        const val = currFirstImgIndex - imageList.order.indexOf(index);
        imgDifference.current = Math.abs(val);
        setActualFirst(index);
        setNextImage(index)
        
      }
    } else {
      window.open(large_url);
    }
  }

  const setNextImage = (comparer) => {
    if (imageList.order.indexOf(currFirstImgRef.current) > imageList.order.indexOf(comparer)) {
      currFirstImgRef.current = currFirstImgRef.current - 1 > -1 ? currFirstImgRef.current - 1 : imgList.length - 1;
      setCurrFirstImg(currFirstImgRef.current);
    } else {
      currFirstImgRef.current = (currFirstImgRef.current + 1) < imgList.length ?  (currFirstImgRef.current + 1) : 0;
      setCurrFirstImg(currFirstImgRef.current);
    }
  }

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (actualFirst !== '') {
      intervalRef.current = setInterval(() => {
        if (actualFirst !== '' && actualFirst !== currFirstImgRef.current) {
          setNextImage(actualFirst);
        } else if (actualFirst !== '' && actualFirst === currFirstImgRef.current){
          setActualFirst('');
          imgDifference.current = 1;
          clearInterval(intervalRef.current);
        }
      }, durationRef.current - 100);
    }
  }, [actualFirst]);

  useEffect(() => {
    constructImageList();
    currFirstImgRef.current = currFirstImg;
  }, [currFirstImg]);

  const loadCarousel = () => {
    return (
      <ul className="carouselWrapper" style={{ height: parentHeight + 'px', width:  parentWidth + 'px', padding: parentPad + 'px', perspective: '500px'}}>
      {
        imgList.map(({large_url, url, id}, index) => {
          const dn = imageList.order.indexOf(index) === -1;
          const styles = imageList[index] ? imageList[index].styles: {};
          return (
            <li key={id} className={'imgWrap ' + (dn ? 'dn': '')} style={{...styles, position: 'absolute', transition: `all ${durationRef.current}ms linear `}} onClick={(e) => { changeCenter(e, index, large_url)} }>
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

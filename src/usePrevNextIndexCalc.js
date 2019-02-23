import React, {useState} from 'react';

const usePrevNextIndexCalc = () => {
  const  [prev, setPrev] = useState(0);
  const  [next, setNext] = useState(0);

  const findPrevNextIndeces = (prevFirst, totalLength) => {
    if (typeof(prevFirst) !== 'number' || typeof(totalLength) !== 'number') {
      return [prev, next];
    }
    setPrev(prevFirst - 1 > 0 ? prevFirst - 1 : totalLength - 1);
    setNext(prevFirst + 1 < totalLength ? prevFirst + 1 : 0);
  }

  return [prev, next, findPrevNextIndeces];
}
export default usePrevNextIndexCalc;

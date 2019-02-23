import React, { useState, useEffect } from 'react';
import Carousel from './Carousel';
import axios from 'axios';

const SPLASHBASE_URL = 'http://www.splashbase.co/api/v1/images/latest';

const App = (props) => {
  const [imgList, setImgList] = useState([]);

  useEffect(() => {
    axios.get(SPLASHBASE_URL)
    .then((resp) => {
      setImgList(resp.data.images);
    }).catch((err) => {
      console.log('Unable to Fetch Image from splashbase', err);
    });
  }, []);

  return (
    <div>
      <h1>Carousel</h1>
      {imgList.length === 0 && <div>Loading...</div>}
      {imgList.length > 0 && <Carousel imgList={imgList}/>}
    </div>
  );
};

export default App;

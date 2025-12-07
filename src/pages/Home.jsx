import React from 'react';
import Banner from '../components/banner/Banner';
import Category from '../components/category/category';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="">
        <Category></Category>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import Banner from '../components/banner/Banner';
import Category from '../components/category/category';
import ExtraSection from '../components/extraSection/ExtraSection';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="">
        <Category></Category>
      </div>
      <div className="">
        <ExtraSection></ExtraSection>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import Banner from '../components/banner/Banner';
import Category from '../components/category/category';
import ExtraSection from '../components/extraSection/ExtraSection';
import RecentListings from '../components/recentListing/RecentListings';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="">
        <Category></Category>
      </div>
      <div className="">
        <RecentListings></RecentListings>
      </div>
      <div className="">
        <ExtraSection></ExtraSection>
      </div>
    </div>
  );
};

export default Home;
import React from 'react';
import CreatorNavbar from '../../components/creator/CreatorNavbar';
import CreatorCards from '../../components/creator/CreatorCards';
import CreatorSideBar from '../../components/creator/CreatorSideBar'

export default function index() {
  return (
    <div className='mt-[12rem]'>
      <CreatorNavbar />
      <CreatorCards />
      <CreatorSideBar />

      
    </div>
  )
}

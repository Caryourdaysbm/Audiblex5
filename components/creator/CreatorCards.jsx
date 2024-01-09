import React from 'react';
import Image from "next/image";

import CenteredCard from '../CenteredCards';
import User from '../../assets/images/svgs/User.svg';
import Playlist from '../../assets/images/svgs/Playlist.svg';
import Plus from '../../assets/images/svgs/PlusMath.svg';
import Love from '../../assets/images/svgs/Love.svg';

const CreatorCards = () => (
    
  <div className='flex gap-14 '>
   <div className='bg-black text-white '> 
   <CenteredCard
   
      imageSrc={User}
      firstText="34.5k"
      secondText="Unique Listener"
           
    />
    </div>
    <CenteredCard
      imageSrc={Playlist}
      firstText="50.5k"
      secondText="Followers"
      
    />
    {/* Add more cards as needed */}
    <CenteredCard
      imageSrc={Plus}
      firstText="74k"
      secondText="Likes"
     
    />

<CenteredCard
      imageSrc={Love}
      firstText="23k"
      secondText="Playlist"
     
    />
  </div>
);

export default CreatorCards;

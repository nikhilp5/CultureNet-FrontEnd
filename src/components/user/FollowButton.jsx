import React, { useState, useEffect } from 'react';

const FollowButton = ({ displayedUserid }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const displayedUserId='6430ace4b5ab7f21384a68cf'
  
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}`+`/user/${displayedUserId}/follow`,{
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setIsFollowing(data.isFollowing);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFollowStatus();
  }, [displayedUserId]);

  const handleFollow = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}`+`/user/${displayedUserId}/follow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        
      });
      const data = await response.json();
      setIsFollowing(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}`+`/user/${displayedUserId}/unfollow`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        
      });
      const data = await response.json();
      setIsFollowing(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;

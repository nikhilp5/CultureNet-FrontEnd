//Author - Pranay Raycha (B00932030)
import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';

const FollowButton = ({ displayedUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowedBy, setIsFollowedBy] = useState(false);
  
  
  useEffect(() => {
    const fetchFollowStatus = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BASE_URL}`+`/user/${displayedUserId}/fetchFollowStatus`,{
          method: 'GET',
          headers: {
                        
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setIsFollowing(data.isFollowing);
        setIsFollowedBy(data.isFollowedBy);
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
      window.location.reload();
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
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button variant="contained" color="primary" type="submit" onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;

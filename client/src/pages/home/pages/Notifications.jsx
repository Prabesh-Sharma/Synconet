import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import Layout from '../components/Layout';
import { API_URL } from '../../../../constants';

const socket = io(API_URL); 

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  useEffect(() => {
    socket.on('connect', () => {
        console.log('Socket connected to the server');
      });

    socket.on('new-event', (notification) => {
      console.log('New notification received:', notification);
    
      setNotifications((prevNotifications) => {
        const updatedNotifications = [
          { id: Date.now(), message: notification.message, timestamp: notification.timestamp },
          ...prevNotifications,
        ];

        localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
        console.log('Current notifications:', notifications);

        return updatedNotifications;
      });
    });

    const savedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(savedNotifications);

    return () => {
      socket.off('new-event');
    };
  }, []);

  const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString(); 
      };

  return (
    <Layout>
      <Layout.Header>
        <h1 className="text-4xl text-neutral-200">Notifications</h1>
      </Layout.Header>
      <Layout.Main>
        <div className="relative p-4">
          <ul className="text-neutral-200 bg-neutral-800 rounded-lg p-4 shadow-md">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <li key={notification.id} className="p-2 border-b border-neutral-700">
                  <p>{notification.message}</p>
                  <p><span className="text-sm text-neutral-400">({formatDate(notification.timestamp)})</span></p>
                </li>
              ))
            ) : (
              <li className="text-neutral-400">No notifications yet.</li>
            )}
          </ul>
        </div>
      </Layout.Main>
    </Layout>
  );
};

export default Notifications;

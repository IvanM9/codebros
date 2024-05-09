
import { UserData } from './types';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface UserProfileProps {
  userData: UserData;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
    const [userData, setUserData] = useState<UserData | null>(null);
    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get<UserData>('/api/user-data');
            setUserData(response.data);
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);
    
      if (!userData) {
        return <div>Cargando...</div>;
      }
  const { user, location, employmentStatus, availableHours, experiences, certifications, skills } = userData;


  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-4">
          <img
            src="https://via.placeholder.com/64"
            alt="User Avatar"
            className="w-16 h-16 rounded-full mr-4"
          />
          <div>
            <h2 className="text-2xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
            <p className="text-gray-600">{location}</p>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Experiencia Laboral</h3>
          {experiences.map((exp, index) => (
            <div key={index} className="mb-2">
              <h4 className="font-semibold">{exp.title}</h4>
              <p className="text-gray-600">{exp.company}</p>
              <p className="text-gray-500">{exp.startDate} - {exp.endDate}</p>
            </div>
          ))}
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-bold mb-2">Certificaciones</h3>
          {certifications.map((cert, index) => (
            <div key={index} className="mb-2">
              <h4 className="font-semibold">{cert.name}</h4>
              <p className="text-gray-600">{cert.authority}</p>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-bold mb-2">Habilidades</h3>
          <div className="flex flex-wrap">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
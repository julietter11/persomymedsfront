import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const CustomLinearGradient = ({ children }) => {
  return (
    <LinearGradient
      colors={['hsla(176, 61%, 87%, 1)', 'hsla(150, 54%, 86%, 1)', 'hsla(242, 68%, 84%, 1)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default CustomLinearGradient;








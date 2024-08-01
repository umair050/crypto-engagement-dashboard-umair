'use client'
import React from 'react';





const Input: React.FC<{type: string, placeholder: string, value: string, onChange: any}> = ({ type, placeholder, value, onChange }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        
        style={{
            borderWidth: '1px',
            borderColor: 'initial', 
            borderRadius: '0.375rem', 
            width: '100%',
            paddingTop: '0.5rem', 
            paddingBottom: '0.5rem', 
            paddingLeft: '0.75rem', 
            paddingRight: '0.75rem', 
            color: '#4a5568', 
            lineHeight: '1.25', 
            boxShadow: '0 0 0 1px rgba(0, 0, 0, 0.05)',
          

        }}
      />
    </div>
  );
};

export default Input;

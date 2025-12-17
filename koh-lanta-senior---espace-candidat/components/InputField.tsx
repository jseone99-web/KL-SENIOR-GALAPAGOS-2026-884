import React from 'react';

interface InputFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  type?: 'text' | 'textarea' | 'select' | 'number';
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'text', 
  options = [],
  placeholder = '',
  required = false
}) => {
  const baseClasses = "w-full bg-koh-dark/50 border-2 border-koh-brown text-koh-sand p-3 rounded-lg focus:outline-none focus:border-koh-orange focus:ring-1 focus:ring-koh-orange transition-all font-body text-lg";

  return (
    <div className="mb-6">
      <label className="block font-tribal text-koh-gold text-lg mb-2 uppercase tracking-wide">
        {label} {required && <span className="text-koh-red">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          rows={5}
          className={baseClasses}
          placeholder={placeholder}
          required={required}
        />
      ) : type === 'select' ? (
        <select name={name} value={value} onChange={onChange} className={baseClasses} required={required}>
          <option value="" disabled>Sélectionnez une option</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={baseClasses}
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};
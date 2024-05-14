import React from 'react';

interface ErrorProps {
  title: string;
  description: string;
  image: string;
}

export const ErrorComponent: React.FC<ErrorProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="flex flex-col max-w-screen-lg w-full">
      <div className="w-full bg-white rounded-lg shadow flex flex-col items-center justify-center px-[55px] pt-[22.57px] pb-[27.11px]">
        <div className="flex flex-row">
          <div className="flex flex-col space-y-3 pt-2.5">
            <p className="text-emerald-400 text-4xl font-semibold">{title}</p>
            <p className="text-black text-base font-normal">{description}</p>
          </div>
          <img src={image} alt={title} />
        </div>
      </div>
    </div>
  );
};

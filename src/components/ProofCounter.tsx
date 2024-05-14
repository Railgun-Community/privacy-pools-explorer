import React from 'react';
// Import your SVG icon here. Assuming the file is named 'CheckIcon.svg' in the same directory.

interface ProofCounterProps {
  totalProofs: number;
}

export const ProofCounter: React.FC<ProofCounterProps> = ({ totalProofs }) => {
  // Format the number to have commas and fixed decimal places as needed
  const formattedProofs = Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
  }).format(totalProofs);
  return (
    <div className="pt-2">
    <div className="w-64 h-20 bg-white rounded-lg shadow flex items-center px-4">
      <svg
        width="28"
        height="31"
        viewBox="0 0 28 31"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          id="SecurityCheck"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9969 0.160166C14.3499 -0.0533886 13.6502 -0.0533886 13.0031 0.160166L3.4728 3.30523C2.66111 3.57311 2.0007 4.16671 1.6532 4.94075C-2.5019 14.1966 1.43146 25.0508 10.5821 29.5805L12.9579 30.7566C13.614 31.0812 14.3861 31.0812 15.0422 30.7566L17.4179 29.5805C26.5686 25.0508 30.5019 14.1966 26.3468 4.94075C25.9993 4.16671 25.3389 3.57311 24.5272 3.30523L14.9969 0.160166ZM21.2208 12.0339C21.7695 11.5332 21.8043 10.687 21.2986 10.1438C20.7929 9.60057 19.9382 9.56606 19.3894 10.0667L12.4358 16.4115L9.53112 13.6521C8.9927 13.1406 8.13743 13.158 7.62079 13.6911C7.10415 14.2242 7.1218 15.071 7.66022 15.5823L11.4816 19.2128C11.9968 19.7022 12.8078 19.7102 13.3328 19.2312L21.2208 12.0339Z"
          fill="#B3B3B3"
        />
      </svg>
      <div className="ml-4">
        <div className="text-zinc-400 text-xs font-semibold">
          TOTAL PROOFS GENERATED
        </div>
        <div className="text-black text-base font-normal">
          {formattedProofs}
        </div>
      </div>
    </div>
    </div>
  );

  // return (
  //   <div className="w-64 h-20 relative bg-white rounded-lg shadow">
  //     <div className="w-52 h-10 left-[16px] top-[17px] absolute">
  //       <div className="w-40 h-10 left-[46px] top-0 absolute">
  //         <div className="left-0 top-[22px] absolute text-black text-base font-normal">
  //           {formattedProofs} M
  //         </div>
  //         <div className="w-40 h-3.5 left-0 top-0 absolute text-zinc-400 text-xs font-semibold">
  //           TOTAL PROOFS GENERATED
  //         </div>
  //       </div>
  //       <svg
  //         width="28"
  //         height="31"
  //         viewBox="0 0 28 31"
  //         fill="none"
  //         xmlns="http://www.w3.org/2000/svg"
  //       >
  //         <path
  //           id="SecurityCheck"
  //           fillRule="evenodd"
  //           clipRule="evenodd"
  //           d="M14.9969 0.160166C14.3499 -0.0533886 13.6502 -0.0533886 13.0031 0.160166L3.4728 3.30523C2.66111 3.57311 2.0007 4.16671 1.6532 4.94075C-2.5019 14.1966 1.43146 25.0508 10.5821 29.5805L12.9579 30.7566C13.614 31.0812 14.3861 31.0812 15.0422 30.7566L17.4179 29.5805C26.5686 25.0508 30.5019 14.1966 26.3468 4.94075C25.9993 4.16671 25.3389 3.57311 24.5272 3.30523L14.9969 0.160166ZM21.2208 12.0339C21.7695 11.5332 21.8043 10.687 21.2986 10.1438C20.7929 9.60057 19.9382 9.56606 19.3894 10.0667L12.4358 16.4115L9.53112 13.6521C8.9927 13.1406 8.13743 13.158 7.62079 13.6911C7.10415 14.2242 7.1218 15.071 7.66022 15.5823L11.4816 19.2128C11.9968 19.7022 12.8078 19.7102 13.3328 19.2312L21.2208 12.0339Z"
  //           fill="#B3B3B3"
  //         />
  //       </svg>
  //     </div>
  //   </div>
  // );
};

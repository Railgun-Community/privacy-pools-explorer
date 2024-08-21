import { NetworkName } from '@railgun-community/shared-models';
import React, { useEffect, useRef, useState } from 'react';

interface DropdownProps {
  initialNetwork: NetworkName | undefined;
  onNetworkChange: (network: NetworkName) => void;
}
/**
 * export declare enum NetworkName {
    Railgun = "Railgun",
    Ethereum = "Ethereum",
    BNBChain = "BNB_Chain",
    Polygon = "Polygon",
    Arbitrum = "Arbitrum",
    EthereumRopsten_DEPRECATED = "Ethereum_Ropsten",
    EthereumGoerli = "Ethereum_Goerli",
    PolygonMumbai = "Polygon_Mumbai",
    ArbitrumGoerli = "Arbitrum_Goerli",
    Hardhat = "Hardhat"
}
 */

const networkDropdownNames = {
  // [NetworkName.Railgun]: 'unimplemented',
  [NetworkName.EthereumGoerli_DEPRECATED]: 'unimplemented',
  [NetworkName.EthereumSepolia]: 'Sepolia',
  [NetworkName.Ethereum]: 'Ethereum',
  [NetworkName.BNBChain]: 'BNB Chain',
  [NetworkName.Polygon]: 'Polygon',
  [NetworkName.PolygonAmoy]: 'unimplemented',
  [NetworkName.Arbitrum]: 'Arbitrum',
  [NetworkName.EthereumRopsten_DEPRECATED]: 'unimplemented',
  [NetworkName.PolygonMumbai_DEPRECATED]: 'unimplemented',
  [NetworkName.ArbitrumGoerli_DEPRECATED]: 'unimplemented',
  [NetworkName.Hardhat]: 'unimplemented',
};

export const Dropdown: React.FC<DropdownProps> = ({
  initialNetwork,
  onNetworkChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<NetworkName>(
    initialNetwork || NetworkName.Ethereum,
  );
  const networks = [NetworkName.Ethereum, NetworkName.EthereumSepolia, NetworkName.Arbitrum, NetworkName.BNBChain, NetworkName.Polygon];
  const dropdownRef = useRef<HTMLDivElement>(null); // Create a ref for the dropdown

  useEffect(() => {
    // Function to handle click outside the dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Add event listener for click events
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array ensures this runs once on mount and on unmount

  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectNetwork = (network: string) => {
    setSelectedNetwork(network as NetworkName);
    setIsOpen(false);
    onNetworkChange(network as NetworkName);
  };

  return (
    <div className="w-[116px] relative z-10" ref={dropdownRef}>
      <div
        className="h-7 bg-neutral-100 rounded-lg flex items-center justify-between px-3 cursor-pointer"
        onClick={toggleDropdown}
      >
        <span className="text-black text-base font-normal">
          {networkDropdownNames[selectedNetwork]}
        </span>
        <svg
          width="12"
          height="7"
          viewBox="0 0 12 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            id="Chevron"
            d="M1 1L6 6L11 1"
            stroke="black"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {isOpen && (
        <div className="absolute w-28 bg-white rounded-lg mt-1 shadow">
          {networks.map(network => (
            <div
              key={network}
              className="px-3 py-2 hover:bg-neutral-100 cursor-pointer"
              onClick={() => selectNetwork(network)}
            >
              {networkDropdownNames[network]}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

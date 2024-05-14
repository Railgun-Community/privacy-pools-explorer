import { NetworkName } from '@railgun-community/shared-models';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from '@utils/platform';
import { useWindowSize } from '../hooks/useWindowSize';
import { Dropdown } from './Dropdown';
import { SearchButton } from './SearchButton';

interface SearchBarProps {
  initialNetwork: NetworkName | undefined;
  initialQueryValue: string | undefined;
  setCurrentNetwork: (network: NetworkName) => void;
  currentNetwork: NetworkName;
}

export const isAddress = (input: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(input);
};

export const isTx = (input: string): boolean => {
  return /^0x[a-fA-F0-9]{64}$/.test(input);
};

export const formatInput = (input: string): string => {
  const trimmedInput = input.trim();
  return trimmedInput.startsWith('0x') ? trimmedInput : `0x${trimmedInput}`;
};

export const isNetworkCorrect = (network: string): boolean => {
  return Object.values(NetworkName).includes(network as NetworkName);
};

export const SearchBar: React.FC<SearchBarProps> = ({
  initialNetwork,
  initialQueryValue,
  currentNetwork,
  setCurrentNetwork,
}) => {
  const [queryInput, setQueryInput] = useState<string>(
    initialQueryValue !== undefined ? initialQueryValue : '',
  );
  const [isInputError, setIsInputError] = useState<boolean>(false);

  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const isMobileDevice = isMobile(windowSize);

  const handleSearch = () => {
    setIsInputError(false);
    if (isAddress(queryInput)) {
      // makeQuery({
      //   network: currentNetwork,
      //   type: QueryTypeEnum.ADDRESS,
      //   value: formatInput(queryInput),
      // });
      navigate(`/${currentNetwork}/address/${formatInput(queryInput)}`, {
        replace: true,
      });
    } else if (isTx(queryInput)) {
      // makeQuery({
      //   network: currentNetwork,
      //   type: QueryTypeEnum.TX,
      //   value: formatInput(queryInput),
      // });
      navigate(`/${currentNetwork}/tx/${formatInput(queryInput)}`, {
        replace: true,
      });
    } else {
      setIsInputError(true);
    }
  };

  return (
    <div>
      {isMobileDevice && (
        <div className="flex items-center py-4">
          <Dropdown
            initialNetwork={initialNetwork}
            onNetworkChange={(network: NetworkName) =>
              setCurrentNetwork(network)
            }
          />
        </div>
      )}
      <div className="relative">
        {!isMobileDevice && (
          <div className="absolute inset-y-0 start-0 flex items-center p-2.5">
            <Dropdown
              initialNetwork={initialNetwork}
              onNetworkChange={(network: NetworkName) =>
                setCurrentNetwork(network)
              }
            />
          </div>
        )}
        <input
          value={queryInput}
          onChange={e => setQueryInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          type="search"
          id="default-search"
          className={`block w-full p-4 ${
            !isMobileDevice && 'ps-[146px]'
          } text-sm bg-white rounded-lg focus:outline-none focus:border-emerald-400`}
          placeholder="Search by address or transaction hash"
          required
        />
        <SearchButton onClick={handleSearch} />
      </div>
      {isInputError && (
        <div className="m-4">
          <p className="text-red-500 text-base font-medium">
            You’ve entered a wrong address or transaction hash.
          </p>
        </div>
      )}
    </div>
  );
};

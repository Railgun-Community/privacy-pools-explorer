import { POIStatus } from '@railgun-community/shared-models';
import React from 'react';
import {
  AllResults,
  NewPOIsPerBlindedCommitment,
  NewPOIsPerList,
  RailgunTransactionV2,
} from '@screens/App';
import { getTokenAmountString } from '@utils/tokens';

interface ResultListProps {
  results: AllResults;
}

const LIST_NAME_MAPPING: { [key: string]: string } = {
  efc6ddb59c098a13fb2b618fdae94c1c3a807abc8fb1837c93620c9143ee9e88:
    'SDN+BlockedPersons',
};

const LIST_TOOLTIP_TEXT: { [key: string]: string } = {
  efc6ddb59c098a13fb2b618fdae94c1c3a807abc8fb1837c93620c9143ee9e88:
    'The Specially Designated Nationals list maintained by US Department of Treasury – Office of Foreign Assets Control. This list is only input data and does not give data providers any insight into RAILGUN transactions.',
};

export const IGNORED_LISTS = [
  '55049dc47b4435bca4a8f8ac27b1858e409f9f72b317fde4a442095cfc454893',
];

export const ValidSVG = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="Vector"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.0462 7.5C15.0462 11.6421 11.678 15 7.52312 15C3.36822 15 0 11.6421 0 7.5C0 3.35786 3.36822 0 7.52312 0C11.678 0 15.0462 3.35786 15.0462 7.5ZM10.5552 5.22725C10.7755 5.44692 10.7755 5.80308 10.5552 6.02273L6.79361 9.77273C6.57325 9.9924 6.21606 9.9924 5.99568 9.77273L4.49106 8.27273C4.27071 8.05305 4.27071 7.69695 4.49106 7.47727C4.7114 7.2576 5.06866 7.2576 5.289 7.47727L6.39466 8.57947L8.07592 6.90338L9.75727 5.22725C9.97762 5.00759 10.3348 5.00759 10.5552 5.22725Z"
      fill="#45CCA6"
    />
  </svg>
);

export const MissingSVG = () => (
  <svg
    width="16"
    height="15"
    viewBox="0 0 16 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      id="MissingIcon"
      d="M15.0462 7.5C15.0462 9.48912 14.2536 11.3968 12.8428 12.8033C11.4319 14.2098 9.51838 15 7.52312 15C5.52787 15 3.61433 14.2098 2.20347 12.8033C0.792613 11.3968 0 9.48912 0 7.5C0 5.51088 0.792613 3.60322 2.20347 2.1967C3.61433 0.790176 5.52787 0 7.52312 0C9.51838 0 11.4319 0.790176 12.8428 2.1967C14.2536 3.60322 15.0462 5.51088 15.0462 7.5ZM4.23176 7.03125C4.10705 7.03125 3.98746 7.08064 3.89928 7.16854C3.8111 7.25645 3.76156 7.37568 3.76156 7.5C3.76156 7.62432 3.8111 7.74355 3.89928 7.83146C3.98746 7.91936 4.10705 7.96875 4.23176 7.96875H10.8145C10.9392 7.96875 11.0588 7.91936 11.147 7.83146C11.2351 7.74355 11.2847 7.62432 11.2847 7.5C11.2847 7.37568 11.2351 7.25645 11.147 7.16854C11.0588 7.08064 10.9392 7.03125 10.8145 7.03125H4.23176Z"
      fill="#F8D418"
    />
  </svg>
);

export const DetailsBlock: React.FC<{
  blindedCommitment: string;
  status: POIStatus;
  txData: RailgunTransactionV2;
  isLast: boolean;
  index: number;
}> = ({ blindedCommitment, status, txData, isLast, index }) => {
  return (
    <div
      key={blindedCommitment}
      className={`pb-[16px] ${
        isLast ? '' : 'border-b border-zinc-400 border-opacity-50'
      }`}
    >
      <div className="flex flex-col">
        <div className="flex flex-row">
          <div className="text-base font-normal text-zinc-400 w-[180px]">
            Unshield Index:
          </div>
          <div
            className={`flex flex-row space-x-1.5 items-center text-base font-normal`}
          >
            <div>{index + 1}</div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="text-base font-normal text-zinc-400 w-[180px]">
            Token Address:
          </div>
          <div
            className={`flex flex-row space-x-1.5 items-center text-base font-normal flex-1 truncate`}
          >
            <div
              style={{
                wordBreak: 'break-all',
                overflowWrap: 'break-word',
                wordWrap: 'break-word',
                whiteSpace: 'normal',
                maxWidth: '100%',
              }}
            >
              {txData.unshield?.tokenData.tokenAddress}
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="text-base font-normal text-zinc-400 w-[180px]">
            Amount:
          </div>
          <div
            className={`flex flex-row space-x-1.5 items-center text-base font-normal flex-1 truncate`}
          >
            <div>
              {txData.unshield?.value !== undefined &&
                getTokenAmountString(
                  txData.unshield?.value,
                  txData.unshield?.tokenData.tokenAddress,
                )}
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="text-base font-normal text-zinc-400 w-[180px]">
            Status:
          </div>
          <div
            className={`flex flex-row space-x-1.5 items-center text-base font-normal`}
          >
            <div>{status}</div>
            <div>
              {status === POIStatus.Valid ? <ValidSVG /> : <MissingSVG />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListBlock: React.FC<{
  listKey: string;
  poisPerBlindedCommitment: NewPOIsPerBlindedCommitment[];
  isLast: boolean;
  txDataMapping: {
    railgunTransaction: RailgunTransactionV2;
    railgunTxid: string;
  }[];
}> = ({ listKey, poisPerBlindedCommitment, isLast, txDataMapping }) => {
  let [isExpanded, setIsExpanded] = React.useState(false);
  let overallStatus = // if there is any missing POI, the overall status is missing
    Object.values(poisPerBlindedCommitment).filter(
      status => status.poiStatus === POIStatus.Missing,
    ).length > 0
      ? POIStatus.Missing
      : POIStatus.Valid;

  const newTxDataMapping = new Map<string, RailgunTransactionV2>(
    txDataMapping.map(txData => [
      txData.railgunTxid,
      txData.railgunTransaction,
    ]),
  );

  return (
    <div
      key={listKey}
      className={`pb-[16px] ${
        isLast && !isExpanded
          ? ''
          : 'border-b border-zinc-400 border-opacity-50'
      }`}
    >
      <div className="flex flex-row">
        <div className="text-base font-normal text-zinc-400 min-w-[180px]">
          List Name:
        </div>
        <div
          style={{
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '100%',
          }}
          className="relative tooltip group"
        >
          <div
            style={{
              width: '50vw',
            }}
            className={`absolute hidden group-hover:block tooltiptext bg-[#45CCA6] mb-4 rounded-lg w-[400px]`}
          >
            <div className="p-4 text-white text-sm">
              {LIST_TOOLTIP_TEXT[listKey] ?? 'Unknown list'}
            </div>
            <div className="tooltip-arrow"></div>
          </div>
          <div className="text-base font-semibold text-emerald-400">
            {LIST_NAME_MAPPING[listKey] ?? 'Unknown'}
          </div>
        </div>
      </div>
      <div className="flex flex-row">
        <div className="text-base font-normal text-zinc-400 w-[180px]">
          List Key:
        </div>
        <div
          style={{
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '100%',
          }}
          className="text-base font-normal flex-1"
        >
          {listKey}
        </div>
      </div>

      <div className="flex flex-row">
        <div className="text-base font-normal text-zinc-400 w-[180px]">
          Overall Status:
        </div>
        <div
          className={`flex flex-row space-x-1.5 items-center text-base font-normal text-zinc-400`}
        >
          <div>{overallStatus}</div>
          <div>
            {overallStatus === POIStatus.Valid ? (
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0462 7.5C15.0462 11.6421 11.678 15 7.52312 15C3.36822 15 0 11.6421 0 7.5C0 3.35786 3.36822 0 7.52312 0C11.678 0 15.0462 3.35786 15.0462 7.5ZM10.5552 5.22725C10.7755 5.44692 10.7755 5.80308 10.5552 6.02273L6.79361 9.77273C6.57325 9.9924 6.21606 9.9924 5.99568 9.77273L4.49106 8.27273C4.27071 8.05305 4.27071 7.69695 4.49106 7.47727C4.7114 7.2576 5.06866 7.2576 5.289 7.47727L6.39466 8.57947L8.07592 6.90338L9.75727 5.22725C9.97762 5.00759 10.3348 5.00759 10.5552 5.22725Z"
                  fill="#45CCA6"
                />
              </svg>
            ) : (
              <svg
                width="16"
                height="15"
                viewBox="0 0 16 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="MissingIcon"
                  d="M15.0462 7.5C15.0462 9.48912 14.2536 11.3968 12.8428 12.8033C11.4319 14.2098 9.51838 15 7.52312 15C5.52787 15 3.61433 14.2098 2.20347 12.8033C0.792613 11.3968 0 9.48912 0 7.5C0 5.51088 0.792613 3.60322 2.20347 2.1967C3.61433 0.790176 5.52787 0 7.52312 0C9.51838 0 11.4319 0.790176 12.8428 2.1967C14.2536 3.60322 15.0462 5.51088 15.0462 7.5ZM4.23176 7.03125C4.10705 7.03125 3.98746 7.08064 3.89928 7.16854C3.8111 7.25645 3.76156 7.37568 3.76156 7.5C3.76156 7.62432 3.8111 7.74355 3.89928 7.83146C3.98746 7.91936 4.10705 7.96875 4.23176 7.96875H10.8145C10.9392 7.96875 11.0588 7.91936 11.147 7.83146C11.2351 7.74355 11.2847 7.62432 11.2847 7.5C11.2847 7.37568 11.2351 7.25645 11.147 7.16854C11.0588 7.08064 10.9392 7.03125 10.8145 7.03125H4.23176Z"
                  fill="#F8D418"
                />
              </svg>
            )}
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="flex flex-row border-b border-zinc-400 border-opacity-50 mx-[200px] mt-[15px]"></div>
      )}

      {isExpanded && (
        <div className="flex flex-col space-y-[16px] pt-[20px]">
          {poisPerBlindedCommitment.map((item, index) => (
            <DetailsBlock
              key={item.blindedCommitment}
              blindedCommitment={item.blindedCommitment}
              status={item.poiStatus}
              txData={
                newTxDataMapping.get(item.blindedCommitment.slice(2)) ??
                ({} as RailgunTransactionV2)
              }
              isLast={index === poisPerBlindedCommitment.length - 1}
              index={index}
            />
          ))}
        </div>
      )}

      <div className="flex flex-row">
        <button
          className="text-emerald-400 text-base font-normal underline m-auto pt-3.5"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <div className="flex flex-row space-x-1.5 items-center">
              <div>Hide Details</div>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Chevron"
                  d="M1 6L6 1L11 6"
                  stroke="#45CCA6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          ) : (
            <div className="flex flex-row space-x-1.5 items-center">
              <div>Show Details</div>
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
                  stroke="#45CCA6"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export const TxBlock: React.FC<{
  txid: string;
  poisPerList: NewPOIsPerList;
  txDataMapping: {
    railgunTransaction: RailgunTransactionV2;
    railgunTxid: string;
  }[];
}> = ({ txid, poisPerList, txDataMapping }) => {
  return (
    <div className="text-clip w-full h-auto mb-4 bg-white rounded-lg shadow">
      <div className="text-clip flex flex-col md:flex-row p-4 border-b border-zinc-400 border-opacity-50 px-[20px] py-[25px]">
        <div className="text-lg font-semibold mr-2">Txn Hash: </div>
        <span
          style={{
            wordBreak: 'break-all',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
            whiteSpace: 'normal',
            maxWidth: '100%',
          }}
          className={'text-lg font-normal'}
        >
          {txid}
        </span>
      </div>

      <div className="flex flex-col space-y-[40px] mx-[20px] md:mx-[50px] pt-[40px] pb-px-32">
        {Object.entries(poisPerList)
          .filter(([listKey, _]) => !IGNORED_LISTS.includes(listKey))
          .map(([listKey, status], index, filteredList) => (
            <ListBlock
              key={listKey}
              listKey={listKey}
              poisPerBlindedCommitment={status}
              isLast={index === filteredList.length - 1}
              txDataMapping={txDataMapping}
            />
          ))}
      </div>
    </div>
  );
};

export const ResultList: React.FC<ResultListProps> = ({ results }) => {
  return (
    <div
      style={{ marginBottom: 32 }}
      className="w-full flex flex-col items-center space-y-[50px] pt-[50px]"
    >
      {[...results.poiData].reverse().map(result => (
        <TxBlock
          key={result.txid}
          txid={result.txid}
          poisPerList={result.poisPerList}
          txDataMapping={results.txData}
        />
      ))}
    </div>
  );
};

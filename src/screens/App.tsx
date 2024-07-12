import {
  BlindedCommitmentType,
  NETWORK_CONFIG,
  NetworkName,
  NodeStatusAllNetworks,
  POIListStatus,
  TXIDVersion,
} from '@railgun-community/shared-models';
import {
  getRailgunTransactionDataForUnshieldToAddress,
  getRailgunTxDataForUnshields,
} from '@railgun-community/wallet';
import React, { useEffect, useState } from 'react';
import { ErrorComponent } from '@components/Error';
import { LoadingSpinner } from '@components/LoadingSpinner';
import { ProofCounter } from '@components/ProofCounter';
import { SearchBar } from '@components/SearchBar';
import { AvailableNodes } from '@constants/nodes';
import { POINodeRequest } from '@services/poi-node-request';
import { IGNORED_LISTS, ResultList } from '../components/ResultList';

export enum QueryTypeEnum {
  ADDRESS = 'address',
  TX = 'tx',
}
export type Query = {
  network: NetworkName;
  type: QueryTypeEnum;
  value: string;
};
export declare enum POIStatus {
  Valid = 'Valid',
  ShieldBlocked = 'ShieldBlocked',
  ProofSubmitted = 'ProofSubmitted',
  Missing = 'Missing',
}
export type POIsPerList = {
  [listKey: string]: POIStatus;
};
export type POIsPerListMap = {
  [blindedCommitment: string]: POIsPerList;
};

export type NewPOIsPerBlindedCommitment = {
  blindedCommitment: string;
  poiStatus: POIStatus;
};

export type NewPOIsPerList = {
  [listKey: string]: NewPOIsPerBlindedCommitment[];
};

export type POIResult = {
  txid: string;
  poisPerList: POIsPerListMap;
};

export type NewPOIResult = {
  txid: string;
  poisPerList: NewPOIsPerList;
};

export type AllResults = {
  txData: { railgunTransaction: RailgunTransactionV2; railgunTxid: string }[];
  poiData: NewPOIResult[];
};

export declare enum TokenType {
  ERC20 = 0,
  ERC721 = 1,
  ERC1155 = 2,
}
export type TransactionReceiptLog = {
  topics: string[];
  data: string;
};
export type TokenData = {
  tokenType: TokenType;
  tokenAddress: string;
  tokenSubID: string;
};
export type UnshieldRailgunTransactionData = {
  tokenData: TokenData;
  toAddress: string;
  value: string;
};
export declare enum RailgunTransactionVersion {
  V2 = 'V2',
  V3 = 'V3',
}
export type RailgunTransactionV2 = {
  version: RailgunTransactionVersion.V2;
  graphID: string;
  commitments: string[];
  nullifiers: string[];
  boundParamsHash: string;
  blockNumber: number;
  txid: string;
  unshield?: UnshieldRailgunTransactionData;
  utxoTreeIn: number;
  utxoTreeOut: number;
  utxoBatchStartPositionOut: number;
  timestamp: number;
  verificationHash: string;
};

const aggregatorNode = AvailableNodes[0];

export const App: React.FC<{ initialQuery: Query | undefined }> = ({
  initialQuery,
}) => {
  const [result, setResult] = useState<AllResults | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const [isInternalError, setIsInternalError] = useState<boolean>(false);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkName>(
    initialQuery?.network || NetworkName.Ethereum,
  );

  // const [aggregatorNode, setAggregatorNode] = useState<string>(
  //   AvailableNodes[0],
  // );
  const [nodeStatusForAllNetworks, setNodeStatusForAllNetworks] = useState<
    NodeStatusAllNetworks | undefined
  >(undefined);

  // Function to fetch NodeStatusAllNetworks
  const fetchNodeStatusForAllNetworks = async () => {
    const data = await POINodeRequest.getNodeStatusAllNetworks(aggregatorNode);
    // setNodeStatusForAllNetworks(data);
    return data;
  };

  const makeQuery = async (
    query: Query,
    nodeStatus: NodeStatusAllNetworks,
  ): Promise<AllResults | undefined> => {
    try {
      let queryData: {
        txid: string;
        transactionDatas: {
          railgunTransaction: RailgunTransactionV2;
          railgunTxid: string;
        }[];
      }[];
      if (query.type === QueryTypeEnum.ADDRESS) {
        queryData = await getRailgunTransactionDataForUnshieldToAddress(
          NETWORK_CONFIG[query.network].chain,
          query.value,
        );
      } else if (query.type === QueryTypeEnum.TX) {
        let railgunTxids = await getRailgunTxDataForUnshields(
          NETWORK_CONFIG[query.network].chain,
          query.value,
        );
        queryData = [
          {
            txid: query.value,
            transactionDatas: railgunTxids,
          },
        ];
      } else {
        queryData = [];
      }

      if (
        queryData.length === 0 ||
        (queryData.length === 1 && queryData[0].transactionDatas.length === 0)
      ) {
        console.error('Query is empty');
        setIsNotFound(true);
        return undefined;
      }

      const railgunTxidToTransactionMap = new Map<string, RailgunTransactionV2>(
        queryData
          .flatMap(queryTx => queryTx.transactionDatas)
          .map(txData => [txData.railgunTxid, txData.railgunTransaction]),
      );

      const data = await Promise.all(
        queryData.map(async queryTx => {
          const poisPerList = await POINodeRequest.getPOIsPerList(
            aggregatorNode,
            query.network,
            TXIDVersion.V2_PoseidonMerkle,
            nodeStatus?.listKeys ?? [],
            queryTx.transactionDatas.map(txData => ({
              blindedCommitment: '0x' + txData.railgunTxid,
              type: BlindedCommitmentType.Unshield,
            })),
          );
          // Transforming to NewPOIsPerList structure
          const newPoisPerList: NewPOIsPerList = {};
          for (const [blindedCommitment, curPoisPerList] of Object.entries(
            poisPerList,
          )) {
            for (const [listKey, poiStatus] of Object.entries(curPoisPerList)) {
              if (newPoisPerList[listKey] === undefined) {
                newPoisPerList[listKey] = [];
              }
              newPoisPerList[listKey].push({
                blindedCommitment,
                poiStatus,
              });
            }
          }
          // now sort the newPoisPerList for each listKey
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          for (const [listKey, poisPerBlindedCommitment] of Object.entries(
            newPoisPerList,
          )) {
            poisPerBlindedCommitment.sort((a, b) => {
              const transactionA = railgunTxidToTransactionMap.get(
                a.blindedCommitment.slice(2),
              );
              const transactionB = railgunTxidToTransactionMap.get(
                b.blindedCommitment.slice(2),
              );

              if (!transactionA || !transactionB) {
                // Handle the case where one or both transactions are not found.
                // You might want to sort these cases differently or throw an error.
                return 0; // This example does nothing and keeps the original order.
              }

              // get the last 10 digits of the graphID
              const timestampA = Number(transactionA.graphID.slice(-10));
              const timestampB = Number(transactionB.graphID.slice(-10));

              return timestampA - timestampB;
            });
          }

          return { txid: queryTx.txid, poisPerList: newPoisPerList };
          // return { txid: queryTx.txid, poisPerList };
        }),
      );

      return {
        txData: queryData.reduce(
          (accumulator, currentValue) => {
            return accumulator.concat(currentValue.transactionDatas);
          },
          [] as {
            railgunTransaction: RailgunTransactionV2;
            railgunTxid: string;
          }[],
        ),
        poiData: data,
      };
    } catch (e) {
      console.error(e);
      return undefined;
    }
  };

  useEffect(() => {
    setIsInternalError(false);
    setIsNotFound(false);
    setIsLoading(true);

    fetchNodeStatusForAllNetworks()
      .then(result => {
        if (initialQuery) {
          // setNodeStatusForAllNetworks(result);
          makeQuery(initialQuery, result)
            .then(result => {
              setResult(result);
              setIsLoading(false);
            })
            .catch(e => {
              console.error(e);
              setIsInternalError(true);
              setIsLoading(false);
            });
        } else {
          setNodeStatusForAllNetworks(result);
          setIsLoading(false);
        }
      })
      .catch(e => {
        setIsLoading(false);
        setIsInternalError(true);
        console.error(e);
      });
  }, [initialQuery]);

  // const queryHandler = (query: Query) => {
  //   if (!nodeStatusForAllNetworks) {
  //     return;
  //   }
  //   setIsLoading(true);
  //   makeQuery(query, nodeStatusForAllNetworks)
  //     .then(result => {
  //       setResult(result);
  //       setIsLoading(false);
  //     })
  //     .catch(e => {
  //       console.error(e);
  //       setIsLoading(false);
  //     });
  // };

  const getTotalLegacyProofs = (
    nodeStatus: NodeStatusAllNetworks | undefined,
  ) => {
    // Check if nodeStatus is defined and has the forNetwork property
    if (nodeStatus !== undefined && nodeStatus.forNetwork !== undefined) {
      // Check if the current network is defined in forNetwork
      const networkStatus = nodeStatus.forNetwork[currentNetwork];
      if (networkStatus) {
        // Reduce all networks to sum their legacyTransactProofs
        return Object.entries(networkStatus.listStatuses).reduce(
          (
            accumulator: number,
            [key, currentValue]: [string, POIListStatus],
          ) => {
            return (
              accumulator +
              (IGNORED_LISTS.includes(key)
                ? 0
                : currentValue.poiEventLengths.Unshield +
                  currentValue.poiEventLengths.Transact +
                  currentValue.poiEventLengths.LegacyTransact +
                  currentValue.poiEventLengths.Shield)
            );
          },
          0,
        );
      }
    }

    // Return 0 if nodeStatus is not defined or doesn't have the forNetwork property
    return 0;
  };

  return (
    <div className="flex flex-col space-y-4 max-w-screen-lg w-full  p-2 md:p-16">
      <div className="text-black text-2xl font-semibold mb-0.5">
        RAILGUN Private Proofs of Innocence Explorer
      </div>
      <div className="text-black text-base font-normal pb-9 ">
        Enter a transaction number to check the Privacy Pool status of RAILGUN
        private transactions. This explorer only looks at the blinded proofs of
        Private POI and does not contain any other transaction information.
      </div>
      <SearchBar
        initialNetwork={initialQuery ? initialQuery.network : undefined}
        initialQueryValue={initialQuery ? initialQuery.value : undefined}
        currentNetwork={currentNetwork}
        setCurrentNetwork={setCurrentNetwork}
      />
      {!isLoading && isNotFound && (
        <ErrorComponent
          title="Search not found"
          description="Oops! We couldn’t find any data related to the entered value."
          image="/SearchNotFound.png"
        />
      )}

      {!isLoading && isInternalError && (
        <ErrorComponent
          title="Internal error"
          description="Oops! We had an issue on our end, try again later."
          image="/InternalError.png"
        />
      )}
      {!isLoading && !result && nodeStatusForAllNetworks !== undefined && (
        <ProofCounter
          totalProofs={getTotalLegacyProofs(nodeStatusForAllNetworks)}
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && result && <ResultList results={result} />}
    </div>
  );
};

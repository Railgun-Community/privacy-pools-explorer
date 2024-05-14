import { isDefined, NetworkName } from '@railgun-community/shared-models';
import { useParams } from 'react-router-dom';
import { App, QueryTypeEnum } from '../screens/App';
import { ErrorComponent } from './Error';
import { isAddress, isNetworkCorrect, isTx } from './SearchBar';

const ErrorRoute = () => {
  return (
    <ErrorComponent
      title="404"
      description="Oops! The requested URL was not found on this server. That’s all we know."
      image="/NotFoundImg.png"
    />
  );
};

const TxRouteHandler = () => {
  const { network, value } = useParams();
  if (
    value !== undefined &&
    isTx(value) &&
    isDefined(network) &&
    isNetworkCorrect(network)
  ) {
    const query = {
      network: network as NetworkName,
      type: QueryTypeEnum.TX,
      value,
    };
    return <App initialQuery={query} />;
  }
  return ErrorRoute();
};

const AddressRouteHandler = () => {
  const { network, value } = useParams();

  if (
    value !== undefined &&
    isAddress(value) &&
    isDefined(network) &&
    isNetworkCorrect(network)
  ) {
    const query = {
      network: network as NetworkName,
      type: QueryTypeEnum.ADDRESS,
      value,
    };
    return <App initialQuery={query} />;
  }
  return ErrorRoute();
};

export { AddressRouteHandler, TxRouteHandler };

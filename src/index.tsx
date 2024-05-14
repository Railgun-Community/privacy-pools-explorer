import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ErrorComponent } from '@components/Error';
import { Layout } from './components/Layout';
import { AddressRouteHandler, TxRouteHandler } from './components/RouteHandler';
import { App } from './screens/App';

// import { ExplorerProvider } from './services/explorer';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App initialQuery={undefined} />} />
          <Route path=":network/tx/:value" element={<TxRouteHandler />} />
          <Route
            path=":network/address/:value"
            element={<AddressRouteHandler />}
          />
          <Route
            path="*"
            element={
              <ErrorComponent
                title="404"
                description="Oops! The requested URL was not found on this server. That’s all we know."
                image="/NotFoundImg.png"
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  </React.StrictMode>,
);

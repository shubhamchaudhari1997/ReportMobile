
import React, { useEffect, useState } from 'react';
import DimensionProvider, { dimensions } from '../context/Dimensions';
import { ToastStatus } from '../model';
import { COLORS } from '../theme';


type GLoader = {
  showLoader: () => void;
  hideLoader: () => void;
  isLoading: boolean;
};

type GToast = {
  hideToast: () => void;
  showToast: (
    message: string,
    status?: ToastStatus,
    action?: () => void,
  ) => void;
  isToastLive: boolean;
};

type StatusBarIOS = {
  backgroundColor: string | undefined;
  setBackgroundColor: (color?: string) => void;
};

const hideLoader = () => { };
const showLoader = () => { };

const loader = React.createContext<GLoader>({
  hideLoader,
  showLoader,
  isLoading: false,
});

const hideToast = () => { };
const showToast = () => { };

const toast = React.createContext<GToast>({
  hideToast,
  showToast,
  isToastLive: false,
});

const statusBarIOS = React.createContext<StatusBarIOS>({
  backgroundColor: COLORS.primaryColor,
  setBackgroundColor: () => { },
});

const context = {
  loader,
  toast,
  dimensions,
  statusBarIOS,
};

type ContextProvideType = {
  children: React.ReactNode
};

const ContextProvider: React.FC<ContextProvideType> = ({ children }) => {
  const [isGLoader, setIsGLoader] = useState(false);
  const [isToastLive, setIsToastLive] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastStatus, setToastStatus] = useState<ToastStatus>('primary');
  const [statusBarIOSBackgroundColor, setStatusIOSBackgroundColor] = useState<
    string | undefined
  >(COLORS.primaryColor);

  const showLoader = () => {
    setIsGLoader(true);
  };

  const hideLoader = () => {
    setIsGLoader(false);
  };

  const showToast = (message: string, status: ToastStatus = 'primary') => {
    setToastMessage(message);
    setToastStatus(status);
    setIsToastLive(true);
  };

  const hideToast = () => {
    setIsToastLive(false);
    setToastMessage('');
    setToastStatus(toastStatus);
  };

  return (
    <DimensionProvider>
      <loader.Provider value={{ showLoader, hideLoader, isLoading: isGLoader }}>
        <toast.Provider
          value={{
            showToast,
            hideToast,
            isToastLive,
          }}>
          {children}
          {/* <GActivityIndicator isLoading={isGLoader} />
          <ToastComponent
            status={toastStatus}
            show={isToastLive}
            message={toastMessage}
          /> */}
        </toast.Provider>
      </loader.Provider>
    </DimensionProvider>
  );
};

export { ContextProvider };

export default context;

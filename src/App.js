import { useEffect, useState } from 'react';
import Web3 from 'web3';
import styles from './App.module.scss';

export const App = () => {
    const [address, setAddress] = useState(null);

    const onMetamaskLogin = async () => {
        if (window.ethereum) {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            setAddress(window.web3.currentProvider.selectedAddress);
        }
    };

    useEffect(() => {
        window.web3 = new Web3(window.ethereum);

        if (window.ethereum) {
            window.web3.eth.getAccounts(function (err, accounts) {
                if (accounts.length !== 0) {
                    setAddress(accounts[0]);
                }
            });
        }
    }, []);

    return (
        <div className={styles.app}>
            <div className={styles.container}>
                {address ? (
                    <span className={styles.address}>
                        Your address: <b>{address}</b>
                    </span>
                ) : (
                    <>
                        <h1 className={styles.title}>MetaMask is locked - please login</h1>

                        <button className={styles.button} onClick={onMetamaskLogin}>
                            Get public key
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

import React, { Component, createContext } from 'react';
import Web3 from 'web3';
import { abi as dogeStakingAbi } from "../../contracts/dogestaking.json";
import { abi as puppyAbi } from "../../contracts/puppy.json";

const userContext = createContext();

export default class UserProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            web3: null,
            user: null,
            dogeContract: null,
            puppyToken: null,
        }
    }

    // loadWeb3
    loadWeb3 = async () => {
        try {
            if(window.ethereum) {
                window.web3 = new Web3(window.ethereum);
                await window.ethereum.enable();
                // cancel autorefresh on network change
                window.ethereum.autoRefreshOnNetworkChange = false;
    
            } else if(window.web3) {
                window.web3 = new Web3(window.web3.currentProvider);
            } else {
                throw new Error();
            }

        } catch (_) {
            window.alert("Non-Ethereum browser detected. You should consider installing Metamask")
        }
    }

    // load blockchain data
    loadBlockchainData = async () => {
        try {
            const web3 = window.web3;
            const puppyAddress = '0x5d8aFECB6D10e5a3a88E2B7b4F3a8ed726cb0e62';
            const dogeAddress = '0xf22DAC468E448A77e7c2F119d8dad2F079765490';

            // const owner = '0xC2B749E8A879706882AF10A3611BA3767bE2314d';

            // ETHDOGEADDRESS
            // const firstToken = '0xDb8b2D5E991019AB60F59c3c309b13F8425b9EB6';

            // ETHUSDT
            // const secondToken = '0x1AD04f1458fE6A5F8E0A624eDc75D683a1FB7521';

            // ETHUSDC
            // const thirdToken = '0x354Df7895E1Be211e00aD9252625df81cA6E1A37';

            const dogeContract = new web3.eth.Contract(dogeStakingAbi, dogeAddress);
            const puppyToken = new web3.eth.Contract(puppyAbi, puppyAddress);

            const accounts = await web3.eth.getAccounts();
            const user = accounts[0];

            this.setState({ 
                loading: false,
                web3, 
                user,
                dogeContract,
                puppyToken,
            });
        } catch (error) {
            console.log(error)
        }
    }

    connectWallet = async () => {
        await this.loadWeb3();
    }

    render() {
        return (
            <userContext.Provider value={{
                ...this.state,
                connectWallet: this.connectWallet
            }}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}


export { userContext, UserProvider }
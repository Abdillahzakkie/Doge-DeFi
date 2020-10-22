import React, { Component, createContext } from 'react';
import Web3 from 'web3';
import { abi as dogeStakingAbi } from "../../contracts/dogestaking.json";
import { abi as puppyAbi } from "../../contracts/puppy.json";
import { data } from '../data/menu'

const userContext = createContext();

export default class UserProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            loading: true,
            web3: null,
            user: null,
            dogeContract: null,
            dogeTokenAddress: null,
            puppyToken: null,
            puppyTokenAddress: null,
            ETHDOGEADDRESS: null,
            EthUSDTAddress: null,
            EthUSDCAddress: null,
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
            const puppyTokenAddress = '0x5d8aFECB6D10e5a3a88E2B7b4F3a8ed726cb0e62';
            const dogeTokenAddress = '0xf22DAC468E448A77e7c2F119d8dad2F079765490';

            // const owner = '0xC2B749E8A879706882AF10A3611BA3767bE2314d';

            // ETHDOGEADDRESS
            const ETHDOGEADDRESS = '0xDb8b2D5E991019AB60F59c3c309b13F8425b9EB6';

            // ETHUSDT
            const EthUSDTAddress = '0x1AD04f1458fE6A5F8E0A624eDc75D683a1FB7521';

            // ETHUSDC
            const EthUSDCAddress = '0x354Df7895E1Be211e00aD9252625df81cA6E1A37';

            const dogeContract = new web3.eth.Contract(dogeStakingAbi, dogeTokenAddress);
            const puppyToken = new web3.eth.Contract(puppyAbi, puppyTokenAddress);

            const accounts = await web3.eth.getAccounts();
            const user = accounts[0];
            
            this.setState({ 
                loading: false,
                web3, 
                user,
                dogeContract,
                dogeTokenAddress,
                puppyToken,
                puppyTokenAddress,
                ETHDOGEADDRESS,
                EthUSDTAddress,
                EthUSDCAddress
            });
        } catch (error) {
            console.log(error)
        }
    }

    toWei = value => this.state.web3.utils.toWei(String(value), 'ether');

    fromWei = value => this.state.web3.utils.fromWei(String(value), 'ether');

    getSlug = id => data.find(item => item.id === id);

    connectWallet = async () => {
        await this.loadWeb3();
        await this.loadBlockchainData();

        console.log(
            await this.state.puppyToken.methods
        )

    }

    isAddress = async _account => {
        try {
            const result = await this.state.web3.utils.isAddress(_account);
            if(!result) throw new Error();
            return result;
        } catch (error) {
            return { message: 'Not a valid account' }
        }
    }

    /* PUPPY Token Contract */
    approvePuppyToken = async _amount => {
        try {
            const result = await this.state.puppyToken.methods.approve(
                this.state.puppyTokenAddress, this.toWei(10).send({
                    from: this.state.user,
                    gas: this.toWei(.0000000025)
                })
            );
            return result;
    
        } catch (error) {
            console.log(error.message)
        }
    }

    balanceOf = async _account => {
        try {
            this.isAddress(_account);
            const result = await this.state.puppyToken.balanceOf(_account).call();
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    burn = async _amount => {
        try {
            const result = await this.state.puppyToken.burn(this.toWei(_amount)).send({
                from: this.state.user,
                gas: this.toWei(.0000000025)
            });
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    burnByowner = async (_account, _amount) => {
        try {
            this.isAddress(_account);
            const result = await this.state.puppyToken.burnByowner(_account, this.toWei(_amount)).send({
                from: this.state.user,
                gas: this.toWei(.0000000025)
            })
            return result;
        } catch (error) {
            console.log(error.message)   
        }
    }

    decreaseAllowance = async (_account, _amount) => {
        try {
            this.isAddress(_account)
            const result = await this.state.puppyToken.decreaseAllowance(
                _account, this.toWei(_amount)
            ).send({
                from: this.state.user,
                gas: this.toWei(.0000000025)
            })
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    giveRewardsToStakers = async (_account, _amount) => {
        try {
            this.isAddress(_account);
            const result = await this.state.giveRewardsToStakers(
                _account, this.toWei(_amount)
            ).send({
                from: this.state.user,
                gas: this.toWei(.0000000025)
            })
            return result
        } catch (error) {
            console.log(error.message)
        }
    }

    increaseAllowance = async (_account, _amount) => {
        try {
            this.isAddress(_account);
            const result = await this.state.puppyToken.increaseAllowance(
                _account, this.toWei(_amount)
            ).send({
                from: this.state.user, 
                sgas: this.toWei(.0000000025)
            })
            return result
        } catch (error) {   
            console.log(error.message)
        }
    }
    /* End Puppy token contract */

    render() {
        return (
            <userContext.Provider value={{
                ...this.state,
                getSlug: this.getSlug,
                connectWallet: this.connectWallet,
                approvePuppyToken: this.approvePuppyToken,
                balanceOf: this.balanceOf,
                decreaseAllowance: this.decreaseAllowance,
                giveRewardsToStakers: this.giveRewardsToStakers,
                increaseAllowance: this.increaseAllowance
            }}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}


export { userContext, UserProvider }
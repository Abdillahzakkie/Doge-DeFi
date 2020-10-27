import React, { Component, createContext } from 'react';
import Web3 from 'web3';
import { abi as dogeStakingAbi } from "../../contracts/dogestaking.json";
import { abi as ERC20_TOKEN } from "../../contracts/ERC20_token.json";
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
            ETH_DOGE: null,
            claimableDogeETH: null,
            EHT_USDT: null,
            claimableEthUsdt: null,
            EHT_USDC: null,
            claimableEthUsdc: null
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
            const dogeTokenAddress = '0xE4A06D74af47924A2fa26205eeD6F7b6FC3144C0';
            const ETH_DOGE_ADDRESS = '0xb6916bc20cae34de64af39b8534d1459d8bb4128';
            const EHT_USDT_ADDRESS = '0x6C3e4cb2E96B01F4b866965A91ed4437839A121a';
            const EHT_USDC_ADDRESS = '0x7FBa4B8Dc5E7616e59622806932DBea72537A56b';

            const dogeContract = new web3.eth.Contract(dogeStakingAbi, dogeTokenAddress);
            const ETH_DOGE = new web3.eth.Contract(ERC20_TOKEN, ETH_DOGE_ADDRESS);
            const EHT_USDT = new web3.eth.Contract(ERC20_TOKEN, EHT_USDT_ADDRESS);
            const EHT_USDC = new web3.eth.Contract(ERC20_TOKEN, EHT_USDC_ADDRESS);

            const accounts = await web3.eth.getAccounts();
            const user = accounts[0];

            this.setState({ 
                loading: false,
                web3, 
                user,
                dogeContract,
                dogeTokenAddress,
                ETH_DOGE,
                EHT_USDT,
                EHT_USDC
            });
        } catch (error) { console.log(error) }
    }

    toWei = value => this.state.web3.utils.toWei(String(value), 'ether');

    fromWei = value => this.state.web3.utils.fromWei(String(value), 'ether');

    getSlug = id => data.find(item => item.id === id);

    connectWallet = async () => {
        await this.loadWeb3();
        await this.loadBlockchainData();

        await this.loadTokenBalance();
    }

    loadTokenBalance = async () => {
        try {
            let claimableDogeETH = (await this.claimableDogeETHPuppyTokens())['1'];
            claimableDogeETH = this.fromWei(claimableDogeETH);

            let claimableEthUsdt = (await this.claimableEthUsdtPuppyTokens())['1'];
            claimableEthUsdt = this.fromWei(claimableEthUsdt);

            let claimableEthUsdc = (await this.claimableEthUsdcTokens())['1'];
            claimableEthUsdc = this.fromWei(claimableEthUsdc);

            this.setState({
                claimableDogeETH, 
                claimableEthUsdt, 
                claimableEthUsdc
            })
        } catch (error) { console.log(error.message) }
    }

    stakedAllTokens = async _account => {
        try {
            const result = await this.state.dogeContract.methods.stakedAllTokens(_account).call();
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    // DOGE-ETH
    stakeDogeEthTokens = async (_amount, { user } = this.state) => {
        try {
            const result = await this.state.dogeContract.methods.stakeDogeEthTokens(
                this.toWei(_amount)
            ).send({ from: user, gas: '60000' })
            console.log(result)
            return result;
        } catch (error) { console.log(error.message) }
    }

    claimableDogeETHPuppyTokens = async () => {
        try {
            let result = await this.state.dogeContract.methods.claimableDogeETHPuppyTokens(
                this.state.user
            ).call();
            return result;
        } catch (error) { console.log(error.message) }
    }

    claimEthDogePuppyTokens = async ({ user } = this.state) => {
        try {
            const result = await this.state.dogeContract.methods.claimEthDogePuppyTokens().send({
                from: user, gas: '60000'
            })
            console.log(result);
            return result
        } catch (error) { console.log(error.message) }
    }

    // ETH-USDT
    stakeEthUsdtTokens = async (_amount, { user } = this.state) => {
        try {
            const result = await this.state.EHT_USDT.methods.stakeEthUsdtTokens(
                this.toWei(_amount)
            ).send({ from: user, gas: '60000' })
            console.log(result)
            return result;
        } catch (error) { console.log(error.message) }
    }

    claimableEthUsdtPuppyTokens = async () => {
        try {
            let result = await this.state.dogeContract.methods.claimableEthUsdtPuppyTokens(
                this.state.user
            ).call();
            return result;
        } catch (error) { console.log(error.message) }
    }

    claimEthUsdtPuppyTokens = async ({ user } = this.state) => {
        try {
            const result = await this.state.dogeContract.methods.claimEthUsdtPuppyTokens().send({
                from: user, gas: '60000'
            });
            console.log(result);
            return result;
        } catch (error) { console.log(error.message) }
    }

    // ETH-USDC
    stakeEthUsdcTokens = async (_amount, { user } = this.state) => {
        try {
            const result = await this.state.dogeContract.methods.stakeEthUsdcTokens(
                this.toWei(_amount)
            ).send({ from: user, gas: this.toWei('0.000000025') })
            console.log(result)
            return result;
        } catch (error) { console.log(error.message) }
    }

    claimableEthUsdcTokens = async () => {
        try {
            let result = await this.state.dogeContract.methods.claimableEthUsdcTokens(
                this.state.user
            ).call();
            return result;
        } catch (error) { console.log(error.message) }
    }

    claimEthUsdcTokens = async ({ user } = this.state) => {
        try {
            const result = await this.state.dogeContract.methods.claimEthUsdcTokens().send({
                from: user, gas: '60000' 
            });
            console.log(result);
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }


    render() {
        return (
            <userContext.Provider value={{
                ...this.state,
                getSlug: this.getSlug,
                connectWallet: this.connectWallet,
                stakedAllTokens: this.stakedAllTokens,
                totalPuppyToken: this.totalPuppyToken,

                // DOGE-ETH
                stakeDogeEthTokens: this.stakeDogeEthTokens,
                claimableDogeETHPuppyTokens: this.claimableDogeETHPuppyTokens,
                claimEthDogePuppyTokens: this.claimEthDogePuppyTokens,

                // ETH-USDC
                stakeEthUsdtTokens: this.stakeEthUsdtTokens,
                claimableEthUsdtPuppyTokens: this.claimableEthUsdtPuppyTokens,
                claimEthUsdtPuppyTokens: this.claimEthUsdtPuppyTokens,

                // ETH-USDT
                stakeEthUsdcTokens: this.stakeEthUsdcTokens,
                claimableEthUsdcTokens: this.claimableEthUsdcTokens,
                claimEthUsdcTokens: this.claimEthUsdcTokens
            }}>
                {this.props.children}
            </userContext.Provider>
        )
    }
}


export { userContext, UserProvider }
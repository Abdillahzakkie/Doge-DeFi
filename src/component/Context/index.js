import React, { Component, createContext } from 'react';
import Web3 from 'web3';
import { abi as dogeStakingAbi } from "../../contracts/dogestaking.json";
import { abi as puppyAbi } from "../../contracts/puppy.json";
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
            puppyToken: null,
            puppyTokenAddress: null,
            ETH_DOGE: null,
            EHT_USDT: null,
            EHT_USDC: null,
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
            const ETH_DOGE_ADDRESS = '0xB6D116D1453766eA8A91D9a9A9A868Ca8BD63afe';
            const EHT_USDT_ADDRESS = '0x664ac36070547928Bd8f7e67dC84608D89b25cc6';
            const EHT_USDC_ADDRESS = '0xaaB0558240789562b0f1da62bcE87acEF9c2F7ae';

            const dogeContract = new web3.eth.Contract(dogeStakingAbi, dogeTokenAddress);
            const puppyToken = new web3.eth.Contract(puppyAbi, puppyTokenAddress);
            const ETH_DOGE = new web3.eth.Contract(ERC20_TOKEN, ETH_DOGE_ADDRESS);
            const EHT_USDT = new web3.eth.Contract(ERC20_TOKEN, EHT_USDT_ADDRESS);
            const EHT_USDC = new web3.eth.Contract(ERC20_TOKEN, EHT_USDC_ADDRESS);

            const accounts = await web3.eth.getAccounts();
            const user = accounts[0];

            // console.log(
            //     await ETH_DOGE.methods.approve(dogeContract._address, 1000).send({
            //         from: user,
            //         gas: '50000'
            //     })
            // )

            console.log(
                await ETH_DOGE.methods.balanceOf(user).call()
            )

            console.log(
                await ETH_DOGE.methods.allowance(user, dogeContract._address).call()
            )
            
            this.setState({ 
                loading: false,
                web3, 
                user,
                dogeContract,
                dogeTokenAddress,
                puppyToken,
                puppyTokenAddress,
                ETH_DOGE,
                EHT_USDT,
                EHT_USDC
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
    approveDogeEthTokens = async _amount => {
        try {
            const result = await this.state.ETH_DOGE.methods.approve(
                this.state.dogeContract._address,
                _amount.toString()
            ).send({
                from: this.state.user,
                gas: '60000'
            });
            console.log(result);
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    stakeDogeEthTokens = async _amount => {
        try {
            const result = await this.state.dogeContract.methods.stakeDogeEthTokens(
                _amount.toString()
            ).send({
                from: this.state.user,
                gas: '60000'
            })
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    claimableDogeETHPuppyTokens = async () => {
        try {
            const result = await this.state.dogeContract.methods.claimableDogeETHPuppyTokens(
                this.state.user
            ).call();
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    claimEthDogePuppyTokens = async () => {
        try {
            const result = await this.state.dogeContract.methods.claimEthDogePuppyTokens().send({
                from: this.state.user,
                gas: '60000'
            })
            console.log(result);
            return result
        } catch (error) {
            console.log(error.message)
        }
    }

    // ETH-USDT
    approveEthUsdtPuppyTokens = async _amount => {
        try {
            const result = await this.state.EHT_USDT.methods.approve(
                this.state.dogeContract._address, 
                _amount.toString()
            ).send({
                from: this.state.user,
                gas: '60000'
            });
            console.log(result);
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    stakeEthUsdtTokens = async _amount => {
        try {
            const result = await this.state.EHT_USDT.methods.stakeEthUsdtTokens(
                _amount.toString()
            ).send({
                from: this.state.user,
                gas: '60000'
            })
            return result;
        } catch (error) { console.log(error.message) }
    }

    claimableEthUsdtPuppyTokens = async () => {
        try {
            const result = await this.state.dogeContract.methods.claimableEthUsdtPuppyTokens(
                this.state.user
            ).call();
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    claimEthUsdtPuppyTokens = async () => {
        try {
            const result = await this.state.dogeContract.methods.claimEthUsdtPuppyTokens().send({
                from: this.state.user,
                gas: '60000'
            });
            console.log(result);
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    // ETH-USDC
    approveEthUsdcTokens = async _amount => {
        try {
            const result = await this.state.EHT_USDC.methods.approve(
                this.state.dogeContract._address, 
                _amount.toString()
            ).send({
                from: this.state.user,
                gas: '60000'
            });
            console.log(result);
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    stakeEthUsdcTokens = async _amount => {
        try {
            const result = await this.state.dogeContract.methods.stakeEthUsdcTokens(
                _amount.toString()
            ).send({
                user: this.state.user,
                from: this.toWei('0.000000025')
            })
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    claimableEthUsdcTokens = async () => {
        try {
            const result = await this.state.dogeContract.methods.claimableEthUsdcTokens(
                this.state.user
            ).call();
            return result;
        } catch (error) {
            console.log(error.message)
        }
    }

    claimEthUsdcTokens = async () => {
        try {
            const result = await this.state.dogeContract.methods.claimEthUsdcTokens().send({
                from: this.state.user,
                gas: '60000'
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
                approveDogeEthTokens: this.approveDogeEthTokens,
                stakeDogeEthTokens: this.stakeDogeEthTokens,
                claimableDogeETHPuppyTokens: this.claimableDogeETHPuppyTokens,
                claimEthDogePuppyTokens: this.claimEthDogePuppyTokens,

                // ETH-USDC
                approveEthUsdtPuppyTokens: this.approveEthUsdtPuppyTokens,
                stakeEthUsdtTokens: this.stakeEthUsdtTokens,
                claimableEthUsdtPuppyTokens: this.claimableEthUsdtPuppyTokens,
                claimEthUsdtPuppyTokens: this.claimEthUsdtPuppyTokens,

                // ETH-USDT
                approveEthUsdcTokens: this.approveEthUsdcTokens,
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
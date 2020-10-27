/* Approve tokens */
export const handleApproveToken = (
    loading, approveAmount, card,
    web3, user, ETH_DOGE, 
    EHT_USDT, EHT_USDC, dogeTokenAddress
) => async (e) => {
    e.preventDefault();
    if(loading) return alert('Unlock your account to proceed');
    const tokenName = card.title1;

    if(approveAmount === '') return alert ('Please approve an amount before continuing');
    if(tokenName === 'Water') {
        try {
            const result = await ETH_DOGE.methods.approve(
                dogeTokenAddress, web3.utils.toWei(approveAmount)
            ).send({ from: user, gas: '60000' });
            return result;
            
        } catch (error) { console.log(error.message) }

    } else if(tokenName === 'Fish') {
        try {
            const result = await EHT_USDT.methods.approve(
                dogeTokenAddress, web3.utils.toWei(approveAmount)
            ).send({ from: user, gas: '60000' });
            return result;

        } catch (error) { console.log(error.message) }

    } else if(tokenName === 'Eat') {
        try {
            const result = await EHT_USDC.methods.approve(
                dogeTokenAddress, web3.utils.toWei(approveAmount)
            ).send({ from: user, gas: '60000' });
            return result;

        } catch (error) { console.log(error.message) }
    }
    return;
}
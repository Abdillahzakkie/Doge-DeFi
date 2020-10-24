export const handleStakeToken = (
    loading, stakeAmount, card,
    stakeDogeEthTokens, stakeEthUsdtTokens, stakeEthUsdcTokens
) => (e) => {
    e.preventDefault();
    if(loading) return alert('Unlock your account to proceed');
    if(stakeAmount === '') return alert ('Please stake an amount before continuing');
    const tokenName = card.title1;

    if(tokenName === 'Water') stakeDogeEthTokens(stakeAmount)
    else if(tokenName === 'Fish') stakeEthUsdtTokens(stakeAmount);
    else if(tokenName === 'Eat') stakeEthUsdcTokens(stakeAmount);
    return;
}
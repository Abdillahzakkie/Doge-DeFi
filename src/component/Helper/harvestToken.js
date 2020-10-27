export const handleHarvestToken = (
    loading, card, harvestBalance,
    claimEthDogePuppyTokens, 
    claimEthUsdtPuppyTokens, 
    claimEthUsdcTokens
) => (e) => {
    e.preventDefault();
    if(loading) return alert('Unlock your account to proceed');
    if(harvestBalance === '0') return alert('You have zero rewards to claim');
    const tokenName = card.title1;
    if(tokenName === 'Water') claimEthDogePuppyTokens();
    else if(tokenName === 'Fish') claimEthUsdtPuppyTokens();
    else if(tokenName === 'Eat') claimEthUsdcTokens();

    return;
}
export const handleHarvestToken = (
    loading, card, harvestBalance,
    claimEthDogePuppyTokens, claimEthUsdtPuppyTokens, claimEthUsdcTokens
) => (e) => {
    e.preventDefault();
    if(loading) return alert('Unlock your account to proceed');
    if(harvestBalance === '0') return alert('You have zero rewards to claim');

    if(card.title1 === 'Water') claimEthDogePuppyTokens();
    else if(card.title1 === 'Fish') claimEthUsdtPuppyTokens();
    else if(card.title1 === 'Eat') claimEthUsdcTokens();

    return;
}
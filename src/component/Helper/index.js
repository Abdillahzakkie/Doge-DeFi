/* Approve tokens */
export const handleApproveToken = (
    loading, 
    approveAmount, 
    card,
    approveDogeEthTokens, 
    approveEthUsdtPuppyTokens,
    approveEthUsdcTokens
) => (e) => {
    e.preventDefault();
    if(loading) return alert('Unlock your account to proceed');

    if(approveAmount === '') return alert ('Please approve an amount before continuing');
    if(card.title1 === 'Water') {
        approveDogeEthTokens(approveAmount)
    } else if(card.title1 === 'Fish') {
        approveEthUsdtPuppyTokens(approveAmount);
    } else if(card.title1 === 'Eat') {
        approveEthUsdcTokens(approveAmount)
    }
    return;
}

/* Stake tokens */
export const handleStakeToken = (
    loading, 
    stakeAmount, 
    card,
    claimEthDogePuppyTokens, 
    claimEthUsdtPuppyTokens,
    claimEthUsdcTokens
) => (e) => {
    e.preventDefault();
    if(loading) return alert('Unlock your account to proceed');

    if(stakeAmount === '') return alert ('Please stake an amount before continuing');
    if(card.title1 === 'Water') {
        claimEthDogePuppyTokens(stakeAmount)
    } else if(card.title1 === 'Fish') {
        claimEthUsdtPuppyTokens(stakeAmount);
    } else if(card.title1 === 'Eat') {
        claimEthUsdcTokens(stakeAmount)
    }
    return;
}

/* Harvest tokens */
export const handleHarvestToken = (
    loading,
    card,
    harvestBalance,
    claimEthDogePuppyTokens,
    claimEthUsdtPuppyTokens,
    claimEthUsdcTokens
) => (e) => {
    e.preventDefault();
    if(loading) return alert('Unlock your account to proceed');
    if(harvestBalance === '0') return alert('You have zero rewards to claim');

    if(card.title1 === 'Water') {
        claimEthDogePuppyTokens()
    } else if(card.title1 === 'Fish') {
        claimEthUsdtPuppyTokens();
    } else if(card.title1 === 'Eat') {
        claimEthUsdcTokens()
    }
    return;
}
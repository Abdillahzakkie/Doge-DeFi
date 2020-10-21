export const data = [
    {
        id: 1,
        icon: '🍣',
        title1: 'Sushi Party!',
        title2: 'Deposit SUSHI-ETH SLP',
        title3: 'Earn SUSHI',
        apy: 87.17,
    },
    {
        id: 2,
        icon: '🦄',
        title1: 'Sushi Party!',
        title2: 'Deposit SUSHI-ETH SLP',
        title3: 'Earn SUSHI',
        apy: 87.17,
    },
    {
        id: 3,
        icon: '🐢',
        title1: 'Sushi Party!',
        title2: 'Deposit SUSHI-ETH SLP',
        title3: 'Earn SUSHI',
        apy: 87.17,
    },
]

export const getSlug = id => {
    return data.find(item => item.id === id);
}
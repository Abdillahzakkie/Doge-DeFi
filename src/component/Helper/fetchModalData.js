
export default async () => {
    
    const url = 'https://gateway.ipfs.io/ipfs/QmPUMPthBuZ18KfXGnjnqVXTon2dQusequZZ81yxNEv5yZ';
    const response = await fetch(url);
    return await response.json();
}
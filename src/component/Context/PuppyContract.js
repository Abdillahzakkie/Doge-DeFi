/* This script contains all methods from the doge token contract */

const approvePuppyToken = async _amount => {
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

const acceptOwnership = async () => {
    try {
        
    } catch (error) {
        
    }
}
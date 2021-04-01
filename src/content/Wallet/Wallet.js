import React from 'react';

import DashHeader from '../../components/DashHeader';


const Wallet = () => {
    return (
        <div className="bx--grid">
                <div className="bx--row">
                    <DashHeader
                        title="Your"
                        subtitle="Wallet"
                        description="Save your tokens for rainy days"
                        className="bx--col"
                    />
                </div>
            </div>
    );
}

export default Wallet;
import React from 'react';
import DashHeader from '../../components/DashHeader';

const Profile = () => {
    return (
        <>
            <div className="bx--grid">
                <div className="bx--row">
                    <DashHeader
                        title="User"
                        subtitle="Profile"
                        description="Here are your account details"
                        className="bx--col"
                    />
                </div>
            </div>
        </>
    );
};

export default Profile;
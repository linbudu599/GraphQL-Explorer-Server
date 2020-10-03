import React from 'react';

export interface IUserItem {
    uid: string
    name: string
    age: number
    // FIXME: should be enum
    job: string
    isFool: boolean
    registryDate: Date
    lastUpdateDate: Date
}

const UserItem: React.FC<{ user: IUserItem }> = ({ user }) => {
    const { uid, name, age, job, isFool, registryDate, lastUpdateDate } = user
    return (
        <>
            <p>uid: {uid}</p>
            <p>name: {name}</p>
            {/* <p>age: {age}</p>
            <p>job: {job}</p>
            <p>isFool: {isFool ? "fool" : "smart"}</p>
            <p>registryDate: {new Date(registryDate).toLocaleString()}</p>
            <p>lastUpdateDate: {new Date(lastUpdateDate).toLocaleString()}</p> */}
            <p>-------------------</p>

        </>
    )

}

export default UserItem;
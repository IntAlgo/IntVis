import React, { PropsWithRef } from 'react';
import classNames from 'classnames';

export interface navbarButton {
    title: string;
    currState?: string;
    desiredState?: string;
    setState?: any;
    setClose?: any;
    icon?: string;
}

const NavButton = ({
    title,
    currState,
    desiredState,
    setState,
    setClose,
    icon,
}: PropsWithRef<navbarButton>) => {
    const handleClick = () => {
        if (currState !== desiredState) {
            setState(desiredState);
            setClose(false);
        }
    };

    return (
        <div
            className={classNames(
                currState === desiredState ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                'block px-4 py-2 text-sm'
            )}
            onClick={handleClick}
        >
            {icon && (
                <div>
                    <img src={icon} alt="icon" />
                </div>
            )}
            <div>{title.toUpperCase()}</div>
        </div>
    );
};

export default NavButton;

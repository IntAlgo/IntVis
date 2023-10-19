import { dataContext } from '../../context/data-context';
import { useContext, useState } from 'react';
import { finished } from 'stream';
import NavButton from '../../utils/NavButton';
import classNames from 'classnames';
export interface NavBarProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const NavBar_bin = ({ className }: NavBarProps) => {
    const { mode, setMode } = useContext(dataContext);

    const AlgorithmsList = ['inorder', 'preorder', 'postorder'];
    const ModifyOptions = ['add', 'edge'];
    const [algoOptions, setAlgoOptions] = useState(false);
    const [modifyOptions, setModifyOptions] = useState(false);

    return (
        <div className="h-[8vh] bg-white">
            <nav
                aria-label="main navigation"
                role="navigation"
                className="h-full w-full flex flex-row justify-end sm:justify-between px-3"
                tabIndex={0}
            >
                <div className="w-fit my-auto hidden sm:block text-[30px]">
                    Binary trees and its algorithm
                </div>
                <div className="h-full flex gap-x-3">
                    {/* options */}
                    <div className="relative inline-block text-left h-full">
                        <div
                            className="inline-flex w-full justify-center gap-x-1.5 px-2 text-lg font-semibold text-gray-900 h-full"
                            onClick={() => {
                                // if (!algoOptions) {
                                //     setModifyOptions(false);
                                // }
                                setAlgoOptions(!algoOptions);
                            }}
                        >
                            <span
                                className={classNames(
                                    algoOptions
                                        ? 'my-auto py-2 px-1 rounded-md bg-slate-200'
                                        : 'my-auto py-2 px-1 rounded-md'
                                )}
                            >
                                Algorithms
                            </span>
                        </div>
                        {algoOptions && (
                            <div className="absolute left-0 z-10 w-56 origin-top-right rounded-t-none rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ease-in duration-500">
                                <div className="cursor-pointer">
                                    {AlgorithmsList.map((item, index) => {
                                        return (
                                            <NavButton
                                                key={index}
                                                title={item}
                                                currState={mode}
                                                setState={setMode}
                                                setClose={setAlgoOptions}
                                                desiredState={item}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="relative inline-block text-left h-full">
                        <div
                            className="inline-flex w-full justify-center gap-x-1.5 px-2 text-lg font-semibold text-gray-900 h-full"
                            onClick={() => {
                                if (!modifyOptions) {
                                    setAlgoOptions(false);
                                }
                                setModifyOptions(!modifyOptions);
                            }}
                        >
                            <span
                                className={classNames(
                                    modifyOptions
                                        ? 'my-auto py-2 px-1 rounded-md bg-slate-200'
                                        : 'my-auto py-2 px-1 rounded-md'
                                )}
                            >
                                Modify
                            </span>
                        </div>
                        {modifyOptions && (
                            <div className="absolute left-0 z-10 w-56 origin-top-right rounded-t-none rounded-b-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ease-in duration-500">
                                <div className="py-1">
                                    {ModifyOptions.map((item, index) => {
                                        return (
                                            <NavButton
                                                key={index}
                                                title={item}
                                                currState={mode}
                                                setState={setMode}
                                                setClose={setModifyOptions}
                                                desiredState={item}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                    <div
                        onClick={() => setMode('reset')}
                        className="inline-flex w-full justify-center gap-x-1.5 px-2 py-1 text-lg font-semibold text-gray-900 h-full"
                    >
                        <span className="my-auto">Reset</span>
                    </div>
                </div>
                <div>{mode !== 'start' ? mode : ' '}</div>
            </nav>
        </div>
    );
};

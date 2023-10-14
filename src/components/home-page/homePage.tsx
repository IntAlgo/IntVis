import React from 'react';
import { Link } from 'react-router-dom';

export const HomePage = () => {
    return (
        <div>
            <div className="text-white h-[60px] bg-blue-700 flex justify-between align-center px-3">
                <div className="text-[30px] px-2 flex-initial">IntAlgo</div>
                <div className="flex-auto"></div>
                <div className="text-[20px] rounded-md bg-blue-600 hover:bg-blue-800 my-2 mx-4 px-2 py-1 transition-all duration-200">
                    Contact Us
                </div>
            </div>
            <div>
                <h1 className="text-[30px] text-center my-4 font-extrabold">Welcome to IntAlgo</h1>
                <h2 className="text-[20px] text-center my-4 font-semibold">
                    Select a topic to start
                </h2>
                <div className="text-left mx-3 text-[18px]">
                    <div className="text-[25px] underline">Graph Algorithms:</div>
                    <ul className="ml-1">
                        <li>
                            1.{' '}
                            <Link to="/treeTraversal" className="hover:text-blue-600">
                                Trees Traversal
                            </Link>
                        </li>
                        <li>
                            2.{' '}
                            <Link to="/graphTraversal" className="hover:text-blue-600">
                                Graph Traversal
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

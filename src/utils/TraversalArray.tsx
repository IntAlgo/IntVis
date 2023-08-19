import { PropsWithRef, useEffect, useRef, memo } from 'react';
import { DataSet } from 'vis-data';

export interface traversalArray {
    traversalArray?: any | null;
}

const TraversalArray = ({ traversalArray }: PropsWithRef<traversalArray>) => {
    if (traversalArray === null) {
        return <></>;
    }
    return (
        <div className="ml-4 absolute h-fit bg-white rounded-md border-black border-2 w-md overflow-x-scroll flex">
            <div className="grid grid-rows-2 gap-1 px-2 py-1">
                <div className="row-span-1 h-[25px]">Vertex</div>
                <hr />
                <div className="row-span-1">Iteration</div>
            </div>
            {traversalArray?.map((item: any, index: Number) => {
                return (
                    <div className="grid grid-rows-2 gap-1 px-2 py-1">
                        <div className="row-span-1 h-[25px]">{item.id}</div>
                        <hr />
                        <div className="row-span-1">{item.title}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default TraversalArray;

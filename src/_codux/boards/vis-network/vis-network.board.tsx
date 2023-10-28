import { createBoard } from '@wixc3/react-board';
import { VisNetwork } from '../../../components/graphTraversal/vis-network/vis-network';

export default createBoard({
    name: 'VisNetwork',
    Board: () => <VisNetwork />,
    environmentProps: {
        canvasWidth: 670,
        canvasHeight: 515,
    },
});

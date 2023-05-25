import { createBoard } from '@wixc3/react-board';
import { VisNetwork } from '../../../components/vis-network/vis-network';

export default createBoard({
    name: 'VisNetwork',
    Board: () => <VisNetwork />,
    environmentProps: {
        canvasWidth: 194,
        canvasHeight: 533,
    },
});

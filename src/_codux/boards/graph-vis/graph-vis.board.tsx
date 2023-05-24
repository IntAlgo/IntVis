import { createBoard } from '@wixc3/react-board';
import { Graph_vis } from '../../../components/graph-vis/graph-vis';

export default createBoard({
    name: 'Graph_vis',
    Board: () => <Graph_vis />
});

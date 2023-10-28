import { createBoard } from '@wixc3/react-board';
import { NavBar } from '../../../components/graphTraversal/nav-bar/nav-bar';

export default createBoard({
    name: 'NavBar',
    Board: () => <NavBar />,
    environmentProps: {
        canvasWidth: 602,
    },
});

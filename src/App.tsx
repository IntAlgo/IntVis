import { VisNetwork } from './components/graphTraversal/vis-network/vis-network';
import { NavBar } from './components/graphTraversal/nav-bar/nav-bar';
import { HomePage } from './components/home-page/homePage';
import { dataContext } from './context/data-context';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Binary_tree } from './components/treeTraversal/binary-tree/binary-tree';
import { NavBar_bin } from './components/treeTraversal/navbar_binary_tree/nav-bar';

function App() {
    const [mode, setMode] = useState('start');
    const [finished, setFinished] = useState(true);
    return (
        <div className="text-center bg-gradient-to-b from-slate-300 to-white h-full">
            <dataContext.Provider
                value={{
                    mode,
                    setMode,
                    finished,
                    setFinished,
                }}
            >
                <Router>
                    <Routes>
                        <Route
                            path="/graphTraversal"
                            element={
                                <>
                                    <NavBar />
                                    <div className="h-[90vh] w-full">
                                        <VisNetwork />
                                    </div>
                                </>
                            }
                        />
                        <Route
                            path="/treeTraversal"
                            element={
                                <>
                                    <NavBar_bin />
                                    <div className="h-[90vh] w-full">
                                        <Binary_tree />
                                    </div>
                                </>
                            }
                        />
                        <Route
                            path="/"
                            element={
                                <div className="h-[90vh] w-full">
                                    <HomePage />
                                </div>
                            }
                        />
                    </Routes>
                </Router>
            </dataContext.Provider>
        </div>
    );
}

export default App;

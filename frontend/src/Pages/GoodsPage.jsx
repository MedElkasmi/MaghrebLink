import { Routes, Route} from 'react-router-dom';
import GoodsList from '../components/goods/GoodsList';
import GoodsForm from '../components/goods/GoodsForm';
import RemovedGoodsList from '../components/goods/RemovedGoodsList';

const GoodsPage = () => {
    return (
        <div className="container-fluid">
                <div className="row">
                        <div className="col-xl-12">
                            <Routes>
                                    <Route path="/" element={<GoodsList/>} />
                                    <Route path="/store" element={<GoodsForm />} />
                                    <Route path="/edit/:id" element={<GoodsForm />} />
                                    <Route path="/removed" element={<RemovedGoodsList />} />
                            </Routes>
                        </div>
                </div>
        </div>
    );
};

export default GoodsPage
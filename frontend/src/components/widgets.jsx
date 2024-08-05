import react from 'react';
import TotalClients from './widgets/TotalClients';
import TotalShipments from './widgets/TotalShipments';
import TotalGoods from './widgets/TotalGoods';
import TotalWeight from './widgets/TotalWeight';

const Widgets = () => {
    return (
        <>
        <div className="col-xl-3 col-xxl-3 col-lg-3 col-sm-3">
            <TotalClients />
          </div>

          <div className="col-xl-3 col-sm-3">
            <TotalShipments />
          </div>

          <div className="col-xl-3 col-sm-3">
            <TotalGoods />
          </div>

          <div className="col-xl-3 col-sm-3">
            <TotalWeight />
          </div>
        </>
    );
};

export default Widgets;
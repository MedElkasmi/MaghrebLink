import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const DeliveryForm = () => {
    const [shipmentId, setShipmentId] = useState('');
    const [receivedBy, setReceivedBy] = useState('');
    const [signature, setSignature] = useState('');
    const [proofOfDelivery, setProofOfDelivery] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            const fetchDelivery = async () => {
                try {
                    const response = await axiosInstance.get(`/deliveries/${id}`);
                    const delivery = response.data;
                    setShipmentId(delivery.shipment_id);
                    setReceivedBy(delivery.received_by);
                    setSignature(delivery.signature);
                    setProofOfDelivery(delivery.proof_of_delivery);
                } catch (error) {
                    console.error('Error fetching delivery:', error);
                }
            };
            fetchDelivery();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                shipment_id: shipmentId,
                received_by: receivedBy,
                signature,
                proof_of_delivery: proofOfDelivery
            };

            if (id) {
                await axiosInstance.put(`/deliveries/${id}`, data);
                toast.success('Delivery updated successfully!');
            } else {
                await axiosInstance.post('/deliveries', data);
                toast.success('Delivery created successfully!');
            }
            navigate('/admin/deliveries');
        } catch (error) {
            console.error('Error saving delivery:', error);
            toast.error('Error saving delivery');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">{id ? 'Edit Delivery' : 'Add Delivery'}</h4>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Shipment ID</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={shipmentId}
                            onChange={(e) => setShipmentId(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Received By</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={receivedBy}
                            onChange={(e) => setReceivedBy(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Signature</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={signature}
                            onChange={(e) => setSignature(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Proof of Delivery</label>
                        <input 
                            type="text"
                            className="form-control"
                            value={proofOfDelivery}
                            onChange={(e) => setProofOfDelivery(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
                </form>
            </div>
        </div>
    );
};

export default DeliveryForm;

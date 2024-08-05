import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';

const GoodsForm = () => {
    const [shipments, setShipments] = useState([]);
    const [clients, setClients] = useState([]);
    const [shipmentId, setShipmentId] = useState('');
    const [clientId, setClientId] = useState('');
    const [searchShipmentQuery, setSearchShipmentQuery] = useState('');
    const [searchClientQuery, setSearchClientQuery] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [weight, setWeight] = useState(0);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [storageLocation, setStorageLocation] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchGood = async () => {
                try {
                    const response = await axiosInstance.get(`/goods/${id}`);
                    const good = response.data;
                    setShipmentId(good.shipment_id);
                    setClientId(good.client_id);
                    setDescription(good.description);
                    setQuantity(good.quantity);
                    setWeight(good.weight);
                    setCategory(good.category);
                    setPrice(good.price);
                    setStorageLocation(good.storage_location);
                } catch (error) {
                    console.error('Error fetching good:', error);
                }
            };
            fetchGood();
        }
    }, [id]);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axiosInstance.get(`/shipments/search?query=${searchShipmentQuery}`);
                const options = response.data.map(shipment => ({
                    value: shipment.id,
                    label: `${shipment.origin} to ${shipment.destination}`,
                }));
                setShipments(options);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };
        if (searchShipmentQuery) {
            fetchShipments();
        } else {
            setShipments([]);
        }
    }, [searchShipmentQuery]);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await axiosInstance.get(`/clients/search?query=${searchClientQuery}`);
                const options = response.data.map(client => ({
                    value: client.id,
                    label: `${client.fullname} (${client.country})`,
                }));
                setClients(options);
            } catch (error) {
                console.error('Error fetching clients:', error);
            }
        };
        if (searchClientQuery) {
            fetchClients();
        } else {
            setClients([]);
        }
    }, [searchClientQuery]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const goodData = {
                shipment_id: shipmentId,
                client_id: clientId,
                description,
                quantity,
                price,
                weight,
                category,
                storage_location: storageLocation,
            };
            
            if (id) {
                await axiosInstance.put(`/goods/${id}`, goodData);
                toast.success('Good updated successfully!');
            } else {
                await axiosInstance.post('/goods', goodData);
                toast.success('Good added successfully!');
            }
            navigate('/admin/goods');
        } catch (err) {
            console.error('Error saving good:', err);
            setError('Error saving good');
            toast.error('Error saving good');
        }
    };

    return (
        <div className="card">
            <div className="card-header">
                <h4 className="card-title">{id ? 'Edit Goods' : 'Add Goods'}</h4>
            </div>
            <div className="card-body">
                <div className="form-validation">
                    <form className="needs-validation" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-xl-12">
                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="shipment">
                                        Shipment <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <Select
                                            id="shipment"
                                            options={shipments}
                                            onInputChange={setSearchShipmentQuery}
                                            onChange={(selected) => setShipmentId(selected ? selected.value : '')}
                                            placeholder="Search for shipments..."
                                            isClearable
                                            required
                                        />
                                        <div className="invalid-feedback">Please select a shipment.</div>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="client">
                                        Client <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <Select
                                            id="client"
                                            options={clients}
                                            onInputChange={setSearchClientQuery}
                                            onChange={(selected) => setClientId(selected ? selected.value : '')}
                                            placeholder="Search for clients..."
                                            isClearable
                                            required
                                        />
                                        <div className="invalid-feedback">Please select a client.</div>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="category">
                                        Category <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <select
                                            className="form-control"
                                            id="category"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                            required
                                        >
                                            <option value="">Select category</option>
                                            <option value="electronics">Electronics</option>
                                            <option value="furniture">Furniture</option>
                                            <option value="clothing">Clothing</option>
                                            <option value="food">Food</option>
                                            <option value="books">Books</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="quantity">
                                        Quantity <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                id="quantity"
                                                type="number"
                                                value={quantity}
                                                onChange={(e) => setQuantity(Number(e.target.value))}
                                                required
                                            />
                                            <span className="input-group-text">Unit</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="weight">
                                        Weight (kg) <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                id="weight"
                                                type="number"
                                                value={weight}
                                                onChange={(e) => setWeight(Number(e.target.value))}
                                                required
                                            />
                                            <span className="input-group-text">kg</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="price">
                                        Price <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <div className="input-group">
                                            <input
                                                className="form-control"
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                value={price}
                                                onChange={(e) => setPrice(Number(e.target.value))}
                                                required
                                            />
                                            <span className="input-group-text">USD</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="category">
                                        Storage Location <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <select
                                            className="form-control"
                                            id="category"
                                            value={storageLocation}
                                            onChange={(e) => setStorageLocation(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Storage Location</option>
                                            <option value="Alhoceima">Alhoceima</option>
                                            <option value="Nador">Nador</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3 row">
                                    <label className="col-lg-4 col-form-label" htmlFor="description">
                                        Description <span className="text-danger">*</span>
                                    </label>
                                    <div className="col-lg-6">
                                        <input
                                            className="form-control"
                                            id="description"
                                            type="text"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                {error && <p>{error}</p>}
                                <button type="submit" className="btn light btn-primary">{id ? 'Update' : 'Create'}</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default GoodsForm;

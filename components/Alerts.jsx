import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Alerts = ({ message, status }) => {
    const success = () => toast.success(message);
    const error = () => toast.error(message);
    const warning = () => toast.warning(message);
	
    if (status === 1) {
		return (
            <div>
            {success}
            <ToastContainer />
            </div>
			)
	}

    if (status === 0) {
		return (
            <div>
            {error}
            <ToastContainer />
            </div>
			)
	}

    if (status === 2) {
		return (
            <>
            {warning}
            <ToastContainer />
            </>
			)
	}
};

export default Alerts

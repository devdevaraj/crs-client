import axios from "axios";
import { useState, useEffect } from "react";
import ENV from "../config";

axios.defaults.baseURL = ENV.SERVER_ADD;

export function useFetchContent(cname) {
    const [getData,setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                const { data, status } = await axios.get(`/api/get-content?cname=${cname}`);
                if(status === 201) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }))
            } catch(error) {
                setData(prev => ({ ...prev, isLoading: false,serverError: error }));
            }
        };
        fetchData();
    },[cname]);
    return [getData,setData];
}

export function useFetchUser(query) {
    const [getData,setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                const token = localStorage.getItem("token");
                if(!token) {
                    setData(prev => ({ ...prev, serverError: true }));
                }
                const { data, status } = await axios.get(`/api${query}`,{ headers: { "Authorization": `Beare ${token}`}});
                if(status === 201 || status === 200) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }))
            } catch(error) {
                setData(prev => ({ ...prev, isLoading: false,serverError: error }));
            }
        };
        fetchData();
    },[query]);
    return [getData,setData];
}

export function useFetchDoc(query) {
    const [getData,setData] = useState({
        isLoading: false,
        apiData: undefined,
        status: null,
        serverError: null
    });
    useEffect(() => {
        const fetchData = async () => {
            try {
                setData(prev => ({ ...prev, isLoading: true }));
                const token = localStorage.getItem("token");
                if(!token) {
                    setData(prev => ({ ...prev, serverError: true }));
                }
                const { data, status } = await axios.get(`/api${query}`,{ headers: { "Authorization": `Beare ${token}`}});
                if(status === 201) {
                    setData(prev => ({ ...prev, isLoading: false }));
                    setData(prev => ({ ...prev, apiData: data, status: status }));
                }
                setData(prev => ({ ...prev, isLoading: false }))
            } catch(error) {
                setData(prev => ({ ...prev, isLoading: false,serverError: error }));
            }
        };
        fetchData();
    },[query]);
    return [getData,setData];
}
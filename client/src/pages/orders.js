import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/header';
// import LeftPanel from '../components/orders/leftpanel';

export default function Orders() {
  const [date, setDate] = useState('2021-03-20');
  const [ordersQty, setOrdersQty] = useState('');
  const [orderForDate, setOrderForDate] = useState('');
  const [injectionsQty, setInjectionsQty] = useState('');
  const [antiquaQty, setAntiquaQty] = useState('');
  const [antiquaVaccinesQty, setAntiquaVaccinesQty] = useState('');
  const [zerpfyQty, setZerpfyQty] = useState('');
  const [zerpfyVaccinesQty, setZerpfyVaccinesQty] = useState('');
  const [solarBuddhicaQty, setSolarBuddhicaQty] = useState('');
  const [solarBuddhicaVaccinesQty, setSolarBuddhicaVaccinesQty] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/orders/count/total');
      setOrdersQty(res.data);
    };
    fetchOrders();

    const fetchOrderForDate = async () => {
      const res = await axios.get(`/orders/arrived/${date}`, {
        // eslint-disable-next-line object-shorthand
        date: date,
      });
      setOrderForDate(res.data);
    };
    fetchOrderForDate();

    const fetchInjections = async () => {
      const res = await axios.get('/orders/count/injections');
      setInjectionsQty(res.data);
    };
    fetchInjections();

    const fetchAntiqua = async () => {
      const res = await axios.get('/orders/stats/Antiqua');
      setAntiquaQty(res.data.ordersQty);
      setAntiquaVaccinesQty(res.data.injections);
    };
    fetchAntiqua();

    const fetchZerpfy = async () => {
      const res = await axios.get('/orders/stats/Zerpfy');
      setZerpfyQty(res.data.ordersQty);
      setZerpfyVaccinesQty(res.data.injections);
    };
    fetchZerpfy();

    const fetchSolarBuddhica = async () => {
      const res = await axios.get('/orders/stats/SolarBuddhica');
      setSolarBuddhicaQty(res.data.ordersQty);
      setSolarBuddhicaVaccinesQty(res.data.ordersQty);
    };
    fetchSolarBuddhica();
  }, []);

  const ordersData = {
    ordersQty,
    orderForDate,
    injectionsQty,
    antiquaQty,
    antiquaVaccinesQty,
    zerpfyQty,
    zerpfyVaccinesQty,
    solarBuddhicaQty,
    solarBuddhicaVaccinesQty,
  };

  return (
    <>
      <div className="min-h-screen bg-background-under p-2">
        <div className="container mx-auto h-screen">
          <div className="border-2 border-focus">
            <Header />
          </div>
          <div className="flex bg-background-fore border-2 border-focus">
            <div className="flex-col h-60 w-60 font-bold text-textcolor m-2">
              <div>{ `Total orders arrived: ${ordersData.ordersQty}` }</div>
              <div className="text-textcolor">
                <div>{ `Antiqua orders: ${ordersData.antiquaQty}` }</div>
              </div>
              <div className="text-textcolor">
                <div>{ `Zerpfy orders: ${ordersData.zerpfyQty}` }</div>
              </div>
              <div className="text-textcolor">
                <div>{ `SolarBuddhica orders: ${ordersData.solarBuddhicaQty}` }</div>
              </div>
            </div>
            <div className="flex-col h-60 w-60 font-bold text-textcolor m-2">
              <div>{ `Total vaccines arrived: ${ordersData.injectionsQty}` }</div>
              <div>
                <div>{ `Antiqua vaccines: ${ordersData.antiquaVaccinesQty}` }</div>
                <div>{ `Zerpfy vaccines: ${ordersData.zerpfyVaccinesQty}` }</div>
                <div>{ `SolarBuddhica vaccines: ${ordersData.solarBuddhicaVaccinesQty}` }</div>
              </div>
            </div>
            <div className="flex-col h-60 w-60 font-bold text-textcolor m-2">
              <div className="">
                Date:
                {date}
              </div>
              <div className="">
                {orderForDate}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

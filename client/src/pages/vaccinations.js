import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/header';

export default function Vaccinations() {
  const [vaccinationsQty, setVaccinationsQty] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await axios.get('/vaccinations/total');
      setVaccinationsQty(res.data);
    };
    fetchOrders();
  }, []);

  const vaccinationsData = {
    vaccinationsQty,
  };

  return (
    <>
      <div className="min-h-screen bg-background-under p-2">
        <div className="container mx-auto h-screen">
          <div className="border-2 border-focus">
            <Header />
          </div>
          <div className="bg-background-fore border-2 border-focus">
            <div className="font-bold text-textcolor m-2">
              { `Total vaccinations done: ${vaccinationsData.vaccinationsQty}` }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

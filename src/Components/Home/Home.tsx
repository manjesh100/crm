import {React, useEffect,useState, useContext} from 'react';
 import {PieChart,AreaChart,Area,Pie,Cell,BarChart,Bar,XAxis,YAxis,Tooltip,CartesianGrid,Legend,ResponsiveContainer} from "recharts";
import { AuthContext} from '../../context/AuthProvider';
export default function Home() {
const [noteListCount, setNoteListCount] = useState<any>();
const authContextRes: any = useContext(AuthContext);
const {notbookCountCategories} = authContextRes;

  const getNoteListCount = async () => {
    const response = await notbookCountCategories();
    setNoteListCount(response?.objectListCat);
  } 
  useEffect(() => {
    getNoteListCount();
  },[])
  const categories = noteListCount?.map((item) => ({
  name: item._id,
  value: item.count
})) || [];
const COLORS = ["#0088FE", "#00C49F", "#4d390fff", "#FF8042"]; 
// Example data for the charts End
  return (
    <>     
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-2xl shadow-lg text-center font-bold">
        Total Users: 500
      </div>  
      <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-2xl shadow-lg text-center font-bold">
        Active Users: 300
      </div>    
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-2xl shadow-lg text-center font-bold">
        Total Sales: $12,000
      </div>
  </div>
   <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <ResponsiveContainer width="100%" height={300}>
      <BarChart data={categories}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" fill="#8884d8" barSize={50} />
      </BarChart>
      </ResponsiveContainer> 
      <PieChart width={400} height={300}>
      <Pie
      data={categories}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      outerRadius={100}
      label
      >
      {categories.map((entry, index) => (
      <Cell
      key={`cell-${index}`}
      fill={COLORS[index % COLORS.length]}
      />
      ))}
      </Pie>
      <Tooltip />
      <Legend />
      </PieChart>
      <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={categories}>
      <defs>
      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
      </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorValue)" />
      </AreaChart>
      </ResponsiveContainer>
   </div>
      </>
  )
}

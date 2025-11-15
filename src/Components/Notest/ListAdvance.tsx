import { useState,useEffect, useContext } from "react";
import DataTable from "react-data-table-component";
import { AuthContext} from '../../context/AuthProvider';
import autoTable from "jspdf-autotable";
import { exportToExcel, exportToPDF, handlePrint } from "../../common/exportUtils";
 
const MyDataTable = () => {
    const [search, setSearch] = useState("");
    const [tableData, setTableData] = useState([]);
    const authContextRes: any = useContext(AuthContext);
    const { getAllNotes} = authContextRes;
    const getNoteList = async () => {
   try {
     const response = await getAllNotes();
    setTableData(response?.objectList || []);
    //console.log("response", response?.objectList);    
   } catch (error) {
    console.log("Error fetching data:", error);    
   }   
};    
   useEffect(() => {
    getNoteList();
    }, []);  

 

 const filteredData = tableData.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) ||
      item.tag?.toLowerCase().includes(search.toLowerCase())
  );
   const columns = [
    { name: "ID", selector: (row, index) => index + 1, sortable: true },
    { name: "Title", selector: (row) => row.title, sortable: true },
    { name: "Tag", selector: (row) => row.tag, sortable: true },
  ];

 
  return (
    <div>
    <h3>DataTable Export (Excel / PDF)</h3>
      <div style={{
    display: "flex",
    justifyContent: "flex-end", // 👈 pushes buttons to the right
    marginBottom: "10px",
    gap: "10px", // adds space between buttons
  }}>    
      <input
        type="text"
        placeholder="Search title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
        padding: "6px 10px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        width: "250px",
    }}
      />
</div>      
       <div
  style={{
    display: "flex",
    justifyContent: "flex-end", 
    marginBottom: "10px",
    gap: "10px", 
  }}
>
  <button onClick={() => exportToExcel(filteredData)}
    style={{
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
    }}>Export Excel</button>

  <button
     onClick={() => exportToPDF(filteredData)}
    style={{
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Export PDF
  </button>

  <button
     onClick={() => handlePrint(filteredData)} 
    style={{
      backgroundColor: "#6c757d",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "5px",
      cursor: "pointer",
    }}
  >
    Print
  </button>
</div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default MyDataTable;
